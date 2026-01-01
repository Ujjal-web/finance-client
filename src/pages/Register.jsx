import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (!/(?=.*[A-Z])/.test(password)) {
            return Swal.fire("Error", "Password must contain at least one uppercase letter", "error");
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return Swal.fire("Error", "Password must contain at least one lowercase letter", "error");
        }
        if (password.length < 6) {
            return Swal.fire("Error", "Password must be at least 6 characters long", "error");
        }

        createUser(email, password)
            .then(() => updateUserProfile({ displayName: name, photoURL }))
            .then(() => {
                Swal.fire("Success", "Account created successfully!", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    const handleGoogleRegister = () => {
        googleLogin()
            .then(() => {
                Swal.fire("Success", "Registered with Google!", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    return (
        <div className="min-h-[85vh] bg-base-200 flex justify-center items-center p-6">
            <div className="bg-base-100/90 backdrop-blur-md shadow-2xl rounded-2xl border border-base-300 w-full max-w-md p-8">
                <h2 className="text-4xl font-bold text-center text-base-content mb-6">Create Account</h2>
                <p className="text-center text-base-content/70 mb-8">
                    Manage your finances effortlessly with <span className="font-semibold text-indigo-600 dark:text-indigo-400">FinEase</span>.
                </p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-base-content/80 mb-1">Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content/80 mb-1">Photo URL</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Profile image URL (optional)"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content/80 mb-1">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content/80 mb-1">Password</label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Create a secure password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-4 rounded-full border-none">
                        Register
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        className="btn btn-outline border-base-300 hover:border-indigo-500 text-base-content w-full mt-2 rounded-full flex items-center justify-center gap-2"
                    >
                        <FcGoogle size={20} /> Register with Google
                    </button>
                </form>

                <p className="text-center text-base-content/70 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;