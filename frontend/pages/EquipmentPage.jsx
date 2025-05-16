import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEquipments } from "../hooks/Equipments";

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

export function EquipmentPage3() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "user";

  const [role] = useState(from === "user" ? "user" : "manufacturer");
  const [search, setSearch] = useState("");
  const {equipments, loading, error} = useEquipments(role);

  console.log(equipments);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleBack = () => {
    navigate(`/${role}-dashboard`);
  };

  const filtered = (equipments?.length ? equipments : []).filter((eq) =>
    eq.serialNumber.toLowerCase().includes(search.toLowerCase())
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filtered.length ? (
          filtered.map((item) => (
            <div
              key={item.serialNumber}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-400">
                    Serial No.: {item.serialNumber}
                  </p>
                  <p className="text-gray-400">Owner: {item.currentOwner}</p>
                  {/* <p className="text-gray-400">Date: {item.name}</p> */}
                </div>
                <EquipmentImageComponent filename={item.equipmentImage} />
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

export const EquipmentImageComponent = ({ filename }) => {
  const baseUrl = "http://localhost:5000/uploads/";
  const imageUrl = filename ? `${baseUrl}${filename}` : null;

  return (
    <div className="h-30 w-20 mr-5 mt-3 rounded-full bg-gray-600 border-4 border-gray-300 overflow-hidden flex items-center justify-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Equipment"
          className="object-cover h-full w-full"
          onError={(e) => {
            e.target.src = "/fallback.png"; // Optional: fallback image from public folder
          }}
        />
      ) : (
        <span className="text-2xl text-blue-400">#</span>
      )}
    </div>
  );
};
