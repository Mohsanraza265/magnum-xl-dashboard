import axios from "axios";
import { useEffect, useState } from "react";
import { FiEye, FiSearch, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
const dummyUsers = [
  { id: "a101", name: "Premium", email: "amina@example.com", date: "2025-01-01", status: "Active" },
  { id: "a2121", name: "Free", email: "owais@example.com", date: "2025-01-02", status: "Active" },
  { id: "fad21", name: "Premium", email: "sana@example.com", date: "2025-01-03", status: "Inactive" },
  { id: "as123", name: "Free", email: "imran@example.com", date: "2025-01-04", status: "Active" }
];
export default function ManageSubscription() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u._id.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);
  const fetchUsers = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${baseUrl}/api/v1/package/get-packages`);
      setUsers(res?.data?.packages);
      console.log(res?.data)
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const updateStatus = (id, status) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  };
  return (
    <div className="p-6">
      {/* Gradient header */}
      <div
        className="rounded-xl p-5 mb-6 text-white shadow-md"
        style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Manage Subscription</h1>
            {/* <p className="text-sm opacity-90">View, search and manage registered users</p> */}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {/* <Link to="/create-package" className=" bg-gray-800 text-white rounded-lg px-3 py-2 cursor-pointer">Create Package</Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
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
            onChange={(e) => {
              const v = e.target.value;
              if (v === "All") {
                setUsers(dummyUsers);
              } else {
                // UI filter only — in real app fetch server-side
                setUsers(dummyUsers.filter((u) => (v === "Active" ? u.status === "Active" : u.status === "Inactive")));
              }
              setPage(1);
            }}
            className="border rounded px-3 py-2"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gradient-to-r from-[rgb(159,113,25)] to-[rgb(243,227,156)] text-white rounded-lg px-3 py-2">
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
      </div> */}

      {/* Card + Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-3xl">Package List</h2>
            <p className="text-sm text-gray-500">
              {/* Showing {Math.min(start + 1, filtered.length || 0)} to {Math.min(start + visible.length, filtered.length)} of {filtered.length} entries */}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">S.No</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Package Name</th>
                {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th> */}
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Duration</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>

            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    No package found.
                  </td>
                </tr>
              ) : (
                visible.map((u, i) => (
                  <tr key={u._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{start + i + 1}</td>
                    <td className="px-4 py-3 text-sm">{u.name}</td>
                     
                    <td className="px-4 py-3 text-sm">{u.duration}</td>
                    <td className="px-4 py-3 text-sm">
                      {u.status == true ? "Active" : "Inactive"}
                      {/* <select
                        value={u.status}
                        onChange={(e) => updateStatus(u.id, e.target.value)}
                        className={`px-2 py-1 rounded border text-sm ${u.status === "Active" ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
                          }`}
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select> */}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {/* <Link
                        to={`/users/${u.id}`}
                        title="View user"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                      >
                        <FiEye />
                      </Link> */}
                      <Link
                        to=""
                        title="View Package"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                      >
                        <FiEdit />
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