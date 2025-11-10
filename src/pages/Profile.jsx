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
            await updateProfile(user, {
                displayName,
                photoURL,
            });

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
        <div className="min-h-[80vh] flex justify-center items-center p-6">
            <div className="bg-base-200 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                    My Profile
                </h2>

                <div className="flex flex-col items-center mb-6">
                    <img
                        src={photoURL || "https://i.ibb.co/2Z3QvQ9/default-avatar.png"}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary mb-3"
                    />
                    <h3 className="text-xl font-medium">
                        {displayName || "Unnamed User"}
                    </h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="label">Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">Photo URL</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
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
    );
};

export default Profile;
