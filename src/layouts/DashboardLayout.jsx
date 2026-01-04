import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { RoleContext } from "../context/RoleContext";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import {
    FaHome,
    FaPlus,
    FaList,
    FaChartLine,
    FaUser,
    FaUsers,
    FaSignOutAlt
} from "react-icons/fa";
import Swal from "sweetalert2";

const DashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const { isAdmin, loading: roleLoading } = useContext(RoleContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            Swal.fire("Logged out!", "You have successfully logged out.", "success");
            navigate("/");
        } catch (error) {
            Swal.fire("Error", "Logout failed. Try again.", "error");
        }
    };

    const menuItems = [
        { path: "/dashboard", label: "Dashboard Home", icon: <FaHome />, roles: ["user", "admin"] },
        { path: "/dashboard/my-transactions", label: "My Transactions", icon: <FaList />, roles: ["user", "admin"] },
        { path: "/dashboard/add-transaction", label: "Add Transaction", icon: <FaPlus />, roles: ["user", "admin"] },
        { path: "/dashboard/reports", label: "Reports", icon: <FaChartLine />, roles: ["user", "admin"] },
        { path: "/dashboard/users", label: "All Users", icon: <FaUsers />, roles: ["admin"] },
    ];

    const filteredMenuItems = menuItems.filter(item =>
        item.roles.includes(isAdmin ? "admin" : "user")
    );

    if (roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-base-200">
            {/* Sidebar - Desktop */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-base-100 border-r border-base-300 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-4 border-b border-base-300">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                            <span className="bg-primary text-primary-content rounded-md px-2 py-1 text-lg font-bold shadow">
                                FE
                            </span>
                            <span className="text-base-content">FinEase</span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden btn btn-ghost btn-sm btn-circle"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {filteredMenuItems.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        end={item.path === "/dashboard"}
                                        onClick={() => setSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? "bg-primary text-primary-content font-semibold"
                                                : "text-base-content hover:bg-base-200"
                                            }`
                                        }
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* User Info */}
                    <div className="p-4 border-t border-base-300">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="avatar">
                                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="User" />
                                    ) : (
                                        <div className="bg-primary text-primary-content flex items-center justify-center">
                                            {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate text-base-content">
                                    {user?.displayName || "User"}
                                </p>
                                <p className="text-xs text-base-content/60 truncate">
                                    {isAdmin ? "Admin" : "User"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navbar */}
                <header className="bg-base-100 border-b border-base-300 px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden btn btn-ghost btn-sm btn-circle"
                        >
                            <FaBars size={20} />
                        </button>

                        {/* Page Title */}
                        <h1 className="text-xl font-bold text-base-content hidden lg:block">
                            Dashboard
                        </h1>

                        {/* Right Section */}
                        <div className="flex items-center gap-2">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="btn btn-ghost btn-sm btn-circle"
                                title="Toggle Theme"
                            >
                                {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
                            </button>

                            {/* Profile Dropdown */}
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-sm btn-circle avatar"
                                >
                                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                        {user?.photoURL ? (
                                            <img src={user.photoURL} alt="User" />
                                        ) : (
                                            <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full">
                                                {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                        )}
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 z-1 p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-300"
                                >
                                    <li>
                                        <Link
                                            to="/dashboard/profile"
                                            className="flex items-center gap-2"
                                        >
                                            <FaUser /> Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard"
                                            className="flex items-center gap-2"
                                        >
                                            <FaHome /> Dashboard Home
                                        </Link>
                                    </li>
                                    <li className="border-t border-base-300 mt-1 pt-1">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 text-error"
                                        >
                                            <FaSignOutAlt /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
