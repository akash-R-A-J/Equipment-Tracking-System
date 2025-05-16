import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UserCircleIcon,
  IdentificationIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

const tabs = [
  { name: "Personal Info", icon: UserCircleIcon },
  { name: "Employment", icon: IdentificationIcon },
  { name: "Account Settings", icon: Cog6ToothIcon },
];

export function ProfilePage4() {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "user";
  const [role] = useState(from === "user" ? "user" : "manufacturer");
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [darkMode, setDarkMode] = useState(true);
  const [profile, setProfile] = useState(null);
  const baseUrl = "http://localhost:5000/uploads/";
  const imageUrl = profile?.filename ? `${baseUrl}${profile?.filename}` : null; // extended from profile state variable

  const handleBack = () => {
    navigate(`/${role}-dashboard`);
  };

  // 🟡 Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const xauthToken = localStorage.getItem("x-auth-token");
        const response = await axios.get(
          `http://localhost:5000/api/v0/${role}s/profile`,
          {
            headers: {
              "x-auth-token": xauthToken,
            },
          }
        );

        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [role]);

  useEffect(() => {
    console.log("Role: " + role);
    console.log("Profile updated: " + profile);
  }, [profile, role]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-950 rounded-xl shadow-md p-10 mt-20">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-6">
            <img
              src={imageUrl || "https://i.pravatar.cc/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />

            <div>
              <h2 className="text-2xl font-semibold">
                {profile?.fullName || "Loading..."}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {profile?.designation || "Software Developer"}
              </p>
            </div>
          </div>

          <div className="space-x-3 flex">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center space-x-2 px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center space-x-2 pb-2 px-2 text-sm font-medium transition-colors ${
                  activeTab === tab.name
                    ? "border-b-2 border-yellow-500 text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "Personal Info" && profile && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileField label="Full Name" value={profile.fullName} />
              <ProfileField label="Email" value={profile.email} />
              <ProfileField label="Phone Number" value={profile.phone} />
              <ProfileField label="Birth Date" value={profile.birthDate} />
              <ProfileField label="Gender" value={profile.gender} />
              <ProfileField label="Nationality" value={profile.nationality} />
            </div>
          )}

          {activeTab === "Employment" && profile && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileField label="Designation" value={profile.designation} />
              <ProfileField label="Department" value={profile.department} />
              <ProfileField label="Join Date" value={profile.joiningDate} />
              <ProfileField label="Location" value={profile.workingLocation} />
              <ProfileField
                label="Employee No."
                value={profile.employeeNumber}
              />
              <ProfileField
                label="Employment Type"
                value={profile.employmentType}
              />
            </div>
          )}

          {activeTab === "Account Settings" && (
            <div className="space-y-4 space-x-4">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Change Password
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
      <h4 className="text-xs text-gray-500 dark:text-gray-300 uppercase mb-1">
        {label}
      </h4>
      <p className="text-sm text-gray-800 dark:text-gray-100">{value}</p>
    </div>
  );
}
