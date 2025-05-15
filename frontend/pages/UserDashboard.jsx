// UserDashboard.jsx
import { useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { TransferEquipment } from "./TransferEquipment";

export const UserDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <SidebarComponent
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 font-semibold">
          <div className="flex">
            <OpenSidebarButton
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />
            <h1 className="text-3xl text-white">Dashboard</h1>
          </div>
          <div className="flex">
            <button
              title="Equipments to be approved"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded mr-3"
            >
              Approve Equipment
            </button>
            <TransferEquipment />
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsComponent field={"Total Equipment"} value={"1,240 Units"} />
          <StatsComponent field={"Pending Orders"} value={"32"} />
          <StatsComponent field={"Transferred"} value={"14"} />
        </div>

        {/* Recent Orders Table */}
        <section className="bg-gray-800 p-5 rounded-lg shadow min-h-2/3">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Recent Orders
          </h2>
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
        <Outlet/>
      </main>
    </div>
  );
};

export const SidebarComponent = ({ openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate();
  
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    navigate("/");
  };
  
  return (
    <aside
      className={`${
        openSidebar ? "hidden md:block md:w-64 bg-gray-800 p-5" : "hidden"
      }`}
    >
      <div className="flex justify-between mb-10">
        <h1 className="text-2xl font-bold">Akash Raj</h1>
        <button
          className=""
          onClick={() => {
            setOpenSidebar((open) => !open);
          }}
        >
          <CloseSidebarIcon />
        </button>
      </div>
      {/* <hr className="text-yellow-400 w-full mb-6 mt-1" /> */}

      <nav className="space-y-4 text-gray-300">
        <SidebarMenuItems name={"Dashboard"} path="/user-dashboard" />
        <SidebarMenuItems name={"My Equipments"} path="/my-equipment"/>
        <SidebarMenuItems name={"Transfer Requests"} path="/user-dashboard/transfer-requests"/>
        <SidebarMenuItems name={"Pending Transfers"} path="/user-dashboard/pending-requests"/>
        <SidebarMenuItems name={"Rejected Transfers"} />
        <SidebarMenuItems name={"Profile"} path="/profile" />
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 mt-2 rounded w-full font-semibold"
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export const SidebarMenuItems = ({ path = "#", name }) => {
  return (
    <Link to={path} state={{from: "user"}} className="block hover:text-yellow-400">
      {name}
    </Link>
  );
};

const StatsComponent = ({ field, value }) => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow hover:shadow-lg">
      <h3 className="text-sm text-gray-400">{field}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

const TableHeadComponent = () => {
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

const TableRowComponent = ({ orderId, client, status, date }) => {
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

export const OpenSidebarButton = ({ openSidebar, setOpenSidebar }) => {
  return (
    <button
      className={`${!openSidebar ? "mt-1 mr-4 cursor-pointer" : "hidden"}`}
      onClick={() => {
        setOpenSidebar((prev) => !prev);
      }}
    >
      <OpenSidebarIcon />
    </button>
  );
};

export const CloseSidebarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-7"
      color="yellow"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
};

export const OpenSidebarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};
