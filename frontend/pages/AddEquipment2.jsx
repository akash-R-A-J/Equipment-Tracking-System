import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AddEquipmentForm2() {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState({
    name: "",
    serialNumber: "",
    currentOwner: "",
    equipmentImage: null,
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "equipmentImage" || name === "document") {
      setEquipment({ ...equipment, [name]: files[0] });
    } else {
      setEquipment({ ...equipment, [name]: value });
    }
  };

  const sendDataToBackend = async () => {
    try {
      const data = new FormData();
      data.append("name", equipment.name);
      data.append("serialNumber", equipment.serialNumber);
      data.append("currentOwner", equipment.currentOwner);

      if (equipment.equipmentImage) {
        data.append("equipmentImage", equipment.equipmentImage);
      }

      if (equipment.document) {
        data.append("document", equipment.document);
      }

      const response = await axios.post(
        "http://localhost:5000/api/v0/equipments/add",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Equipment added successfully", response.data);
      alert("Equipment added successfully!");
      
      navigate("/manufacturer-dashboard");
      

      // Reset form after submission
      setEquipment({
        name: "",
        serialNumber: "",
        currentOwner: "",
        equipmentImage: null,
        document: null,
      });
    } catch (error) {
      console.error("Error uploading equipment:", error);
      alert("Failed to add equipment.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToBackend();
  };

  return (
    <div className="h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-3xl mx-auto p-8 bg-gray-950 rounded-2xl shadow-xl border border-gray-300 dark:border-blue-500">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Add Equipment
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Equipment Name
            </label>
            <input
              type="text"
              name="name"
              value={equipment.name}
              onChange={handleChange}
              placeholder="Excavator 9000"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Serial Number */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Serial Number
            </label>
            <input
              type="text"
              name="serialNumber"
              value={equipment.serialNumber}
              onChange={handleChange}
              placeholder="SN-123456"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Current Owner */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Receiver Wallet/Public Key
            </label>
            <input
              type="text"
              name="currentOwner"
              value={equipment.currentOwner}
              onChange={handleChange}
              placeholder="0xABC123...xyz"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Equipment Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="equipmentImage"
              onChange={handleChange}
              className="w-full file:px-4 file:py-2 file:rounded-lg file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-white dark:bg-gray-700"
            />
            {equipment.equipmentImage && (
              <img
                src={URL.createObjectURL(equipment.equipmentImage)}
                alt="Preview"
                className="mt-2 w-28 h-28 rounded-lg object-cover border"
              />
            )}
          </div>

          {/* PDF Upload */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Upload Document (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              name="document"
              onChange={handleChange}
              className="w-full file:px-4 file:py-2 file:rounded-lg file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-white dark:bg-gray-700"
            />
            {equipment.document && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {equipment.document.name}
              </p>
            )}
          </div>

          {/* Submit & Cancel */}
          <div className="col-span-1 md:col-span-2 flex justify-end pt-4 space-x-3">
            <Link
              to={"/manufacturer-dashboard"}
              className="flex items-center px-5 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
            >
              Add Equipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
