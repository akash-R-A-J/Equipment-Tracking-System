import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Adjust if using another routing lib
import axios from "axios";

const EquipmentDetails = () => {
  const { id } = useParams(); // ID from route
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await axios.get(`/api/equipments/${id}`);
        setEquipment(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching equipment", err);
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  if (loading) return <div className="text-center text-lg p-6">Loading...</div>;
  if (!equipment) return <div className="text-center text-lg p-6 text-red-500">Equipment not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/3 bg-gray-200 dark:bg-gray-700 p-4">
            {equipment.equipmentImage ? (
              <img
                src={equipment.equipmentImage}
                alt="Equipment"
                className="w-full h-64 object-cover rounded"
              />
            ) : (
              <div className="text-center text-sm text-gray-500 dark:text-gray-300">No image available</div>
            )}
          </div>

          {/* Info */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-2xl font-bold mb-2">{equipment.name}</h2>
            <p className="mb-2"><strong>Serial Number:</strong> {equipment.serialNumber}</p>
            <p className="mb-2"><strong>Current Owner:</strong> {equipment.currentOwner}</p>
            {equipment.document && (
              <a
                href={equipment.document}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-600 dark:text-blue-400"
              >
                View Document
              </a>
            )}
          </div>
        </div>

        {/* History */}
        <div className="p-6 border-t border-gray-300 dark:border-gray-600">
          <h3 className="text-xl font-semibold mb-4">History</h3>
          {equipment.history && equipment.history.length > 0 ? (
            <ul className="space-y-4">
              {equipment.history.map((event, index) => (
                <li key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <p><strong>Action:</strong> {event.action}</p>
                  <p><strong>User:</strong> {event.user}</p>
                  {event.transaction && <p><strong>Transaction:</strong> {event.transaction}</p>}
                  <p><strong>Date:</strong> {new Date(event.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-300">No history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
