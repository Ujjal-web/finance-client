import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const { loginUser, googleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(email, password)
            .then(() => {
                Swal.fire("Success!", "Logged in successfully", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error!", error.message, "error");
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                Swal.fire("Success!", "Logged in with Google", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error!", error.message, "error");
            });
    };

    return (
        <div className="min-h-[85vh] bg-linear-to-br from-indigo-50 via-blue-50 to-slate-100 flex justify-center items-center px-6 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl w-full max-w-5xl p-10 gap-10 border border-slate-200">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                        Welcome!
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Log in to continue tracking your financial goals and insights with{" "}
                        <span className="text-indigo-600 font-semibold">FinEase</span>.
                    </p>
                </div>

                <div className="flex-1 bg-white p-8 rounded-xl shadow-md border border-slate-100">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Login to Your Account
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="label text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full focus:ring focus:ring-indigo-200"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="label text-gray-700 font-medium">Password</label>
                            <input
                                type="password"
                                className="input input-bordered w-full focus:ring focus:ring-indigo-200"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full rounded-full mt-4"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn btn-outline border-indigo-400 text-indigo-600 hover:bg-indigo-50 w-full rounded-full"
                        >
                            Continue with Google
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;