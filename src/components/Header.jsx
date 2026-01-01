import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa6";
import Swal from "sweetalert2";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



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
        isActive ? "text-accent font-semibold underline" : "hover:text-accent transition";

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
        <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-900 dark:bg-none dark:bg-base-100 text-white dark:text-base-content shadow-lg dark:border-b dark:border-base-300 transition-colors duration-300">
            <div className="navbar container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-3xl font-extrabold tracking-wide flex items-center gap-2">
                    <span className="bg-white text-indigo-700 dark:bg-indigo-600 dark:text-white rounded-md px-2 py-1 text-xl font-bold shadow">
                        FE
                    </span>
                    FinEase
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-6 font-medium">{navLinks}</ul>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setUserDropdownOpen((s) => !s)}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/40 dark:border-base-content/20 hover:border-white dark:hover:border-base-content transition"
                                title="User menu"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-indigo-400 flex items-center justify-center text-white font-semibold">
                                        {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                )}
                            </button>

                            {userDropdownOpen && (
                                <div className="absolute right-0 top-full mt-3 w-60 bg-white dark:bg-base-100 text-gray-800 dark:text-base-content rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50 animate-fadeIn">
                                    <p className="font-semibold text-sm truncate">{user.displayName || "User"}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 break-all mb-4">{user.email}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition"
                                    >
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-indigo-700 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-sm bg-white text-indigo-700 font-semibold hover:bg-indigo-100 transition"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost btn-circle text-xl text-white dark:text-base-content hover:text-yellow-300 transition"
                        title="Toggle Theme"
                    >
                        {theme === "light" ? <FaMoon /> : <FaSun />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen((s) => !s)} className="btn btn-ghost text-white dark:text-base-content">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-gradient-to-b from-indigo-800 to-blue-900 dark:from-base-200 dark:to-base-300 text-white dark:text-base-content border-t border-white/20 dark:border-base-content/10">
                    <ul className="flex flex-col gap-3 px-4 py-4 text-center font-medium">{navLinks}</ul>
                    <div className="flex flex-col items-center gap-3 pb-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <div className="w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center text-white">
                                            {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <div className="text-left">
                                        <div className="font-semibold text-sm">{user.displayName || "User"}</div>
                                        <div className="text-xs text-gray-300 break-all">{user.email}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm bg-gradient-to-r from-red-500 to-pink-500 text-white w-32 mt-2 hover:from-red-600 hover:to-pink-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-sm btn-outline w-32 text-white dark:text-base-content border-white dark:border-base-content hover:bg-white dark:hover:bg-base-content hover:text-indigo-700 dark:hover:text-base-100">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-sm bg-white dark:bg-indigo-600 text-indigo-700 dark:text-white w-32 font-semibold border-none">
                                    Register
                                </Link>
                            </>
                        )}

                        <button
                            onClick={toggleTheme}
                            className="btn btn-ghost btn-circle text-xl mt-2 text-white hover:text-yellow-300"
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