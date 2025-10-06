import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreatePackage() {
    const [name, setPackageName] = useState("");
    const [price, setPackagePrice] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();

        const packageObject = {
            name,
            price,
            description,
            duration
        }
 
        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/api/v1/package/create-package`, packageObject, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            toast.success(res?.data?.message);
            navigate("/manage-subscription");
            console.log(res, "resp")

        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data?.message, "set");
        } finally {
            setLoading(false); // stop loading

        }
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 rounded-lg text-white w-[100px]"
                    style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}
                >
                    ← Back
                </button>
                <h1 className="text-2xl font-bold text-center mb-6 mt-5">Create Subscription</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setPackageName(e.target.value)}
                            required
                            placeholder="Enter name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Package Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPackagePrice(e.target.value)}
                            required
                            placeholder="Enter price"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Enter description..."
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            rows={4}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        >
                            <option value="">Select Duration</option>
                            <option value="1">1 Month</option>
                            <option value="3">3 Months</option>
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                        </select>
                    </div>

                    <div className="flex gap-2 justify-center items-center">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-lg font-medium text-white shadow-md"
                            style={{ background: "linear-gradient(to right,#9f7119,#f3e39c)" }}
                        >
                            Save
                        </button>
                    </div>
                </form>


            </div>
        </>
    );
}
