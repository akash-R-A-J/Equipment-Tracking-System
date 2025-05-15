import { useState } from "react";

export function AddEquipmentForm2() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(equipment);
    // Upload to backend
  };

  return (
    <div className="h-screen bg-white dark:bg-gray-900 pt-20">
    <div className="max-w-3xl mx-auto p-8 bg-gray-950 rounded-2xl shadow-xl border border-gray-300 dark:border-blue-500">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Add Equipment
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="col-span-1 md:col-span-2 flex justify-end pt-4">
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
