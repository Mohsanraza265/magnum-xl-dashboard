import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { id } = useParams();  
  const [user, setUser] = useState(null);

  useEffect(() => {
     
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [id]);

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen text-xl">
//         Loading user details...
//       </div>
//     );
//   }

  return (
    <div className="p-6">
      {/* Header */}
      <div
        className="p-6 rounded-2xl text-white shadow-md mb-6"
        style={{
          background: "linear-gradient(to right, #9f7119, #f3e39c)",
        }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={"/detault-avator.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold">
              first_name last_name
            </h1>
            <p className="text-sm opacity-90">email@gmil.com</p>
            {/* <p className="text-sm">{user.role.toUpperCase()}</p> */}
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Number:</strong> 34939743984</li>
            <li><strong>Gender:</strong> Male</li>
            <li><strong>Date of Birth:</strong> 12/12/2020</li>
            <li><strong>Location:</strong> Newyork, USA</li>
            <li><strong>Online:</strong> Yes</li>
            {/* <li><strong>OTP Verified:</strong> {user.isOtpVerified ? "Yes ✅" : "No ❌"}</li> */}
          </ul>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quiz Information</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Sexual Orientation:</strong> Lesbian</li>
            <li><strong>Relationship Status:</strong> Divorced</li>
            <li><strong>Interests:</strong> Casual Dating</li>
            <li><strong>Bio:</strong> BIO</li>
            <li><strong>Height:</strong> 5.4 cm</li>
            <li><strong>School:</strong> abc School USA</li>
            <li><strong>Work:</strong> Work</li>
          </ul>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="mt-6 bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Subscription</h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Plan Type:</strong> premium</li>
          <li><strong>Active:</strong> Yes</li>
          <li><strong>Start Date:</strong>  12/12/2024</li>
          <li><strong>End Date:</strong> 12/12/2025</li>
          {/* <li><strong>Payment ID:</strong> {user.subscription?.paymentId || "N/A"}</li> */}
        </ul>
      </div>
    </div>
  );
}
