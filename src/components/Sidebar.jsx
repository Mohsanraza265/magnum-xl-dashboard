import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800 text-white h-screen p-4">
            <img src="/logo.gif" alt="Logo" className="w-32 h-auto mt-2 mb-8" />
            <nav className="space-y-3">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded ${isActive ? "bg-gradient-to-r from-[rgb(159,113,25)] to-[rgb(243,227,156)] text-white" : "hover:text-gray-300"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/users"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded ${isActive ? "bg-gradient-to-r from-[rgb(159,113,25)] to-[rgb(243,227,156)] text-white" : "hover:text-gray-300"
                        }`
                    }
                >
                    Users
                </NavLink>
                
                <NavLink
                    to="/manage-subscription"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded ${isActive ? "bg-gradient-to-r from-[rgb(159,113,25)] to-[rgb(243,227,156)] text-white" : "hover:text-gray-300"
                        }`
                    }
                >
                    Manage Subscription
                </NavLink>

                <NavLink
                    to="/matches"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded ${isActive ? "bg-gradient-to-r from-[rgb(159,113,25)] to-[rgb(243,227,156)] text-white" : "hover:text-gray-300"
                        }`
                    }
                >
                    feedback
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded ${isActive ? "bg-gradient-to-r from-[rgb(159,113,25)] to-[rgb(243,227,156)] text-white" : "hover:text-gray-300"
                        }`
                    }
                >
                    Profile
                </NavLink>
            </nav>
        </aside>
    );
}