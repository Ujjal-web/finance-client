import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [updating, setUpdating] = useState(false);
    const db = getFirestore();

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!user) return;

        setUpdating(true);
        try {
            // 1. Update Firebase Auth Profile
            await updateUserProfile({ displayName, photoURL });

            // 2. Update Firestore User Document
            const userRef = doc(db, "users", user.uid);
            await setDoc(
                userRef,
                {
                    displayName,
                    photoURL,
                },
                { merge: true }
            );

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
        <div className="w-full">
            <div className="relative bg-base-100 border border-base-200 rounded-2xl shadow-lg p-8">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] rounded-2xl pointer-events-none -z-10"></div>

                <h2 className="text-3xl font-bold text-base-content mb-6">Profile Settings</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Image Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-base-200 rounded-xl p-6 text-center">
                            <img
                                src={photoURL || "https://i.ibb.co/2Z3QvQ9/default-avatar.png"}
                                alt="User Avatar"
                                className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg mx-auto mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-base-content mb-1">
                                {displayName || "Unnamed User"}
                            </h3>
                            <p className="text-base-content/70 text-sm mb-4">{user?.email}</p>
                            <div className="badge badge-primary badge-lg">Active User</div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div>
                                <label className="block font-semibold mb-2 text-base-content">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full rounded-lg focus:input-primary text-base-content"
                                    placeholder="Enter your name"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                                <p className="text-xs text-base-content/60 mt-1">This is how your name will appear</p>
                            </div>

                            <div>
                                <label className="block font-semibold mb-2 text-base-content">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full rounded-lg bg-base-200 text-base-content/60"
                                    value={user?.email || ""}
                                    disabled
                                />
                                <p className="text-xs text-base-content/60 mt-1">Email cannot be changed</p>
                            </div>

                            <div>
                                <label className="block font-semibold mb-2 text-base-content">
                                    Profile Photo URL
                                </label>
                                <input
                                    type="url"
                                    className="input input-bordered w-full rounded-lg focus:input-primary text-base-content"
                                    placeholder="https://example.com/photo.jpg"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                />
                                <p className="text-xs text-base-content/60 mt-1">Enter a URL for your profile picture</p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-lg flex-1"
                                    disabled={updating}
                                >
                                    {updating ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Profile"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline rounded-lg"
                                    onClick={() => {
                                        setDisplayName(user?.displayName || "");
                                        setPhotoURL(user?.photoURL || "");
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
