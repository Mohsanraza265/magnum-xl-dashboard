import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUsers] = useState(1);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const fetchUsers = async (status = "all") => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${baseUrl}/api/v1/user/getUserBystatus?status=${status}`);
      setUsers(res?.data?.length);
      // console.log(res?.data?.length)
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  // initial load
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1> */}
      <h2 className="text-xl font-semibold mb-2">Welcome Admin </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 text-white font-bold rounded shadow" style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}>Total Users: {user - 1}</div>
        <div className="p-4 text-white font-bold rounded shadow" style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}>Subscription Count: 350</div>
        <div className="p-4 text-white font-bold rounded shadow" style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}>Revenue: $500</div>
      </div>
    </div>
  );
}