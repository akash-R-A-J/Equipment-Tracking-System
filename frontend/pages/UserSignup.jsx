import { useState } from "react";
import { BlockTrackLogo } from "../components/BlocktrackLogo";
import { inputFieldStyles } from "../styles/formStyles";
import { CancelButton } from "./LoginPage";
import { useNavigate } from "react-router-dom";

export function UserSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    walletAddress: "",
    password: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // You can now send `formData` to your backend
    navigate("/user-dashboard")
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      walletAddress: "",
      password: "",
      profileImage: null,
    });
  };

  return (
    <div className="h-screen bg-gray-900 inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="dark:bg-gray-950  text-black dark:text-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl border border-blue-500 transition-all">
        <h2 className="text-3xl font-bold mb-8 text-center flex justify-center">
          Sign Up to <BlockTrackLogo />
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputFieldStyles}
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
                className={inputFieldStyles}
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
                className={inputFieldStyles}
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Wallet Address</label>
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                placeholder="0x1234...abcd"
                className={inputFieldStyles}
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
                placeholder="Enter a strong password"
                className={inputFieldStyles}
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
                className="w-full rounded-lg file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-white dark:bg-gray-700 text-black dark:text-white"
              />
              {formData.profileImage && (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Preview"
                  className="mt-4 p-3 w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                />
              )}
            </div>
          </div>

          {/* Full Width Button */}
          <div className="space-x-2 md:col-span-2 flex justify-end pt-4">
            <CancelButton />
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
