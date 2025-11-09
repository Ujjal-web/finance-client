import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

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
            .then(() => {
                return updateUserProfile({ displayName: name, photoURL });
            })
            .then(() => {
                Swal.fire("Success", "Account created successfully", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    const handleGoogleRegister = () => {
        googleLogin()
            .then(() => {
                Swal.fire("Success", "Registered with Google", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    return (
        <div className="hero bg-base-200 min-h-[80vh] lg:p-20">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Create an account to manage your personal finances easily.</p>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleRegister}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                className="input input-bordered"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label className="label">Photo URL</label>
                            <input
                                type="text"
                                className="input input-bordered"
                                placeholder="Photo URL"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                            />
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input input-bordered"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label className="label">Password</label>
                            <input
                                type="password"
                                className="input input-bordered"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button className="btn btn-neutral mt-4 w-full">Register</button>
                            <button
                                type="button"
                                onClick={handleGoogleRegister}
                                className="btn btn-outline mt-2 w-full"
                            >
                                Register with Google
                            </button>
                        </fieldset>
                    </form>

                    <p className="text-center mb-3">
                        Already have an account?{" "}
                        <Link to="/login" className="link text-blue-500">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
