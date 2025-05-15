import React from "react";

export const EquipmentDetails2 = () => {
  // Placeholder data — replace with props or fetched data later
  const equipment = {
    name: "Hydraulic Press",
    serialNumber: "HPX-2048",
    currentOwner: "0xABCDEF1234567890",
    equipmentImage: "https://via.placeholder.com/400x300.png?text=Equipment+Image",
    document: "https://example.com/document.pdf",
    history: [
      {
        action: "created",
        user: "0xUSER123456",
        transaction: "N/A",
        timestamp: new Date().toISOString(),
      },
      {
        action: "transferred",
        user: "0xUSER789012",
        transaction: "TX-98123",
        timestamp: new Date().toISOString(),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/3 bg-gray-200 dark:bg-gray-700 p-4">
            <img
              src={equipment.equipmentImage}
              alt="Equipment"
              className="w-full h-64 object-cover rounded"
            />
          </div>

          {/* Info */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-2xl font-bold mb-2">{equipment.name}</h2>
            <p className="mb-2">
              <strong>Serial Number:</strong> {equipment.serialNumber}
            </p>
            <p className="mb-2">
              <strong>Current Owner:</strong> {equipment.currentOwner}
            </p>
            <a
              href={equipment.document}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-600 dark:text-blue-400"
            >
              View Document
            </a>
          </div>
        </div>

        {/* History */}
        <div className="p-6 border-t border-gray-300 dark:border-gray-600">
          <h3 className="text-xl font-semibold mb-4">History</h3>
          <ul className="space-y-4">
            {equipment.history.map((event, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md"
              >
                <p>
                  <strong>Action:</strong> {event.action}
                </p>
                <p>
                  <strong>User:</strong> {event.user}
                </p>
                {event.transaction && (
                  <p>
                    <strong>Transaction:</strong> {event.transaction}
                  </p>
                )}
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// export default EquipmentDetails;
