import { useEffect, useState } from "react";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Dummy user data. Replace this with real API call
    const fetchedUser = {
      name: "Ravi Kumar",
      birthDate: "1990-05-15",
      gender: "Male",
      phone: "9876543210",
      email: "ravi.kumar@example.com",
      nationality: "Indian",
      address: "123 Main Street, Pune",
      role: "manufacturer", // or 'user'
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
    <div className="max-w-4xl mx-auto bg-gray-800 text-white p-6 rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Profile Details</h1>

      {/* Personal Details */}
      <Section title="Personal Information">
        <Info label="Name" value={user.name} />
        <Info label="Birth Date" value={user.birthDate} />
        <Info label="Gender" value={user.gender} />
        <Info label="Phone" value={user.phone} />
        <Info label="Email" value={user.email} />
        <Info label="Nationality" value={user.nationality} />
        <Info label="Address" value={user.address} />
      </Section>

      {/* Education */}
      <Section title="Education">
        <Info label="Level/Course" value={user.education.level} />
        <Info label="Stream" value={user.education.stream} />
        <Info label="University" value={user.education.university} />
      </Section>

      {/* Manufacturer Specific */}
      {user.role === "manufacturer" && (
        <Section title="Company Details">
          <Info label="Company" value="XYZ Equipments Pvt Ltd" />
          <Info label="GST No." value="27ABCDE1234F1Z5" />
          <Info label="Manufacturer License" value="LIC12345678" />
        </Section>
      )}

      {/* Employment */}
      <Section title="Employment Details">
        <Info label="Employee ID" value={user.employment.empId} />
        <Info label="Designation" value={user.employment.designation} />
        <Info label="Manager" value={user.employment.manager} />
        <Info label="Department" value={user.employment.department} />
        <Info label="Location" value={user.employment.location} />
        <Info label="Joining Date" value={user.employment.joiningDate} />
        <Info label="Years of Service" value={user.employment.years} />
        <Info label="Type" value={user.employment.type} />
      </Section>

      {/* Bank */}
      <Section title="Bank Details">
        <Info label="Bank" value={user.bank.bankName} />
        <Info label="Branch" value={user.bank.branch} />
        <Info label="Account No" value={user.bank.accountNo} />
        <Info label="IFSC" value={user.bank.ifsc} />
        <Info label="EPF No" value={user.bank.epf} />
        <Info label="Tax ID" value={user.bank.taxId} />
      </Section>

      {/* Emergency Contacts */}
      <Section title="Emergency Contacts">
        {user.emergencyContacts.map((c, i) => (
          <div key={i} className="mb-2">
            <Info label="Name" value={c.name} />
            <Info label="Relation" value={c.relation} />
            <Info label="Phone" value={c.phone} />
          </div>
        ))}
      </Section>

      {/* Account Settings */}
      <Section title="Account Settings">
        <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 mb-2">
          Upload Profile Picture
        </button>
        <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 mb-2 ml-2">
          Change Password
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 ml-2"
        >
          Delete Profile
        </button>
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold border-b border-gray-600 mb-2 pb-1">
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <span className="text-gray-400">{label}:</span>{" "}
    <span className="font-medium">{value}</span>
  </div>
);
