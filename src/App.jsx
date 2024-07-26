import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import GroupPage from "./pages/GroupPage"; // Adjust the path according to your structure

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="bg-black-bg ">
      <ToastContainer />
      <Router>
        <Header />{" "}
        {/* Assuming Header component should be present on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp-signIn" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/groups" element={<Groups />} />
          <Route path="/groups/:groupId" element={<GroupPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
