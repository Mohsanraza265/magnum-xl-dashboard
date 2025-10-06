import axios from "axios";
import { useEffect, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const filtered = users.filter(
        (u) =>
            u.first_name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u._id.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const start = (page - 1) * perPage;
    const visible = filtered.slice(start, start + perPage);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const fetchOtherUsers = async () => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${baseUrl}/api/v1/user/`);

            setUsers(res?.data)
        } catch (error) {
            console.log(error);
        }
    }
    const [statusFilter, setStatusFilter] = useState("all");
    const updateStatus = async (id, value) => {
        try {
            const status = value === "true"; // dropdown se string aayegi → bool convert

            await axios.patch(`${baseUrl}/api/v1/user/status`, {
                id,
                status,
            });

            fetchUsers(statusFilter);
        } catch (error) {
            console.log("Error updating status:", error);
        }
    };
    // useEffect(() => {
    //     fetchOtherUsers()
    // }, []);
    // Status filter ke liye state

    // fetch users by status
    const fetchUsers = async (status = "all") => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${baseUrl}/api/v1/user/getUserBystatus?status=${status}`);
            setUsers(res?.data);
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    // initial load
    useEffect(() => {
        fetchUsers(statusFilter);
    }, [statusFilter]);

    return (
        <div className="p-6">
            {/* Gradient header */}
            <div
                className="rounded-xl p-5 mb-6 text-white shadow-md"
                style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Users Management</h1>
                        <p className="text-sm opacity-90">View, search and manage registered users</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white/20 rounded-lg px-3 py-2">
                            <FiSearch className="mr-2" />
                            <input
                                className="bg-transparent outline-none placeholder-white/80 text-white"
                                placeholder="Search by name, email, or id"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <label className="text-sm">Showing Records Per Page:</label>
                    <select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                        className="border rounded px-3 py-2"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-sm">Status:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value.toLowerCase()); // "Active" → "active"
                            setPage(1);
                        }}
                        className="border rounded px-3 py-2"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Card + Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">Users List</h2>
                        <p className="text-sm text-gray-500">
                            Showing {Math.min(start + 1, filtered.length || 0)} to {Math.min(start + visible.length, filtered.length)} of {filtered.length} entries
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">S.No</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visible.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                visible.map((u, i) => (
                                    <tr key={u._id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm">{start + i + 1}</td>
                                        <td className="px-4 py-3 text-sm">{u.first_name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                                        <td className="px-4 py-3 text-sm">{u.dateOfBirth}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <select
                                                value={u.status}
                                                onChange={(e) => updateStatus(u._id, e.target.value)}
                                                className={`px-2 py-1 rounded border text-sm ${u.status === false ? "text-red-700 bg-red-50" : "text-green-700 bg-green-50"
                                                    }`}
                                            >
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Link
                                                to={`/users/${u._id}`}
                                                title="View user"
                                                className="inline-flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                                            >
                                                <FiEye />

                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination footer */}
                <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="text-sm text-gray-600">
                        Showing {Math.min(start + 1, filtered.length || 0)} to {Math.min(start + visible.length, filtered.length)} of {filtered.length} entries
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 rounded border disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {/* page numbers (compact) */}
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pidx) => (
                            <button
                                key={pidx}
                                onClick={() => setPage(pidx)}
                                className={`px-3 py-1 rounded border ${pidx === page ? "bg-gradient-to-r from-[rgb(159,113,25)] to-[rgb(243,227,156)] text-white" : ""}`}
                            >
                                {pidx}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1 rounded border disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
