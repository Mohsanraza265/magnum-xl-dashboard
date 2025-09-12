import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Login attempt:", { email, password });
    const user = {
      email,
      password
    }
     
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      toast.success(res.data.message);
      navigate("/");

       
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message, "set");
    } finally {
      setLoading(false); // stop loading

    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg font-medium text-white shadow-md"
            style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}
          >
            { loading ? "Loading" : "Login" }
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Forgot your password?{" "}
          <a href="#" className="text-yellow-700 font-medium hover:underline">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
}
