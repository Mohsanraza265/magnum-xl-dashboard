import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePackage() {
    const [packageName, setPackageName] = useState("");
    const [packagePrice, setPackagePrice] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

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
                            value={packageName}
                            onChange={(e) => setPackageName(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Package Price</label>
                        <input
                            type="password"
                            value={packagePrice}
                            onChange={(e) => setPackagePrice(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        />
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
