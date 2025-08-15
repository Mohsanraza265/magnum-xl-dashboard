import { FiBell } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside close handler
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
            <Link to="/login" className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </Link >
          </div>
        )}
      </div>
    </header>
  );
}
