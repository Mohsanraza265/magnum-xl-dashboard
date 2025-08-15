import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
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