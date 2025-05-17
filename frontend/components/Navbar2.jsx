import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "../src/DarkmodeToggle";

export const Navbar2 = () => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected === "user") {
      navigate("/user-signup");
    } else if (selected === "manufacturer") {
      navigate("/manufacturer-signup");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-950 shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50 transition">
      <div className="text-2xl font-bold text-blue-900 dark:text-white">
        <img src="/blocktrack_logo.png" alt="blocktrack_logo" className="w-2/5 h-auto" />
      </div>

      <ul className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300 font-medium ml-38">
        <li>
          <a
            href="#features"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Features
          </a>
        </li>
        <li>
          <a
            href="#how-it-works"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            How it Works
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Contact
          </a>
        </li>
      </ul>

      <div className="hidden md:flex gap-4 items-center">
        <Link
          to={"/login"}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Login
        </Link>
        <button className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 dark:hover:bg-green-600 transition">
          Request Demo
        </button>
        <DarkModeToggle />
      </div>
    </nav>
  );
};
