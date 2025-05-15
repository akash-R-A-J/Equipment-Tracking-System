import { Link } from "react-router-dom";
import { Navbar2 } from "../components/Navbar2";

export const LandingPage3 = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition">
      <Navbar2 />

      {/* Hero Section */}
      <section className="dark:bg-gray-950 px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Track Your Equipment on Blockchain
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          Secure, transparent, and immutable equipment tracking system powered
          by Solana blockchain.
        </p>
        <div className="mt-12 space-x-5">
          <Link
            to={"user-signup"}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition hover:underline"
          >
            Signup as a User
          </Link>
          <Link
            to={"manufacturer-signup"}
            className="bg-blue-600 text-white px-6 py-3 hover:underline rounded hover:bg-blue-700 transition"
          >
            Signup as a Manufacturer
          </Link>
        </div>

        <hr className="my-10 mt-30 mx-auto w-1/2 border-gray-300 dark:border-gray-700" />
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="px-6 py-16 bg-gray-100 dark:bg-gray-900 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Why Choose BlockTrack?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <FeatureComponent
            header={"Decentralized & Secure"}
            body={
              "Data is stored on-chain via Solana for high performance and tamper-proof records."
            }
          />
          <FeatureComponent
            header={"Real-Time Tracking"}
            body={
              "Track equipment status, location, and ownership in real-time from anywhere."
            }
          />
          <FeatureComponent
            header={"User-Friendly Interface"}
            body={
              "Simple and intuitive UI built using MERN stack with responsive design."
            }
          />
        </div>
      </section>

      <section className="dark:bg-gray-900">
        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="bg-gray-950 px-6 py-20 m-2 mx-50 text-center hover:bg-gray-500 dark:hover:bg-gray-800
                  hover:rounded hover:py-15 hover:my-5 delay-100 duration-100"
          // className="bg-gray-950 px-6 py-20 mx-50 my-5 text-center hover:bg-gray-500 dark:hover:bg-gray-800
          //         hover:rounded delay-100 duration-100"
        >
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Every asset registered is assigned a unique ID, and all its
            movements and status changes are recorded immutably on the Solana
            blockchain. Only authorized users can update the status using their
            credentials and private keys.
          </p>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="bg-gray-950 px-6 py-20 m-2 mx-50 text-center hover:bg-gray-500 dark:hover:bg-gray-800
                  hover:rounded hover:py-15 hover:my-5 delay-100 duration-100"
          // className="bg-gray-950 px-6 py-20 mx-50 text-center hover:bg-gray-500 dark:hover:bg-gray-800
          //         hover:rounded delay-100 duration-100"
        >
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            BlockTrack is a blockchain-based asset management system designed
            for organizations that value security, transparency, and automation.
            Built by a passionate team of developers and blockchain enthusiasts.
          </p>
        </section>

        {/* Contact Section */}
        {/* <section
          id="contact"
          className="bg-gray-950 px-6 py-20 mx-50 text-center hover:bg-gray-500 dark:hover:bg-gray-800
                hover:px-2 hover:py-20 hover:rounded delay-100 duration-100"
        >
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Have questions or want to collaborate? Email us at{" "}
            <a
              href="mailto:support@blocktrack.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              support@blocktrack.com
            </a>
          </p>
        </section> */}
      </section>

      <footer className="mt-10 bg-gray-800 text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        © 2025 BlockTrack. All rights reserved.
      </footer>
    </div>
  );
};

export const FeatureComponent = ({ header, body }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow light:hover:bg-gray-500">
      <h3 className="text-xl font-semibold mb-2">{header}</h3>
      <p>{body}</p>
    </div>
  );
};
