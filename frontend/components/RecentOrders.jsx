export const RecentOrders = () => {
  return (
    <section className="bg-gray-800 p-5 rounded-lg shadow min-h-2/3">
      <h2 className="text-xl font-semibold mb-4 text-white">Recent Orders</h2>
      <table className="w-full table-auto text-gray-300">
        <TableHeadComponent />
        <tbody>
          <TableRowComponent
            orderId={"ORD-00123"}
            client={"Tech Corp"}
            status={"Pending"}
            date={"2025-05-10"}
          />
          <TableRowComponent
            orderId={"ORD-00124"}
            client={"Buildit Ltd"}
            status={"Shipped"}
            date={"2025-05-09"}
          />
          <TableRowComponent
            orderId={"ORD-00125"}
            client={"MedTech Inc."}
            status={"Shipped"}
            date={"2025-05-07"}
          />
          <TableRowComponent
            orderId={"ORD-00125"}
            client={"MedTech Inc."}
            status={"Pending"}
            date={"2025-05-07"}
          />
          {/* More rows as needed */}
        </tbody>
      </table>
    </section>
  );
};

export const TableHeadComponent = () => {
  return (
    <thead>
      <tr className="text-left border-b border-gray-700">
        <th className="pb-2">Serial No.</th>
        <th className="pb-2">Client</th>
        <th className="pb-2">Status</th>
        <th className="pb-2">Date</th>
        <th className="pb-2">Action</th>
      </tr>
    </thead>
  );
};

export const TableRowComponent = ({ orderId, client, status, date }) => {
  return (
    <tr className="border-b border-gray-700">
      <td className="py-2">{orderId}</td>
      <td className="py-2">{client}</td>
      <td
        className={`py-2 ${
          status.toLowerCase() === "pending"
            ? "py-2 text-yellow-400"
            : "py-2 text-green-400"
        }`}
      >
        {status}
      </td>
      <td className="py-2">{date}</td>
      <td className="py-2">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 rounded">
          View Detail
        </button>
      </td>
    </tr>
  );
};
