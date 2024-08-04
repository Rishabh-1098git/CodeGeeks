import React, { useState, useEffect } from "react";
import Button from "../Button";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, Dropdown } from "antd"; // Import Ant Design components
import { TiThMenu } from "react-icons/ti";
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

  const menu = (
    <Menu>
      <Menu.Item key="dashboard" onClick={() => navigate("/dashboard")}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="groups" onClick={() => navigate("/dashboard/groups")}>
        Groups
      </Menu.Item>
      <Menu.Item key="aboutus" onClick={() => navigate("/aboutus")}>
        About Us
      </Menu.Item>
    </Menu>
  );

  return (
    <header
      className={`bg-custom-gradient bg-opacity-90 w-full h-20 flex justify-between items-center p-4 lg:p-10 cursor-pointer z-50 fixed top-0 shadow-lg border-b-[1px] border-gray-600 transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={leetcodeLogo}
          alt="LeetCode Logo"
          className="h-8 w-8 lg:h-12 lg:w-12"
        />
        <span className="hidden lg:block text-xl lg:text-2xl font-semibold text-slate-300">
          CodeGeeks
        </span>
      </div>
      {user ? (
        <div className="hidden lg:flex space-x-4">
          <a
            href="#"
            className="font-mono text-xl text-slate-200 cursor-pointer hover:text-sd-medium"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </a>
          <a
            href="#"
            className="font-mono text-xl text-slate-200 cursor-pointer hover:text-sd-medium"
            onClick={() => navigate("/dashboard/groups")}
          >
            Groups
          </a>
          <a
            href="#"
            className="font-mono text-xl text-slate-200 cursor-pointer hover:text-sd-medium"
          >
            AboutUs
          </a>
          <Button text="Logout" onClick={handleLogout} />
        </div>
      ) : null}

      {user ? (
        <div className="lg:hidden flex items-center ">
          <Dropdown overlay={menu} trigger={["click"]}>
            <button className="text-black font-mono h-10 w-12 text-xl mx-8 bg-sd-medium rounded-3xl border-2 border-black shadow-lg flex justify-center items-center">
              <TiThMenu />
            </button>
          </Dropdown>
          <Button text="Logout" onClick={handleLogout} className="ml-4" />
        </div>
      ) : (
        <Button
          text="SignIn/SignUp"
          onClick={() => navigate("/signUp-signIn")}
          className="lg:hidden"
        />
      )}
    </header>
  );
}

export default Header;
