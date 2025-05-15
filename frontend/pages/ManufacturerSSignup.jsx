import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlockTrackLogo } from "../components/BlocktrackLogo";
import { CancelButton } from "./LoginPage";

export function ManufacturerSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    walletAddress: "",
    password: "",
    profileImage: null,
    companyName: "",
    companyWebsite: "",
    taxId: "",
    address: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" || name === "document") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Send formData to backend
    navigate("/manufacturer-dashboard");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      walletAddress: "",
      password: "",
      profileImage: null,
      companyName: "",
      companyWebsite: "",
      taxId: "",
      address: "",
      document: null,
    });
  };

  return (
    <div className="bg-gray-900 inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-950 text-black dark:text-white p-8 my-10 rounded-2xl shadow-2xl w-full max-w-5xl border border-blue-500">
        <h2 className="text-3xl font-bold mb-8 flex justify-center">
          Sign Up to <BlockTrackLogo />{" "}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Personal Details */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Personal Details
            </h3>
          </div>

          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Wallet Address</label>
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              placeholder="0x1234...abcd"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              name="profileImage"
              onChange={handleChange}
              className="w-full file:px-4 file:py-2 file:rounded-lg file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-white dark:bg-gray-700"
            />
            {formData.profileImage && (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Preview"
                className="mt-2 w-20 h-20 rounded-full object-cover border"
              />
            )}
          </div>

          {/* Company Details */}
          <div className="col-span-1 md:col-span-2 pt-4">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Company Details
            </h3>
          </div>

          <div>
            <label className="block mb-2 font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Acme Corp"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Company Website</label>
            <input
              type="url"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Tax ID (GST)</label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              placeholder="GSTIN1234567"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Street, City, State"
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Upload Verification Document (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              name="document"
              onChange={handleChange}
              className="w-full file:px-4 file:py-2 file:rounded-lg file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-white dark:bg-gray-700"
            />
            {formData.document && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {formData.document.name}
              </p>
            )}
          </div>

          <div className="space-x-2 md:col-span-2 flex justify-end pt-6">
            <Link
              to={"/"}
              className="px-6 py-3 px-10 bg-gray-300 hover:bg-green-400 dark:bg-gray-600 hover:dark:bg-gray-700 text-white rounded-lg font-medium transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
            >
              Register Manufacturer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
