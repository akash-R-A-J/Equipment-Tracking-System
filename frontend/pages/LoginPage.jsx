import { useState } from "react";
import { BlockTrackLogo } from "../components/BlocktrackLogo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginPage = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${role} : ${username} : ${password}`);

    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:5000/api/v0/${
          role === "user" ? "users" : "manufacturers"
        }/login`,
        data: { username, password },
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Navigate on success
      if (role === "user") {
        navigate("/user-dashboard");
      } else if (role === "manufacturer") {
        navigate("/manufacturer-dashboard");
      }
      
      // console.log()
      localStorage.setItem("role", role);
      localStorage.setItem("x-auth-token", response.data.token);
      alert(response.data.message || "Login successful");

      // Clear form fields
      setRole("");
      setPassword("");
      setUsername("");
    } catch (e) {
      console.log("Error while logging in: ", e);
      alert("Login failed. Please check credentials.");
    }
  };

  return (
    <div>
      <div className="h-screen inset-0 bg-gray-900 flex items-center justify-center z-50 py-20">
        <div
          className="bg-gray-950 text-white p-8 rounded-2xl 
                  shadow-2xl w-full max-w-xl transition-all border rounded-3xl border-blue-500"
        >
          <h2 className="text-2xl font-bold mb-2 justify-center flex">
            Sign in to
            <BlockTrackLogo />
          </h2>

          <hr className="w-2/3 mx-auto text-yellow-400 mb-5" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Select Role</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 
                        dark:border-gray-600 bg-white dark:bg-gray-700 text-black 
                        dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" className="text-gray-400">
                  Select Role
                </option>
                <option value="user">User</option>
                <option value="manufacturer">Manufacturer</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white 
                          dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white 
                          dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end gap-4 pt-2">
              <CancelButton />
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const CancelButton = () => {
  return (
    <Link
      to={"/"}
      className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 
                    dark:hover:bg-gray-500 text-black dark:text-white transition"
    >
      Cancel
    </Link>
  );
};
