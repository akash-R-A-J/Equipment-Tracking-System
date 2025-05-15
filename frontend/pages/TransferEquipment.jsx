// export const TransferEquipment = () => {

import { useState } from "react";
import { CancelButton } from "../components/Buttons";
import { useFetch } from "../hooks/HandleSubmit";
import { PopupMessage } from "../components/PopupMessage";

const ManufacturerTransferURL =
  "http://localhost:5000/api/v0/manufacturer/transfer/equipmet";

export const TransferEquipment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [receiverKey, setReceiverKey] = useState("");
  const [loading, setLoading] = useState("false");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Serial:", serialNumber, "Receiver:", receiverKey);

    const body = {
      serialNumber,
      receiverKey,
    };

    // placeholder
    const headers = {
      Authorization: "x-auth-token",
    };

    const { loading, data, error } = useFetch(
      ManufacturerTransferURL, // get this from .env file
      "POST",
      body,
      headers
    );
    
    if (!loading) {
      setLoading(false);
      setData(data);
      setError(error);
    }
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        Transfer Equipment
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <div
            className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded-2xl 
                  shadow-2xl w-full max-w-xl transition-all border rounded-3xl border-blue-500"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Transfer Equipment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">
                  Select Equipment (Serial Number)
                </label>

                <select
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 
                        dark:border-gray-600 bg-white dark:bg-gray-700 text-black 
                        dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" className="text-gray-400">
                    Choose equipment
                  </option>
                  <option value="EQ001">EQ001</option>
                  <option value="EQ002">EQ002</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Receiver Public Key
                </label>
                <input
                  type="text"
                  value={receiverKey}
                  onChange={(e) => setReceiverKey(e.target.value)}
                  placeholder="Enter recipient's public key"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white 
                          dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <CancelButton setIsOpen={setIsOpen} />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* alert/message/result after the form submission */}
      {/* {loading && <PopupMessage message={"loading..."} />}

      {data && <PopupMessage message={data} />}

      {error && <PopupMessage message={error} />} */}
    </div>
  );
};
