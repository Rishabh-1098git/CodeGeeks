import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroImg from "../assets/HeroImage.jpg";
import Dashboard from "../assets/Dashboard.jpg";
import Chat from "../assets/Chat.jpg";
import Leaderboard from "../assets/Leaderboard.jpg";
// Import the About Us image
import Contribution from "../assets/Contribute.jpg";
import ContributeImg from "../assets/github1.png";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-home-gradient text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-6 h-screen">
        {/* Hero Image Section */}
        <div className="flex justify-center lg:justify-start mb-8 lg:mb-0 lg:ml-10 lg:-rotate-12">
          <motion.img
            src={HeroImg}
            alt="Hero"
            className="rounded-3xl h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] shadow-sd-easy transform lg:-rotate-12"
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        {/* Text and Button Section */}
        <div className="text-center lg:text-left lg:ml-24">
          <h1 className="text-5xl lg:text-6xl font-mono font-bold mb-4">
            CodeGeeks
          </h1>
          <h2 className="text-xl lg:text-3xl font-mono text-sd-medium mb-6">
            Create groups, compete, and discuss with others to keep Leetcoding.
          </h2>
          <Link to="/signUp-signIn">
            <button
              className="bg-sd-easy h-12 w-40 rounded-3xl font-mono font-bold hover:bg-cyan transition duration-300"
              onClick={() => navigate("/signUp-signIn")}
            >
              Create Account
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-4xl text-center font-bold mb-12 font-mono">
          Features
        </h2>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            className="text-center bg-custom-dark-gray p-6 rounded-lg shadow-md shadow-sd-easy"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
          >
            <img
              src={Dashboard}
              alt="Feature 1"
              className="mx-auto mb-4 max-h-60 rounded-3xl w-[70%]"
            />
            <h3 className="text-2xl font-bold mb-2 font-mono text-sd-easy">
              Personal Finance Tracker
            </h3>
            <p className="font-mono">
              Manage your expenses and income with our intuitive finance
              tracker.
            </p>
          </motion.div>
          <motion.div
            className="text-center bg-custom-dark-gray p-6 rounded-lg shadow-md shadow-sd-medium"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
          >
            <img
              src={Chat}
              alt="Feature 2"
              className="mx-auto mb-4 max-h-60 rounded-3xl w-[70%]"
            />
            <h3 className="text-2xl font-bold mb-2 font-mono text-sd-medium">
              Group Collaboration
            </h3>
            <p className="font-mono">
              Create and join groups to collaborate on coding challenges.
            </p>
          </motion.div>
          <motion.div
            className="text-center bg-custom-dark-gray p-6 rounded-lg shadow-md shadow-sd-hard"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
          >
            <img
              src={Leaderboard}
              alt="Feature 3"
              className="mx-auto mb-4 max-h-60 rounded-3xl"
            />
            <h3 className="text-2xl font-bold mb-2 font-mono text-sd-hard">
              Real-Time Chat
            </h3>
            <p className="font-mono">
              Communicate with group members in real-time with our built-in chat
              feature.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-about-gradient relative overflow-hidden">
        <motion.div
          className="absolute w-full h-full opacity-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center relative z-10 -rotate-1">
          <motion.div
            className="text-center lg:text-left mr-10 "
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
          >
            <h2 className="text-4xl font-bold font-mono mb-6 ">About Us</h2>
            <p className="text-xl mb-6 font-mono ">
              CodeGeeks is an open-source project aimed at creating a platform
              where developers can collaborate, compete, and enhance their
              coding skills together. Join us and be a part of a thriving
              community of coding enthusiasts.
            </p>
            <Link to="https://github.com/Rishabh-1098git">
              <button className="bg-sd-medium h-12 w-40 rounded-3xl font-mono font-bold hover:bg-yellow-400 transition duration-300 text-blue-900">
                Learn More
              </button>
            </Link>
          </motion.div>
          <motion.img
            src={Contribution}
            alt="About Us"
            className="rounded-3xl h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] shadow-sd-medium transform lg:rotate-12 mr-10"
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      <section className="py-16  relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center relative z-10">
          <motion.img
            src={ContributeImg}
            alt="Contribute"
            className="rounded-3xl h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] shadow-sd-easy transform lg:rotate-12 mb-8 lg:mb-0"
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-center lg:text-left lg:ml-10">
            <h2 className="text-4xl font-bold font-mono mb-6">Contribute</h2>
            <p className="text-xl mb-6 font-mono">
              We welcome contributions from developers of all skill levels.
              Whether you want to help with code, documentation, or simply
              provide feedback, there are many ways you can contribute to
              CodeGeeks. Join us in building a great platform for everyone!
            </p>
            <Link to="/contribute">
              <button className="bg-sd-medium h-12 w-40 rounded-3xl font-mono font-bold hover:bg-yellow-400 transition duration-300 text-blue-900">
                Contribute Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-custom-gradient text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CodeGeeks. All rights reserved.
          </p>
          <div className="mt-4">
            <Link to="/privacy" className="text-sd-medium hover:underline mx-2">
              Privacy Policy
            </Link>
            |
            <Link to="/terms" className="text-sd-medium hover:underline mx-2">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
