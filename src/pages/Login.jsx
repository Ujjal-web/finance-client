import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
    const { loginUser, googleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (field, value) => {
        if (field === "email") {
            setEmail(value);
            if (errors.email) {
                setErrors({ ...errors, email: "" });
            }
        } else {
            setPassword(value);
            if (errors.password) {
                setErrors({ ...errors, password: "" });
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        loginUser(email, password)
            .then(() => {
                Swal.fire("Success!", "Logged in successfully", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error!", error.message, "error");
            })
            .finally(() => setLoading(false));
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
        <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center items-center min-h-[80vh]">
            <div className="flex flex-col md:flex-row items-center justify-between bg-base-100/90 backdrop-blur-sm shadow-xl rounded-2xl w-full max-w-5xl p-10 gap-10 border border-base-200">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-5xl font-extrabold text-base-content mb-4">
                        Welcome!
                    </h1>
                    <p className="text-base-content/70 text-lg leading-relaxed">
                        Log in to continue tracking your financial goals and insights with{" "}
                        <span className="text-primary font-semibold">FinEase</span>.
                    </p>
                </div>

                <div className="flex-1 bg-base-100 p-8 rounded-xl shadow-md border border-base-200">
                    <h2 className="text-2xl font-bold text-center text-base-content mb-6">
                        Login to Your Account
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="label text-base-content/80 font-medium">Email</label>
                            <input
                                type="email"
                                className={`input input-bordered w-full rounded-lg focus:input-primary ${errors.email ? "input-error" : ""}`}
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                            {errors.email && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.email}</span>
                                </label>
                            )}
                        </div>

                        <div>
                            <label className="label text-base-content/80 font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full rounded-lg focus:input-primary pr-10 ${errors.password ? "input-error" : ""
                                        }`}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.password}</span>
                                </label>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-lg mt-4"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Login"}
                        </button>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn btn-outline border-base-300 hover:border-primary hover:bg-primary/10 text-base-content w-full rounded-lg"
                        >
                            Continue with Google
                        </button>
                    </form>

                    <p className="text-center text-sm text-base-content/70 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary font-medium hover:underline"
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