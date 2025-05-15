import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BlockTrackLogo } from "../components/BlocktrackLogo";

const initialKeys = {
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
};

export function ManufacturerSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...initialKeys });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" || name === "document") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const convertDataToFormData = () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value);
      }
    });

    return data;
  };

  const sendDataToBackend = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v0/manufacturers/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Manufacturer signed up successfully", response.data);
      return response;
    } catch (error) {
      console.error(
        "Manufacturer signup failed",
        error.response?.data || error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = convertDataToFormData();
    const res = await sendDataToBackend(data);
    if (res.data) {
      navigate("/login");
    }
    setFormData({ ...initialKeys }); // clear form data
  };

  return (
    <div className="bg-gray-900 inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-950 text-black dark:text-white p-8 my-10 rounded-2xl shadow-2xl w-full max-w-5xl border border-blue-500">
        <h2 className="text-3xl font-bold mb-8 flex justify-center">
          Sign Up to <BlockTrackLogo />
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

          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <InputField
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            type="tel"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <InputField
            label="Wallet Address"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleChange}
            required
          />
          <InputField
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

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

          <InputField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          <InputField
            type="url"
            label="Company Website"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
          />
          <InputField
            label="Tax ID (GST)"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
          />
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
              to="/"
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

// Optional: Abstract input field into a reusable component for cleanliness
function InputField({
  type = "text",
  label,
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
      />
    </div>
  );
}
