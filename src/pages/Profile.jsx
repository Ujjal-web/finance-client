import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [form, setForm] = useState({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserProfile(form);
            Swal.fire("Success", "Profile updated successfully!", "success");
        } catch (err) {
            Swal.fire("Error", err.message || "Profile update failed.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">My Profile</h2>

            <div className="flex flex-col items-center mb-6">
                <img
                    src={form.photoURL || "https://i.ibb.co/4VJkFhx/default-user.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-primary object-cover"
                />
                <h3 className="text-xl font-bold mt-3">{user?.displayName || "User"}</h3>
                <p className="text-gray-600">{user?.email}</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="label">Name</label>
                    <input
                        type="text"
                        name="displayName"
                        value={form.displayName}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <label className="label">Photo URL</label>
                    <input
                        type="text"
                        name="photoURL"
                        value={form.photoURL}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-4"
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default Profile;
