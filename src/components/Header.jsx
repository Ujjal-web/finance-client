import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire("Logged out", "You have been logged out successfully!", "success");
                navigate("/");
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    const linkStyle = ({ isActive }) =>
        isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200";

    return (
        <header className="bg-blue-700 text-white flex justify-between items-center px-8 py-4">

            <Link to="/" className="font-bold text-2xl">
                FinEase
            </Link>


            <nav className="flex items-center gap-5">
                <NavLink to="/" className={linkStyle}>
                    Home
                </NavLink>
                {user && (
                    <>
                        <NavLink to="/add-transaction" className={linkStyle}>
                            Add Transaction
                        </NavLink>
                        <NavLink to="/my-transactions" className={linkStyle}>
                            My Transactions
                        </NavLink>
                        <NavLink to="/reports" className={linkStyle}>
                            Reports
                        </NavLink>
                    </>
                )}

                {!user ? (
                    <>
                        <NavLink to="/login" className={linkStyle}>
                            Login
                        </NavLink>
                        <NavLink to="/register" className={linkStyle}>
                            Signup
                        </NavLink>
                    </>
                ) : (
                    <div className="relative group">

                        <img
                            src={user.photoURL || "https://i.ibb.co/4VJkFhx/default-user.png"}
                            alt="User"
                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                        />

                        <div className="absolute right-0 hidden group-hover:block bg-white text-black rounded-md shadow-lg w-48 p-3 z-10">
                            <p className="font-semibold text-sm">{user.displayName || "User"}</p>
                            <p className="text-xs text-gray-600 mb-2">{user.email}</p>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
