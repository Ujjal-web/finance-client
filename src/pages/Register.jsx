import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Register = () => {
    const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const db = getFirestore();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (field, value) => {
        if (field === "name") {
            setName(value);
            if (errors.name) setErrors({ ...errors, name: "" });
        } else if (field === "email") {
            setEmail(value);
            if (errors.email) setErrors({ ...errors, email: "" });
        } else if (field === "password") {
            setPassword(value);
            if (errors.password) setErrors({ ...errors, password: "" });
        } else {
            setPhotoURL(value);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else {
            if (password.length < 6) {
                newErrors.password = "Password must be at least 6 characters long";
            } else if (!/(?=.*[A-Z])/.test(password)) {
                newErrors.password = "Password must contain at least one uppercase letter";
            } else if (!/(?=.*[a-z])/.test(password)) {
                newErrors.password = "Password must contain at least one lowercase letter";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        createUser(email, password)
            .then((userCredential) =>
                updateUserProfile({ displayName: name, photoURL }).then(() => userCredential.user)
            )
            .then(async (createdUser) => {
                await setDoc(doc(db, "users", createdUser.uid), {
                    email: createdUser.email,
                    displayName: name,
                    photoURL: photoURL || "",
                    role: "user",
                    createdAt: new Date().toISOString(),
                });
                Swal.fire("Success", "Account created successfully!", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            })
            .finally(() => setLoading(false));
    };

    const handleGoogleRegister = () => {
        googleLogin()
            .then(async (result) => {
                const user = result.user;
                await setDoc(
                    doc(db, "users", user.uid),
                    {
                        email: user.email,
                        displayName: user.displayName || "",
                        photoURL: user.photoURL || "",
                        role: "user",
                        createdAt: new Date().toISOString(),
                    },
                    { merge: true }
                );

                Swal.fire("Success", "Registered with Google!", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center items-center min-h-[80vh]">
            <div className="bg-base-100/90 backdrop-blur-md shadow-2xl rounded-2xl border border-base-200 w-full max-w-md p-8">
                <h2 className="text-4xl font-bold text-center text-base-content mb-6">Create Account</h2>
                <p className="text-center text-base-content/70 mb-8">
                    Manage your finances effortlessly with <span className="font-semibold text-primary">FinEase</span>.
                </p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-base-content/80 mb-1">Name</label>
                        <input
                            type="text"
                            className={`input input-bordered w-full rounded-lg focus:input-primary ${errors.name ? "input-error" : ""}`}
                            placeholder="Your full name"
                            value={name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                        {errors.name && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.name}</span>
                            </label>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content/80 mb-1">Photo URL</label>
                        <input
                            type="text"
                            className="input input-bordered w-full rounded-lg focus:input-primary"
                            placeholder="Profile image URL (optional)"
                            value={photoURL}
                            onChange={(e) => handleChange("photoURL", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content/80 mb-1">Email</label>
                        <input
                            type="email"
                            className={`input input-bordered w-full rounded-lg focus:input-primary ${errors.email ? "input-error" : ""}`}
                            placeholder="you@example.com"
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
                        <label className="block text-sm font-medium text-base-content/80 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`input input-bordered w-full rounded-lg focus:input-primary pr-10 ${errors.password ? "input-error" : ""
                                    }`}
                                placeholder="Create a secure password"
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
                        {!errors.password && password && (
                            <label className="label">
                                <span className="label-text-alt text-base-content/60">
                                    Must be 6+ characters with uppercase and lowercase letters
                                </span>
                            </label>
                        )}
                    </div>

                    <button className="btn btn-primary w-full mt-4 rounded-lg" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : "Register"}
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        className="btn btn-outline border-base-300 hover:border-primary hover:bg-primary/10 text-base-content w-full mt-2 rounded-lg flex items-center justify-center gap-2"
                    >
                        <FcGoogle size={20} /> Register with Google
                    </button>
                </form>

                <p className="text-center text-base-content/70 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
