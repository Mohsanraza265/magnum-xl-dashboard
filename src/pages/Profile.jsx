import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";


export default function Profile() {
    const { id } = useParams();
    // console.log(id, "id params")
    const [user, setUser] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [userGender, setGenderUser] = useState({
        gender: "",
    });
    const [image, setImage] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [location, setLocation] = useState("");

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [loggedInUser, setLoggedInUser] = useState(null);

    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);

    // useEffect(() => {
    //     const handleStorageChange = () => {
    //         const data = localStorage.getItem("user");
    //         if (data) {
    //             setLoggedInUser(JSON.parse(data));
    //         }
    //     };
    //     window.addEventListener("storage", handleStorageChange);
    //     return () => window.removeEventListener("storage", handleStorageChange);
    // }, []);

    const fetchUserData = async (id) => {
        try {
            const response = await axios.get(
                `${baseUrl}/api/v1/user/get-user/${id}`
            );
            setLoggedInUser(response?.data?.user);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userId", loggedInUser?._id);
        if (email) {
            formData.append("email", email);
        }
        if (first_name) {
            formData.append("first_name", first_name);
        }
        if (last_name) {
            formData.append("last_name", last_name);
        }
        if (number) {
            formData.append("number", number);
        }
        if (userGender.gender) {
            formData.append("gender", userGender.gender);
        }
        if (birthDate) {
            formData.append("dateOfBirth", birthDate);
        }
        if (location) {
            formData.append("location", location);
        }
        if (password) {
            formData.append("password", password);
        }
        if (image) {
            formData.append("file", image);
        }
        setLoading(true);
        try {
            const res = await axios.put(`${baseUrl}/api/v1/user/edit-user`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            toast.success(res.data.message);
            fetchUserData(id);
            console.log(res, "res edit profile")
            localStorage.setItem("user", JSON.stringify(res?.data?.user));
            setOpen(!open)
        } catch (error) {
            const errors = error.response?.data?.errors;

            if (errors) {
                Object.values(errors).forEach((errMsg) => {
                    toast.error(errMsg);
                })
            }
        } finally {
            setLoading(false);
            setGenderUser({
                gender: "",
            });
        }


    }

    return (
        <>
            {
                !open ?
                    <>
                        <div className="p-6">
                            {/* Header */}
                            <div
                                className="p-6 rounded-2xl text-white shadow-md mb-6 relative flex justify-between items-center"
                                style={{
                                    background: "linear-gradient(to right, #9f7119, #f3e39c)",
                                }}
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={`${loggedInUser?.image ? loggedInUser?.image : "/detault-avator.png"}`}
                                        alt="User Avatar"
                                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                                    />
                                    <div>
                                        <h1 className="text-3xl capitalize font-bold">
                                            {loggedInUser?.first_name} {loggedInUser?.last_name}
                                        </h1>
                                        <p className="text-sm opacity-90">{loggedInUser?.email}</p>
                                        {/* <p className="text-sm">{user.role.toUpperCase()}</p> */}
                                    </div>
                                </div>
                                <div onClick={() => setOpen(!open)} className=" rounded-full bg-black text-center cursor-pointer w-14 h-14 flex justify-center items-center">
                                    <FiEdit2 size={25} color="white" />
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white shadow rounded-xl p-6">
                                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                                    <ul className="space-y-2 text-gray-700">
                                        <li><strong>Number:</strong> {loggedInUser?.number}</li>
                                        <li><strong>Gender:</strong> Male</li>
                                        <li><strong>Date of Birth:</strong> {dayjs(loggedInUser?.dateOfBirth).format("MMMM D, YYYY")}</li>
                                        <li><strong>Location:</strong> {loggedInUser?.location}</li>
                                        {/* <li><strong>Online:</strong> Yes</li> */}
                                        {/* <li><strong>OTP Verified:</strong> {user.isOtpVerified ? "Yes ✅" : "No ❌"}</li> */}
                                    </ul>
                                </div>

                                <div className="bg-white shadow rounded-xl p-6">
                                    <h2 className="text-lg font-semibold mb-4">Quiz Information</h2>
                                    <ul className="space-y-2 text-gray-700">
                                        <li><strong>Sexual Orientation:</strong> {loggedInUser?.quiz?.sexualOrientation}</li>
                                        <li><strong>Relationship Status:</strong> {loggedInUser?.quiz?.relationshipStatus}</li>
                                        <li><strong>Interests:</strong> {loggedInUser?.quiz?.interests}</li>
                                        <li><strong>Bio:</strong> {loggedInUser?.quiz?.bio}</li>
                                        <li><strong>Height:</strong>{loggedInUser?.quiz?.height} cm</li>
                                        <li><strong>School:</strong> {loggedInUser?.quiz?.school}</li>
                                        <li><strong>Work:</strong> {loggedInUser?.quiz?.work}</li>
                                    </ul>
                                </div>
                            </div>


                            {/* <div className="mt-6 bg-white shadow rounded-xl p-6">
                                <h2 className="text-lg font-semibold mb-4">Subscription</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li><strong>Plan Type:</strong> {loggedInUser?.subscription?.planType}</li>
                                    <li><strong>Active:</strong> {loggedInUser?.subscription?.isActive ? 'Yes' : 'No'}</li>
                                    <li><strong>Start Date:</strong>  {startDate}</li>
                                    <li><strong>End Date:</strong> {endDate}</li>
                                     
                                </ul>
                            </div> */}
                        </div>
                    </>
                    :
                    <>
                        <div className="flex">
                            <button
                                onClick={() => setOpen(!open)}
                                className="px-4 py-2 rounded-lg text-white w-[100px] h-10 mr-4"
                                style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}
                            >
                                ← Back
                            </button>
                            <div className="bg-white rounded-2xl shadow-lg w-full max-w-[1000px] p-8">
                                <h1 className="text-2xl font-bold text-center mb-4 ">Edit Your Profile</h1>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="flex flex-wrap">
                                        <div className="lg:w-1/2 w-full">
                                            <div className="p-3">

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                    <input
                                                        type="text"
                                                        value={first_name}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        placeholder="first name"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                    <input
                                                        type="text"
                                                        value={last_name}
                                                        onChange={(e) => setLastName(e.target.value)}

                                                        placeholder="last name"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    <input
                                                        type="text"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}

                                                        placeholder="email"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                                                    <input
                                                        type="text"
                                                        value={number}
                                                        onChange={(e) => setNumber(e.target.value)}

                                                        placeholder="number"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}

                                                        placeholder="password"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:w-1/2 w-full">
                                            <div className="p-3">

                                                <div className="flex py-1 gap-4 items-center">
                                                    <label className=' text-sm font-medium text-gray-700'>Gender*</label>
                                                    <label
                                                        className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-300
    ${userGender.gender === "Men" ? "bg-gradient-to-r from-[#9f7119] to-[#f3e39c] text-white" : "bg-gray-100 text-gray-700"}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="Men"
                                                            checked={userGender.gender === "Men"}
                                                            onChange={() =>
                                                                setGenderUser((prev) => ({ ...prev, gender: "Men" }))
                                                            }
                                                            className="hidden"
                                                        />
                                                        Men
                                                    </label>

                                                    <label
                                                        className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-300
    ${userGender.gender === "Women" ? "bg-gradient-to-r from-[#9f7119] to-[#f3e39c] text-white" : "bg-gray-100 text-gray-700"}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="Women"
                                                            checked={userGender.gender === "Women"}
                                                            onChange={() =>
                                                                setGenderUser((prev) => ({ ...prev, gender: "Women" }))
                                                            }
                                                            className="hidden"
                                                        />
                                                        Women
                                                    </label>
                                                </div>
                                                <div className='py-1'>
                                                    <label className=' text-sm font-medium text-gray-700 mr-2'>Profile Image</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setImage(file);
                                                            }
                                                        }}
                                                        className="bg-gray-700 p-2 text-white rounded w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        value={birthDate}
                                                        onChange={(e) => setBirthDate(e.target.value)}

                                                        placeholder="password"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                                    <input
                                                        type="text"
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}

                                                        placeholder="Enter your city or address"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 justify-center items-center">
                                        <button
                                            type="submit"
                                            className=" w-60 py-2 px-4 rounded-lg font-medium text-white shadow-md"
                                            style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}
                                        >
                                            {Loading ? "Loading..." : "Update"}
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </>
            }

        </>
    );
}
