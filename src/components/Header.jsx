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
          src="https://i.pravatar.cc/40"
          alt="Admin"
          className="rounded-full cursor-pointer border-2 border-gray-300"
          onClick={() => setOpen(!open)}
        />

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-lg border py-2">
            <Link to="/profile" className="block w-full text-left px-4 py-2 hover:bg-gray-100">
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
