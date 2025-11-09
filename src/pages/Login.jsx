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
                Swal.fire("Success!", "Logged in with Google ", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error!", error.message, "error");
            });
    };

    return (
        <div className="hero bg-base-200 min-h-[75vh] lg:p-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Please provide your email and password to login.</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleLogin}>
                        <fieldset className="fieldset">
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
                            <button className="btn btn-neutral mt-4 w-full">Login</button>
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="btn btn-outline mt-2 w-full"
                            >
                                Login with Google
                            </button>
                        </fieldset>
                    </form>
                    <p className="text-center mb-3">
                        Don’t have an account?{" "}
                        <Link to="/register" className="link text-blue-500">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
