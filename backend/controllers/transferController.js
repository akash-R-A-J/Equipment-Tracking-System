const { sign } = require("jsonwebtoken");
const { EquipmentModel } = require("../models/Equipment");
const { ManufacturerModel } = require("../models/Manufacturer");
const { TransferRequestModel } = require("../models/TransferRequest");
const { UserModel } = require("../models/User");
const solanaWeb3 = require("@solana/web3.js");

const transferRequests = async (req, res) => {
  try {
    const id = req.user.id;
    const role = req.user.role;

    if (role !== "user" && role !== "manufacturer") {
      return res.status(403).json({ message: "Invalid role" });
    }

    const Model = role === "user" ? UserModel : ManufacturerModel;
    const user = await Model.findById(id);

    console.log("role: " + role);
    console.log("user: " + user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const requests = await TransferRequestModel.find({
      receiver: user.walletAddress,
    });

    console.log("transfer-requests: " + requests);

    return res.status(200).json(requests);
  } catch (error) {
    console.error("error: ", error);
    return res.status(500).json("Server error");
  }
};

// Helper to add history entry to equipment
async function addHistory(equipment, action, user, transaction = null) {
  equipment.history.push({
    action,
    user,
    transaction,
    timestamp: new Date(),
  });
  await equipment.save();
}

const run = async () => {
  const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl("devnet"),
    "confirmed"
  );
  //   const publicKey = new solanaWeb3.PublicKey(
  //     "22MdQfwTgvvgy7wtLSueicEmM1hvt9eNWXhizM8ttW6x"
  //   );
  const publicKey2 = new solanaWeb3.PublicKey(
    "Gdz9JLWUekrfnpT3fPu1SsWfas3b3zMhfC4frvV1QRNm"
  );

  try {
    // const signature = await connection.requestAirdrop(
    //   publicKey,
    //   solanaWeb3.LAMPORTS_PER_SOL
    // );
    const signature2 = await connection.requestAirdrop(
      publicKey2,
      solanaWeb3.LAMPORTS_PER_SOL
    );
    // await connection.confirmTransaction(signature);
    await connection.confirmTransaction(signature2);
    console.log(`✅ Airdrop successful! Signature: ${signature2}`);
  } catch (e) {
    console.error("❌ Airdrop failed:", e.message);
  }
};

// for updating status of the equipment and transfers
const updateTransferStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const transferId = req.params.id;
    const { status } = req.body;

    // run();
    console.log("New status: " + status);
    console.log("---------------------------------------------");

    const allowedStatuses = ["pending", "accepted", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const transfer = await TransferRequestModel.findById(transferId);
    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found." });
    }

    if (transfer.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending transfers can be updated." });
    }

    const equipment = await EquipmentModel.findOne({
      serialNumber: transfer.serialNumber,
    });
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found." });
    }

    // If rejected: update status and history immediately
    if (status === "rejected") {
      transfer.status = "rejected";
      await transfer.save();

      await addHistory(
        equipment,
        "transfer rejected",
        userId,
        transfer._id.toString()
      );

      return res.json({ message: "Transfer rejected and history updated." });
    }

    // If accepted: only generate and return unsigned transaction
    if (status === "accepted") {
      const connection = new solanaWeb3.Connection(
        solanaWeb3.clusterApiUrl("devnet"),
        "confirmed"
      );

      const fromPublicKey = new solanaWeb3.PublicKey(transfer.sender);
      const toPublicKey = new solanaWeb3.PublicKey(transfer.receiver);

      const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: fromPublicKey,
          toPubkey: toPublicKey,
          lamports: 1000, // Use real lamports or custom instructions
        })
      );

      // Get fresh blockhash right before sending
      const { blockhash } = await connection.getLatestBlockhash("finalized");
      transaction.recentBlockhash = blockhash;

      transaction.feePayer = fromPublicKey;

      const serializedTransaction = transaction
        .serialize({ requireAllSignatures: false })
        .toString("base64");

      console.log("serializedTransaction: " + serializedTransaction);

      return res.json({
        message: "Transaction created. Please sign to complete transfer.",
        transaction: serializedTransaction,
      });
    }
  } catch (error) {
    console.error("Error updating transfer status:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// POST /api/v0/equipments/transfers/:id/submit-signed-tx
const submitSignedTransaction = async (req, res) => {
  const { id } = req.params;
  const { signedTransaction } = req.body;
  const userId = req.user.id;

  console.log("submitSignedTransaction" + "------------------------");
  console.log("signedTransaction: " + signedTransaction);

  try {
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("devnet"),
      "confirmed"
    );

    const tx = solanaWeb3.Transaction.from(
      Buffer.from(signedTransaction, "base64")
    );

    const signature = await connection.sendRawTransaction(tx.serialize());
    console.log("signature: " + signature);

    await connection.confirmTransaction(signature, "confirmed");

    const transfer = await TransferRequestModel.findById(id);
    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found." });
    }

    if (transfer.status !== "pending") {
      return res.status(400).json({
        message: "Only pending transfers can be accepted after confirmation.",
      });
    }

    const equipment = await EquipmentModel.findOne({
      serialNumber: transfer.serialNumber,
    });

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found." });
    }

    // Update transfer status and equipment ownership
    transfer.status = "accepted";
    await transfer.save();

    console.log("transfer: " + transfer);

    equipment.currentOwner = transfer.receiver;
    await equipment.save();

    await addHistory(
      equipment,
      "transfer accepted (confirmed on-chain)",
      userId,
      transfer._id.toString()
    );

    console.log("equipment: " + equipment);

    return res.json({
      message: "Transaction confirmed and transfer completed.",
      signature,
    });
  } catch (error) {
    console.error("Error submitting signed transaction:", error);
    return res.status(500).json({ message: "Failed to submit transaction" });
  }
};

module.exports = {
  run,
  transferRequests,
  updateTransferStatus,
  submitSignedTransaction,
};
