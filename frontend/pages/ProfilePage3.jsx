// ProfilePage.jsx
import { useState } from "react";
import {
  UserCircleIcon,
  IdentificationIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const tabs = [
  { name: "Personal Info", icon: UserCircleIcon },
  { name: "Employment", icon: IdentificationIcon },
  { name: "Account Settings", icon: Cog6ToothIcon },
];

export default function ProfilePage3() {
  const [activeTab, setActiveTab] = useState("Personal Info");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Rushi Ghadage
            </h2>
            <p className="text-gray-500">Manufacturing Lead</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b">
          <nav className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center space-x-2 pb-2 px-2 text-sm font-medium ${
                  activeTab === tab.name
                    ? "border-b-2 border-yellow-500 text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
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
          {activeTab === "Personal Info" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileField label="Full Name" value="Rushi Ghadage" />
              <ProfileField label="Email" value="rushi@example.com" />
              <ProfileField label="Phone Number" value="+91 9876543210" />
              <ProfileField label="Birth Date" value="1999-04-15" />
              <ProfileField label="Gender" value="Male" />
              <ProfileField label="Nationality" value="Indian" />
            </div>
          )}

          {activeTab === "Employment" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileField label="Designation" value="Manufacturing Lead" />
              <ProfileField label="Department" value="Operations" />
              <ProfileField label="Join Date" value="2021-06-01" />
              <ProfileField label="Location" value="Pune, India" />
              <ProfileField label="Employee No." value="EMP123456" />
              <ProfileField label="Employment Type" value="Full-time" />
            </div>
          )}

          {activeTab === "Account Settings" && (
            <div className="space-y-4">
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
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <h4 className="text-xs text-gray-500 uppercase mb-1">{label}</h4>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  );
}
