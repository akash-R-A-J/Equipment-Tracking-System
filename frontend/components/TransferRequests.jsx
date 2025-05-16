import React, { useState, useEffect } from "react";
import { useTransfers, useUpdateTransfer } from "../hooks/Transfers";

export const TransferRequests = () => {
  const { transfers, loading, error } = useTransfers();
  const { updateTransferStatus, loading: updating, error: updateError } = useUpdateTransfer();

  // Local state to optimistically update transfer statuses on UI
  const [localTransfers, setLocalTransfers] = useState([]);

  // Sync local transfers with fetched transfers
  useEffect(() => {
    setLocalTransfers(transfers);
  }, [transfers]);

  // Helper to shorten long keys (show first 6 and last 6 chars)
  const shortenKey = (key) => {
    if (!key) return "";
    return key.length > 12 ? key.slice(0, 6) + "..." + key.slice(-6) : key;
  };

  // Handle Accept / Reject click
  const handleAction = async (id, newStatus) => {
    // Optimistically update UI
    setLocalTransfers((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
    );

    const success = await updateTransferStatus(id, newStatus);

    if (!success) {
      // Rollback if update failed
      setLocalTransfers(transfers);
    }
  };

  if (loading) return <p className="text-white text-center">Loading transfer requests...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="bg-gray-800 p-5 rounded-lg shadow min-h-2/3">
      <h2 className="text-xl font-semibold mb-4 text-white">Transfer Requests</h2>

      {updateError && <p className="text-red-400 mb-2">{updateError}</p>}

      <table className="w-full table-auto text-gray-300">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="pb-2">Serial Number</th>
            <th className="pb-2">From</th>
            <th className="pb-2">To</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {localTransfers.length === 0 && (
            <tr>
              <td colSpan="7" className="py-4 text-center text-gray-500">
                No transfer requests found.
              </td>
            </tr>
          )}
          {localTransfers.map((request) => (
            <tr key={request._id} className="border-b border-gray-700">
              <td className="py-2">{request.serialNumber}</td>
              <td
                className="py-2 max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap"
                title={request.sender}
              >
                {shortenKey(request.sender)}
              </td>
              <td
                className="py-2 max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap"
                title={request.receiver}
              >
                {shortenKey(request.receiver)}
              </td>
              <td
                className={`py-2 ${
                  request.status === "pending"
                    ? "text-yellow-400"
                    : request.status === "accepted"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </td>
              <td className="py-2">{new Date(request.timestamp).toLocaleDateString()}</td>
              <td className="py-2 space-x-2">
                {request.status === "pending" ? (
                  <>
                    <button
                      className={`bg-green-600 hover:bg-green-700 text-white px-3 rounded ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={updating}
                      onClick={() => handleAction(request._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className={`bg-red-600 hover:bg-red-700 text-white px-3 rounded ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={updating}
                      onClick={() => handleAction(request._id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="italic">{request.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
