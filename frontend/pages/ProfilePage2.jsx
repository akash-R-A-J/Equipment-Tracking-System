import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import {
  FaUser,
  FaBuilding,
  FaUniversity,
  FaIdBadge,
  FaLock,
  FaCamera,
} from "react-icons/fa";

export const ProfilePage2 = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Replace with actual API call
    const fetchedUser = {
      name: "Akash Raj",
      birthDate: "1990-05-15",
      gender: "Male",
      phone: "9876543210",
      email: "ravi.kumar@example.com",
      nationality: "Indian",
      address: "123 Main Street, Pune",
      role: "manufacturer",
      photoUrl: "https://i.pravatar.cc/150?img=3",
      emergencyContacts: [
        { name: "Amit Sharma", relation: "Brother", phone: "9876512345" },
      ],
      education: {
        level: "B.Tech",
        stream: "Mechanical Engineering",
        university: "IIT Delhi",
      },
      employment: {
        empId: "EMP12345",
        designation: "Manager",
        manager: "Nikita Verma",
        department: "Logistics",
        location: "Pune",
        joiningDate: "2018-04-10",
        years: 6,
        type: "Full-time",
      },
      bank: {
        bankName: "SBI",
        branch: "MG Road",
        accountNo: "1234567890",
        ifsc: "SBIN0000123",
        epf: "EPF1234567",
        taxId: "PAN123456A",
      },
    };

    setUser(fetchedUser);
  }, []);

  if (!user) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="bg-gray-950 h-screen pt-10">
      <div className="max-w-5xl mx-auto text-white">
        <div className="flex items-center gap-6 mb-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <img
            src={user.photoUrl}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-400">
              {user.role === "manufacturer" ? "Manufacturer" : "User"}
            </p>
          </div>
        </div>

        <Tab.Group className="bg-gray-900 rounded-lg h-100">
          <Tab.List className="flex space-x-4 border-b border-gray-700 px-6 pt-4">
            <Tab
              className={({ selected }) =>
                `py-2 px-4 rounded-t-md ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              <FaUser className="inline mr-1" /> Personal
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-2 px-4 rounded-t-md ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              <FaUniversity className="inline mr-1" /> Education
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-2 px-4 rounded-t-md ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              <FaBuilding className="inline mr-1" /> Employment
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-2 px-4 rounded-t-md ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              <FaIdBadge className="inline mr-1" /> Bank
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-2 px-4 rounded-t-md ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              <FaLock className="inline mr-1" /> Settings
            </Tab>
          </Tab.List>
          <Tab.Panels className="p-6">
            <Tab.Panel>
              <InfoGrid
                user={user}
                fields={[
                  "birthDate",
                  "gender",
                  "phone",
                  "email",
                  "nationality",
                  "address",
                ]}
              />
            </Tab.Panel>
            <Tab.Panel>
              <InfoGrid
                user={user.education}
                fields={["level", "stream", "university"]}
              />
            </Tab.Panel>
            <Tab.Panel>
              <InfoGrid
                user={user.employment}
                fields={[
                  "empId",
                  "designation",
                  "manager",
                  "department",
                  "location",
                  "joiningDate",
                  "years",
                  "type",
                ]}
              />
            </Tab.Panel>
            <Tab.Panel>
              <InfoGrid
                user={user.bank}
                fields={[
                  "bankName",
                  "branch",
                  "accountNo",
                  "ifsc",
                  "epf",
                  "taxId",
                ]}
              />
            </Tab.Panel>
            <Tab.Panel>
              <div className="space-y-4">
                <button className="bg-blue-500 px-4 py-2 m-2 rounded hover:bg-blue-600">
                  <FaCamera className="inline mr-2" />
                  Upload Photo
                </button>
                <button className="bg-green-500 px-4 py-2 m-2 rounded hover:bg-green-600">
                  Change Password
                </button>
                <button className="bg-red-500 px-4 py-2 m-2 rounded hover:bg-red-600">
                  Delete Account
                </button>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

const InfoGrid = ({ user, fields }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fields.map((key) => (
        <div key={key}>
          <p className="text-gray-400 text-sm">{toLabel(key)}</p>
          <p className="text-white font-medium">{user[key]}</p>
        </div>
      ))}
    </div>
  );
};

const toLabel = (str) => {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
};
