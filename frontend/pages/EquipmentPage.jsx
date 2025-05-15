import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sampleEquipments = [
  {
    id: 1,
    serial: "EQ123",
    status: "Active",
    owner: "0xABC...",
    date: "2024-06-01",
  },
  {
    id: 2,
    serial: "EQ124",
    status: "Transferred",
    owner: "0xXYZ...",
    date: "2024-05-15",
  },
  {
    id: 3,
    serial: "EQ125",
    status: "Pending",
    owner: "0x123...",
    date: "2024-06-30",
  },
  {
    id: 1,
    serial: "EQ126",
    status: "Active",
    owner: "0xABC...",
    date: "2024-06-01",
  },
  {
    id: 2,
    serial: "EQ127",
    status: "Transferred",
    owner: "0xXYZ...",
    date: "2024-05-15",
  },
  {
    id: 3,
    serial: "EQ128",
    status: "Pending",
    owner: "0x123...",
    date: "2024-06-30",
  },
  {
    id: 2,
    serial: "EQ127",
    status: "Transferred",
    owner: "0xXYZ...",
    date: "2024-05-15",
  },
  {
    id: 3,
    serial: "EQ128",
    status: "Pending",
    owner: "0x123...",
    date: "2024-06-30",
  },
];

export function EquipmentPage3({ back }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const from = location.state?.from || "user";

  const handleBack = () => {
    if (from === "manufacturer") {
      navigate("/manufacturer-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  const filtered = sampleEquipments.filter((eq) =>
    eq.serial.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Equipment Inventory</h1>
        <div className="space-x-4">
          <button
            onClick={handleBack}
            className="bg-green-600 px-8 py-2.5 rounded hover:bg-green-700 transition"
          >
            Back To Dashboard
          </button>

          <Link to="/add-equipment">
            <button className="bg-green-600 px-4 py-2.5 rounded hover:bg-green-700 transition">
              + Add New Equipment
            </button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 mx-auto">
        <input
          type="text"
          placeholder="Search by serial number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 mb-10 mt-5 md:w-2/3 border rounded text-gray-700"
        />
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length ? (
          filtered.map((item) => (
            <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{item.serial}</h3>
                  <p className="text-gray-400">Status: {item.status}</p>
                  <p className="text-gray-400">Owner: {item.owner}</p>
                  <p className="text-gray-400">Date: {item.date}</p>
                </div>
                <EquipmentImageComponent />
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700 transition">
                  Transfer
                </button>
                <button className="bg-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-700 transition">
                  View Details
                </button>
                {/* Link to the Equipment Details Page */}
                {/* <Link to={`/equipment/${equipment.serialNumber}`} className="text-blue-500 hover:underline">
                    View Details
                    </Link> */}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-lg text-gray-400">
            No equipment found.
          </div>
        )}
      </div>
    </div>
  );
}

export const EquipmentImageComponent = () => {
  return (
    <div className="h-22 w-22 mr-5 mt-3 rounded-full bg-gray-600 border-3 border-gray-300 text-7xl text-center text-blue-400">
      #
    </div>
  );
};
