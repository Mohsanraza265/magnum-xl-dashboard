import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Matches from "./pages/Matches";
import ManageSubscription from "./pages/ManageSubscription";
import CreatePackage from "./pages/CreatePackage";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import Profile from "./pages/Profile";
import EditPackage from "./pages/EditPackage";
import { useEffect, useState } from "react";

export default function App() {
  
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Jab bhi localStorage change ho, state update kar do
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Public wrapper
  const PublicRoute = ({ children }) => {
    if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="matches" element={<Matches />} />
          <Route path="manage-subscription" element={<ManageSubscription />} />
          <Route path="create-package" element={<CreatePackage />} />
          <Route path="edit-package" element={<EditPackage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
