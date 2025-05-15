export const TransferRequests = () => {
  return (
    <section className="bg-gray-800 p-5 rounded-lg shadow min-h-2/3">
      <h2 className="text-xl font-semibold mb-4 text-white">Transfer Requests</h2>
      <table className="w-full table-auto text-gray-300">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="pb-2">Request ID</th>
            <th className="pb-2">Equipment</th>
            <th className="pb-2">From</th>
            <th className="pb-2">To</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2">REQ-1001</td>
            <td className="py-2">Forklift</td>
            <td className="py-2">Warehouse A</td>
            <td className="py-2">Warehouse B</td>
            <td className="py-2 text-yellow-400">Pending</td>
            <td className="py-2">2025-05-11</td>
            <td className="py-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 rounded">
                View Detail
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2">REQ-1001</td>
            <td className="py-2">Forklift</td>
            <td className="py-2">Warehouse A</td>
            <td className="py-2">Warehouse B</td>
            <td className="py-2 text-yellow-400">Pending</td>
            <td className="py-2">2025-05-11</td>
            <td className="py-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 rounded">
                View Detail
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2">REQ-1001</td>
            <td className="py-2">Forklift</td>
            <td className="py-2">Warehouse A</td>
            <td className="py-2">Warehouse B</td>
            <td className="py-2 text-yellow-400">Pending</td>
            <td className="py-2">2025-05-11</td>
            <td className="py-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 rounded">
                View Detail
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2">REQ-1001</td>
            <td className="py-2">Forklift</td>
            <td className="py-2">Warehouse A</td>
            <td className="py-2">Warehouse B</td>
            <td className="py-2 text-yellow-400">Pending</td>
            <td className="py-2">2025-05-11</td>
            <td className="py-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 rounded">
                View Detail
              </button>
            </td>
          </tr>
          {/* Add more dummy rows as needed */}
        </tbody>
      </table>
    </section>
  );
};
