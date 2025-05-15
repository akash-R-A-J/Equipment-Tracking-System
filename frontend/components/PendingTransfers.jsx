export const PendingTransfers = () => {
  return (
    <section className="bg-gray-800 p-5 rounded-lg shadow min-h-2/3">
      <h2 className="text-xl font-semibold mb-4 text-white">Pending Transfers</h2>
      <table className="w-full table-auto text-gray-300">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="pb-2">Transfer ID</th>
            <th className="pb-2">Equipment</th>
            <th className="pb-2">Assigned To</th>
            <th className="pb-2">Requested On</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2">TRF-2002</td>
            <td className="py-2">Excavator</td>
            <td className="py-2">John Doe</td>
            <td className="py-2">2025-05-09</td>
            <td className="py-2 text-yellow-400">Pending</td>
            <td className="py-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 rounded">
                View Detail
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2">TRF-2002</td>
            <td className="py-2">Excavator</td>
            <td className="py-2">John Doe</td>
            <td className="py-2">2025-05-09</td>
            <td className="py-2 text-yellow-400">Pending</td>
            <td className="py-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 rounded">
                View Detail
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2">TRF-2002</td>
            <td className="py-2">Excavator</td>
            <td className="py-2">John Doe</td>
            <td className="py-2">2025-05-09</td>
            <td className="py-2 text-yellow-400">Pending</td>
            <td className="py-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 rounded">
                View Detail
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2">TRF-2002</td>
            <td className="py-2">Excavator</td>
            <td className="py-2">John Doe</td>
            <td className="py-2">2025-05-09</td>
            <td className="py-2 text-yellow-400">Pending</td>
            <td className="py-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 rounded">
                View Detail
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2">TRF-2002</td>
            <td className="py-2">Excavator</td>
            <td className="py-2">John Doe</td>
            <td className="py-2">2025-05-09</td>
            <td className="py-2 text-yellow-400">Pending</td>
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
