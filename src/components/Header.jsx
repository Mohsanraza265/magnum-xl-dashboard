import { FiBell } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${baseUrl}/api/v1/user/logout`);
      localStorage.removeItem("token");
      localStorage.removeItem("user");


      window.dispatchEvent(new Event("storage"));

      navigate("/login", { replace: true });
      toast.success(res.data.message);

    } catch (error) {
      console.log(error);
    }
  }

  const [loggedInUser, setLoggedInUser] = useState(null);
 
   useEffect(() => {
    // 1. Initial load pe user ko localStorage se set karo
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }

    // 2. Dusri tab se update ka listener
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        if (event.newValue) {
          setLoggedInUser(JSON.parse(event.newValue));
        } else {
          setLoggedInUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center bg-gray-100 px-6 py-3 shadow-sm relative">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Notification */}
        <button className="p-2 bg-white rounded-full shadow">
          <FiBell />
        </button>

        {/* Profile Image */}
        <img
          src={`${loggedInUser?.image ? loggedInUser?.image : "/detault-avator.png"}`}
          alt="Admin"
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
          onClick={() => setOpen(!open)}
        />

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-lg border z-10 py-2">
            <Link to={`/profile/${loggedInUser._id}`} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Profile
            </Link >
            <button
              onClick={logoutHandler}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
