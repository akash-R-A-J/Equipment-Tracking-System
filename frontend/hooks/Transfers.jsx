import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "safe-buffer";
import * as solanaWeb3 from "@solana/web3.js";
// import { sign } from "jsonwebtoken";

export const useTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // to avoid setting state on unmounted component

    async function fetchTransfers() {
      try {
        const xauthToken = localStorage.getItem("x-auth-token");
        const response = await axios.get(
          `http://localhost:5000/api/v0/equipments/transfers`,
          {
            headers: { "x-auth-token": xauthToken },
          }
        );
        if (isMounted) {
          setTransfers(response.data);
          setError(null);
          setLoading(false);
          console.log(response.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error while fetching transfers", err);
          setError(
            err?.response?.data?.message || "Failed to fetch transfers."
          );
          setLoading(false);
        }
      }
    }

    fetchTransfers();

    return () => {
      isMounted = false;
    };
  }, []);

  return { transfers, loading, error };
};

export const useUpdateTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper to send signed transaction back to backend
  const sendSignedTransaction = async (transferId, signedTransaction) => {
    console.log("sending for confirmation");
    const xauthToken = localStorage.getItem("x-auth-token");
    return axios.post(
      `http://localhost:5000/api/v0/equipments/transfers/${transferId}/submit-signed-tx`,
      { signedTransaction },
      {
        headers: {
          "x-auth-token": xauthToken,
        },
      }
    );
  };

  const updateTransferStatus = async (id, status) => {
    setLoading(true);
    setError(null);

    try {
      const xauthToken = localStorage.getItem("x-auth-token");

      // PATCH to update status (backend returns transaction if accepted)
      const response = await axios.patch(
        `http://localhost:5000/api/v0/equipments/transfers/${id}`,
        { status },
        {
          headers: {
            "x-auth-token": xauthToken,
          },
        }
      );

      // If status accepted, handle phantom signing
      if (status === "accepted" && response.data.transaction) {
        if (!window.solana || !window.solana.isPhantom) {
          throw new Error("Phantom wallet not found");
        }

        // Connect Phantom wallet
        await window.solana.connect();

        // Deserialize transaction from Base64
        const transaction = solanaWeb3.Transaction.from(
          Buffer.from(response.data.transaction, "base64")
        );
        
        console.log("transaction: " + transaction);

        // Sign transaction with Phantom wallet
        const signedTransaction = await window.solana.signTransaction(
          transaction
        );
        console.log("signedTransaction: " + signedTransaction);
        // Serialize signed transaction to base64
        const signedTxSerialized = signedTransaction
          .serialize()
          .toString("base64");
        console.log("signedTxSerialized: " + signedTxSerialized);

        // Send signed transaction back to backend to finalize submission on Solana
        const res = await sendSignedTransaction(id, signedTxSerialized);
        console.log("done successfully");
        console.log("response after done: " + res.data);
        alert(res.data.message);
      }

      setLoading(false);
      return true;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to update transfer status."
      );
      setLoading(false);
      return false;
    }
  };

  return { updateTransferStatus, loading, error };
};
