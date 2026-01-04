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

    const getLinkClass = ({ isActive }) =>
        `px-4 py-2 rounded-full transition-all duration-300 font-medium relative group block ${isActive
            ? "bg-white/20 dark:bg-primary dark:text-primary-content shadow-sm backdrop-blur-sm"
            : "text-primary-content/90 dark:text-neutral-content hover:bg-white/10 dark:hover:bg-neutral-content/10 hover:text-white dark:hover:text-primary"
        }`;

    const navLinks = (
        <>
            <li>
                <NavLink to="/" className={getLinkClass}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" className={getLinkClass}>
                    About
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact" className={getLinkClass}>
                    Contact
                </NavLink>
            </li>

            {user && (
                <>
                    <li>
                        <NavLink to="/dashboard" className={getLinkClass}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/add-transaction" className={getLinkClass}>
                            Add Transaction
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-transactions" className={getLinkClass}>
                            My Transactions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reports" className={getLinkClass}>
                            Reports
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile" className={getLinkClass}>
                            Profile
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <header className="sticky top-0 z-50 bg-linear-to-r from-primary via-secondary to-primary dark:bg-neutral text-primary-content dark:text-neutral-content shadow-lg dark:border-b dark:border-neutral-content/10 transition-colors duration-300">
            <div className="navbar container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-3xl font-extrabold tracking-wide flex items-center gap-2">
                    <span className="bg-base-100 text-primary dark:bg-primary dark:text-primary-content rounded-md px-2 py-1 text-xl font-bold shadow">
                        FE
                    </span>
                    FinEase
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-1 font-medium">{navLinks}</ul>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setUserDropdownOpen((s) => !s)}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/40 dark:border-neutral-content/20 hover:border-white dark:hover:border-neutral-content transition"
                                title="User menu"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-primary flex items-center justify-center text-primary-content font-semibold">
                                        {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                )}
                            </button>

                            {userDropdownOpen && (
                                <div className="absolute right-0 top-full mt-3 w-60 bg-base-100 text-base-content rounded-xl shadow-2xl border border-base-200 dark:border-base-content/10 p-4 z-50 animate-fadeIn">
                                    <p className="font-semibold text-sm truncate">{user.displayName || "User"}</p>
                                    <p className="text-xs text-base-content/70 break-all mb-4">{user.email}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-accent to-accent/80 text-primary-content hover:opacity-90 transition"
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
                                className="btn btn-sm btn-outline border-primary-content text-primary-content hover:bg-primary-content hover:text-primary transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-sm bg-base-100 text-primary font-semibold hover:bg-base-200 transition"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost btn-circle text-xl text-primary-content hover:text-warning transition"
                        title="Toggle Theme"
                    >
                        {theme === "light" ? <FaMoon /> : <FaSun />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen((s) => !s)} className="btn btn-ghost text-primary-content">
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
                <div className="md:hidden bg-gradient-to-b from-primary/90 to-secondary/90 dark:from-neutral dark:to-neutral text-primary-content dark:text-neutral-content border-t border-primary-content/20 dark:border-neutral-content/10">
                    <ul className="flex flex-col gap-3 px-4 py-4 text-center font-medium">{navLinks}</ul>
                    <div className="flex flex-col items-center gap-3 pb-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-content">
                                            {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <div className="text-left">
                                        <div className="font-semibold text-sm">{user.displayName || "User"}</div>
                                        <div className="text-xs text-primary-content/70 break-all">{user.email}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm bg-gradient-to-r from-accent to-accent/80 text-primary-content w-32 mt-2 hover:opacity-90"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-sm btn-outline w-32 text-primary-content border-primary-content hover:bg-primary-content hover:text-primary">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-sm bg-base-100 text-primary w-32 font-semibold border-none hover:bg-base-200">
                                    Register
                                </Link>
                            </>
                        )}

                        <button
                            onClick={toggleTheme}
                            className="btn btn-ghost btn-circle text-xl mt-2 text-primary-content hover:text-warning"
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