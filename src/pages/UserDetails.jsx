import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // console.log(userData)
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/user/get-user/${id}`
      );
      setUserData(response?.data?.user);
      setDateOfBirth(
        dayjs(response?.data?.user?.dateOfBirth).format("MMMM D, YYYY")
      );
      setStartDate(
        dayjs(response?.data?.user?.subscription?.startDate).format("MMMM D, YYYY")
      );
      setEndDate(
        dayjs(response?.data?.user?.subscription?.endDate).format("MMMM D, YYYY")
      );
      //   console.log("response fetching user data:", response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);
  useEffect(() => {

    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="p-6">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 rounded-lg text-white w-[100px] mb-4"
        style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}
      >
        ← Back
      </button>
      <div
        className="p-6 rounded-2xl text-white shadow-md mb-6"
        style={{
          background: "linear-gradient(to right, #9f7119, #f3e39c)",
        }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={`${userData?.image ? userData?.image : "/detault-avator.png" }`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-3xl capitalize font-bold">
              {userData?.first_name} {userData?.last_name}
            </h1>
            <p className="text-sm opacity-90">{userData?.email}</p>
            {/* <p className="text-sm">{user.role.toUpperCase()}</p> */}
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Number:</strong> {userData?.number}</li>
            <li><strong>Gender:</strong> Male</li>
            <li><strong>Date of Birth:</strong> {dateOfBirth}</li>
            <li><strong>Location:</strong> {userData?.location}</li>
            {/* <li><strong>Online:</strong> Yes</li> */}
            {/* <li><strong>OTP Verified:</strong> {user.isOtpVerified ? "Yes ✅" : "No ❌"}</li> */}
          </ul>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quiz Information</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Sexual Orientation:</strong> {userData?.quiz?.sexualOrientation}</li>
            <li><strong>Relationship Status:</strong> {userData?.quiz?.relationshipStatus}</li>
            <li><strong>Interests:</strong> {userData?.quiz?.interests}</li>
            <li><strong>Bio:</strong> {userData?.quiz?.bio}</li>
            <li><strong>Height:</strong>{userData?.quiz?.height} cm</li>
            <li><strong>School:</strong> {userData?.quiz?.school}</li>
            <li><strong>Work:</strong> {userData?.quiz?.work}</li>
          </ul>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="mt-6 bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Subscription</h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Plan Type:</strong> {userData?.subscription?.planType}</li>
          <li><strong>Active:</strong> {userData?.subscription?.isActive ? 'Yes' : 'No'}</li>
          <li><strong>Start Date:</strong>  {startDate}</li>
          <li><strong>End Date:</strong> {endDate}</li>
          {/* <li><strong>Payment ID:</strong> {user.subscription?.paymentId || "N/A"}</li> */}
        </ul>
      </div>
    </div>
  );
}
