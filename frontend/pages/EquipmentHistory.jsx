import { ClockIcon } from "@heroicons/react/24/outline";

const equipmentHistoryData = [
  {
    id: 1,
    action: "Created",
    user: "Admin",
    timestamp: "2025-05-10 10:42 AM",
    transaction: null,
  },
  {
    id: 2,
    action: "Transferred",
    user: "User123",
    timestamp: "2025-05-11 02:15 PM",
    transaction: "TXN-12345678",
  },
  {
    id: 3,
    action: "Transferred",
    user: "User456",
    timestamp: "2025-05-12 09:32 AM",
    transaction: "TXN-87654321",
  },
];

export const EquipmentHistory = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-white mb-6">Equipment History</h2>
      <div className="space-y-4">
        {equipmentHistoryData.map((item) => (
          <div key={item.id} className="flex items-start space-x-3">
            <ClockIcon className="h-6 w-6 text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">{item.action}</h3>
              <p className="text-sm text-gray-300">
                <span className="font-bold">{item.user}</span> on{" "}
                <span className="text-gray-500">{item.timestamp}</span>
              </p>
              {item.transaction && (
                <p className="text-xs text-gray-400 mt-1">
                  <span className="font-bold">Transaction:</span> {item.transaction}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
