import React, { useState, useEffect } from "react";
import Button from "../Button";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import leetcodeLogo from "../../assets/leetcode.svg";

function Header() {
  const [user] = useAuthState(auth);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        setIsHeaderVisible(false);
      } else {
        // Scrolling up
        setIsHeaderVisible(true);
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const handleLogout = () => {
    try {
      signOut(auth).then(() => {
        toast.success("User Signed out");
        navigate("/");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header
      className={`bg-custom-gradient bg-opacity-90 w-full h-20 flex justify-between items-center p-10 cursor-pointer z-50 fixed top-0 shadow-lg border-b-[1px] border-gray-600 transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-3xl font-mono">
          <div
            className="flex items-center space-x-4 p-4 bg-custom-gradient rounded-lg h-14"
            onClick={() => navigate("/")}
          >
            <img src={leetcodeLogo} alt="LeetCode Logo" className="h-12 w-12" />
            <span className="text-2xl font-semibold text-slate-300">
              CodeGeeks
            </span>
          </div>
        </div>
      </div>
      {user ? (
        <nav>
          <a
            href=""
            className="font-mono text-xl mx-4 text-slate-200 cursor-pointer hover:text-sd-medium"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </a>
          <a
            href=""
            className="font-mono text-xl m-2 text-slate-200 cursor-pointer hover:text-sd-medium"
            onClick={() => {
              navigate("/dashboard/groups");
            }}
          >
            Groups
          </a>
          <a
            href=""
            className="font-mono text-xl m-2 text-slate-200 cursor-pointer hover:text-sd-medium"
          >
            AboutUs
          </a>
        </nav>
      ) : null}

      {user ? (
        <Button text="Logout" onClick={handleLogout} />
      ) : (
        <Button
          text="SignIn/SignUp"
          onClick={() => navigate("/signUp-signIn")}
        />
      )}
    </header>
  );
}

export default Header;
