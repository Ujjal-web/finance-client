import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const db = getFirestore();

    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [updating, setUpdating] = useState(false);

    // Keep inputs in sync when auth user loads/changes
    useEffect(() => {
        setDisplayName(user?.displayName || "");
        setPhotoURL(user?.photoURL || "");
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Not logged in",
                text: "Please log in again and try updating your profile.",
            });
            return;
        }

        // Optional: Skip if no changes
        const newDisplayName = displayName.trim();
        const newPhotoURL = photoURL.trim();
        if (
            newDisplayName === (user.displayName || "") &&
            newPhotoURL === (user.photoURL || "")
        ) {
            Swal.fire({
                icon: "info",
                title: "No changes",
                text: "Your profile is already up to date.",
                timer: 1500,
                showConfirmButton: false,
            });
            return;
        }

        setUpdating(true);
        try {
            // 1) Update Firebase Auth user
            await updateUserProfile({
                displayName: newDisplayName,
                photoURL: newPhotoURL,
            });

            // 2) Persist to Firestore users collection
            const userRef = doc(db, "users", user.uid);
            await setDoc(
                userRef,
                {
                    displayName: newDisplayName,
                    photoURL: newPhotoURL,
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
                text: err?.message || "Something went wrong",
            });
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center items-center min-h-[80vh]">
            <div className="relative bg-base-100/90 backdrop-blur-sm border border-base-200 p-10 rounded-2xl shadow-xl w-full max-w-lg transition hover:shadow-2xl">
                {/* IMPORTANT: prevent overlay from blocking clicks */}
                <div
                    className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] rounded-2xl pointer-events-none -z-10"
                    aria-hidden="true"
                />

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-center text-base-content mb-8">
                        My Profile
                    </h2>

                    <div className="flex flex-col items-center mb-8">
                        <img
                            src={photoURL || "https://i.ibb.co/2Z3QvQ9/default-avatar.png"}
                            alt="User Avatar"
                            className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-md mb-3"
                        />
                        <h3 className="text-2xl font-semibold text-base-content">
                            {displayName || "Unnamed User"}
                        </h3>
                        <p className="text-base-content/70 text-sm">{user?.email}</p>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-5">
                        <div>
                            <label className="block font-medium mb-1 text-base-content/80">
                                Name
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full rounded-lg bg-base-200 focus:input-primary"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-base-content/80">
                                Photo URL
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full rounded-lg bg-base-200 focus:input-primary"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-lg text-lg"
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
