import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [updating, setUpdating] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!user) return;

        setUpdating(true);
        try {
            await updateProfile(user, { displayName, photoURL });

            Swal.fire({
                icon: "success",
                title: "Profile updated successfully!",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error("Profile update failed:", err);
            Swal.fire({
                icon: "error",
                title: "Update failed!",
                text: err.message,
            });
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex justify-center items-center px-6 py-16 bg-linear-to-br from-indigo-50 via-blue-50 to-slate-100">
            <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200 p-10 rounded-2xl shadow-xl w-full max-w-lg transition hover:shadow-2xl">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] rounded-2xl"></div>

                <div className="relative">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        My Profile
                    </h2>

                    <div className="flex flex-col items-center mb-8">
                        <img
                            src={photoURL || "https://i.ibb.co/2Z3QvQ9/default-avatar.png"}
                            alt="User Avatar"
                            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md mb-3"
                        />
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {displayName || "Unnamed User"}
                        </h3>
                        <p className="text-gray-600 text-sm">{user?.email}</p>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-5">
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full rounded-full bg-white/70"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Photo URL
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full rounded-full bg-white/70"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full rounded-full text-lg"
                            disabled={updating}
                        >
                            {updating ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Update Profile"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;