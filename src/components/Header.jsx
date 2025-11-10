import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { FaSun, FaMoon } from "react-icons/fa6";
import Swal from "sweetalert2";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [menuOpen, setMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        document.querySelector("html").setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleThemeToggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

    const handleLogout = async () => {
        try {
            await logout();
            setUserDropdownOpen(false);
            Swal.fire("Logged out!", "You have successfully logged out.", "success");
        } catch (error) {
            Swal.fire("Error", "Logout failed. Try again.", "error");
        }
    };

    const activeStyle = ({ isActive }) =>
        isActive ? "text-primary font-semibold underline" : "hover:text-primary";

    const navLinks = (
        <>
            <li>
                <NavLink to="/" className={activeStyle}>
                    Home
                </NavLink>
            </li>

            {user && (
                <>
                    <li>
                        <NavLink to="/add-transaction" className={activeStyle}>
                            Add Transaction
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-transactions" className={activeStyle}>
                            My Transactions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/reports" className={activeStyle}>
                            Reports
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={activeStyle}>
                            Profile
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <header className="bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar container mx-auto p-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary">
                    FinEase
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <ul className="flex gap-6 font-medium">{navLinks}</ul>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setUserDropdownOpen((s) => !s)}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none"
                                title="User menu"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-semibold">
                                        {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                )}
                            </button>

                            {userDropdownOpen && (
                                <div
                                    className="absolute right-0 top-full mt-2 w-56 bg-white text-black rounded-md shadow-lg p-3 z-50 border"
                                >
                                    <p className="font-semibold text-sm truncate">
                                        {user.displayName || "User"}
                                    </p>
                                    <p className="text-xs text-gray-600 break-all mb-3">
                                        {user.email}
                                    </p>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="btn btn-sm btn-outline">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-sm btn-primary">
                                Register
                            </Link>
                        </div>
                    )}

                    <button
                        onClick={handleThemeToggle}
                        className="btn btn-ghost btn-circle text-xl"
                        title="Toggle Theme"
                    >
                        {theme === "light" ? <FaMoon /> : <FaSun />}
                    </button>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setMenuOpen((s) => !s)} className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-base-200 border-t">
                    <ul className="flex flex-col gap-2 px-4 py-3">{navLinks}</ul>
                    <div className="flex flex-col items-center gap-2 pb-3">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">
                                            {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <div className="text-left">
                                        <div className="font-semibold text-sm">{user.displayName || "User"}</div>
                                        <div className="text-xs text-gray-600 break-all">{user.email}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm btn-error text-white w-32 mt-2"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-sm btn-outline w-32">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-sm btn-primary w-32">
                                    Register
                                </Link>
                            </>
                        )}

                        <button
                            onClick={handleThemeToggle}
                            className="btn btn-ghost btn-circle text-xl mt-2"
                        >
                            {theme === "light" ? <FaMoon /> : <FaSun />}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
