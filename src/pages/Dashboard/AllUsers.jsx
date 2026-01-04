import React, { useContext, useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { RoleContext } from "../../context/RoleContext";
import { Navigate } from "react-router-dom";

const AllUsers = () => {
    const { isAdmin, loading: roleLoading } = useContext(RoleContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();

    useEffect(() => {
        if (!isAdmin && !roleLoading) return;

        const fetchUsers = async () => {
            try {
                const usersSnapshot = await getDocs(collection(db, "users"));
                const usersList = usersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [isAdmin, roleLoading, db]);

    // Redirect non-admin users
    if (!roleLoading && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    if (loading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">All Users</h1>
                    <p className="text-base-content/60 mt-1">Manage registered users</p>
                </div>
                <div className="badge badge-primary badge-lg">
                    {users.length} {users.length === 1 ? "User" : "Users"}
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-base-100 border border-base-200 rounded-2xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-base-content/60">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-base-200 transition-colors">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} alt={user.displayName} />
                                                        ) : (
                                                            <div className="bg-primary text-primary-content flex items-center justify-center">
                                                                {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold">
                                                        {user.displayName || "Unnamed User"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-base-content/70">{user.email}</td>
                                        <td>
                                            <span
                                                className={`badge ${user.role === "admin"
                                                    ? "badge-error"
                                                    : "badge-primary"
                                                    }`}
                                            >
                                                {user.role || "user"}
                                            </span>
                                        </td>
                                        <td className="text-base-content/70">
                                            {user.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Info Card */}
            <div className="alert alert-info shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <h3 className="font-bold">Admin Access</h3>
                    <div className="text-xs">
                        To change a user's role, update the "role" field in Firestore manually.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
