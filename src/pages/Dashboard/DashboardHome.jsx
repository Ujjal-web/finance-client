import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { RoleContext } from "../../context/RoleContext";
import { Link } from "react-router-dom";
import { FaWallet, FaArrowUp, FaArrowDown, FaListAlt } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const { isAdmin } = useContext(RoleContext);
    const [summary, setSummary] = useState({ income: 0, expense: 0, count: 0 });
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [allTransactions, setAllTransactions] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        // Fetch summary
        fetch(`https://finance-server-seven.vercel.app/summary?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.summary) {
                    setSummary(data.summary);
                }
            })
            .catch((err) => console.error("Error fetching summary:", err));

        // Fetch all transactions for charts
        fetch(`https://finance-server-seven.vercel.app/transactions?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                const txns = data.transactions || [];
                setAllTransactions(txns);
                setRecentTransactions(txns.slice(0, 5));
                
                // Process category data
                const categoryMap = {};
                txns.forEach(txn => {
                    const cat = txn.category || "Other";
                    if (!categoryMap[cat]) {
                        categoryMap[cat] = { name: cat, income: 0, expense: 0 };
                    }
                    if (txn.type === "Income") {
                        categoryMap[cat].income += parseFloat(txn.amount || 0);
                    } else {
                        categoryMap[cat].expense += parseFloat(txn.amount || 0);
                    }
                });
                setCategoryData(Object.values(categoryMap));
                
                // Process monthly data
                const monthlyMap = {};
                txns.forEach(txn => {
                    if (txn.date) {
                        const date = new Date(txn.date);
                        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                        if (!monthlyMap[monthKey]) {
                            monthlyMap[monthKey] = { month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), income: 0, expense: 0 };
                        }
                        if (txn.type === "Income") {
                            monthlyMap[monthKey].income += parseFloat(txn.amount || 0);
                        } else {
                            monthlyMap[monthKey].expense += parseFloat(txn.amount || 0);
                        }
                    }
                });
                setMonthlyData(Object.values(monthlyMap).slice(-6)); // Last 6 months
            })
            .catch((err) => console.error("Error fetching transactions:", err))
            .finally(() => setLoading(false));
    }, [user]);

    const balance = summary.income - summary.expense;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-secondary text-primary-content p-6 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user?.displayName || "User"}!
                </h1>
                <p className="text-primary-content/80">
                    {isAdmin ? "Admin Dashboard - Manage your finances and users" : "Manage your finances effectively"}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Balance */}
                <div className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-base-content/70">Total Balance</h3>
                        <FaWallet className="text-primary text-2xl" />
                    </div>
                    <p className={`text-3xl font-bold ${balance >= 0 ? "text-primary" : "text-accent"}`}>
                        ${balance.toFixed(2)}
                    </p>
                </div>

                {/* Total Income */}
                <div className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-base-content/70">Total Income</h3>
                        <FaArrowUp className="text-secondary text-2xl" />
                    </div>
                    <p className="text-3xl font-bold text-secondary">${summary.income.toFixed(2)}</p>
                </div>

                {/* Total Expense */}
                <div className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-base-content/70">Total Expense</h3>
                        <FaArrowDown className="text-accent text-2xl" />
                    </div>
                    <p className="text-3xl font-bold text-accent">${summary.expense.toFixed(2)}</p>
                </div>

                {/* Total Transactions */}
                <div className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-base-content/70">Transactions</h3>
                        <FaListAlt className="text-primary text-2xl" />
                    </div>
                    <p className="text-3xl font-bold text-primary">{summary.count}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold text-base-content mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        to="/dashboard/add-transaction"
                        className="btn btn-primary btn-block"
                    >
                        Add Transaction
                    </Link>
                    <Link
                        to="/dashboard/my-transactions"
                        className="btn btn-secondary btn-block text-white"
                    >
                        View Transactions
                    </Link>
                    <Link
                        to="/dashboard/reports"
                        className="btn btn-accent btn-block text-white"
                    >
                        View Reports
                    </Link>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Distribution Pie Chart */}
                <div className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold text-base-content mb-4">Category Distribution</h2>
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData.map(cat => ({ name: cat.name, value: cat.income + cat.expense }))}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    label
                                >
                                    {categoryData.map((_, index) => (
                                        <Cell key={index} fill={index % 2 === 0 ? "#4F46E5" : "#0D9488"} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-base-content/60 text-center py-8">No data available</p>
                    )}
                </div>

                {/* Monthly Trend Line Chart */}
                <div className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold text-base-content mb-4">Monthly Trend</h2>
                    {monthlyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="income" stroke="#0D9488" strokeWidth={2} name="Income" />
                                <Line type="monotone" dataKey="expense" stroke="#E11D48" strokeWidth={2} name="Expense" />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-base-content/60 text-center py-8">No data available</p>
                    )}
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-base-content">All Transactions</h2>
                    <Link to="/dashboard/my-transactions" className="text-primary hover:underline text-sm">
                        View All
                    </Link>
                </div>
                {allTransactions.length === 0 ? (
                    <p className="text-base-content/60 text-center py-8">No transactions yet</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-base-200">
                                    <th className="text-base-content">Date</th>
                                    <th className="text-base-content">Category</th>
                                    <th className="text-base-content">Type</th>
                                    <th className="text-base-content">Description</th>
                                    <th className="text-base-content text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTransactions.slice(0, 10).map((txn) => (
                                    <tr key={txn._id} className="hover:bg-base-200">
                                        <td className="text-base-content/80">
                                            {txn.date ? new Date(txn.date).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="text-base-content font-medium">{txn.category}</td>
                                        <td>
                                            <span className={`badge ${txn.type === "Income" ? "badge-success" : "badge-error"}`}>
                                                {txn.type}
                                            </span>
                                        </td>
                                        <td className="text-base-content/70 max-w-xs truncate">{txn.description || "-"}</td>
                                        <td className={`text-right font-bold ${txn.type === "Income" ? "text-secondary" : "text-accent"}`}>
                                            {txn.type === "Income" ? "+" : "-"}${parseFloat(txn.amount || 0).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Recent Transactions */}
            <div className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-base-content">Recent Transactions</h2>
                    <Link to="/dashboard/my-transactions" className="text-primary hover:underline text-sm">
                        View All
                    </Link>
                </div>
                {recentTransactions.length === 0 ? (
                    <p className="text-base-content/60 text-center py-8">No transactions yet</p>
                ) : (
                    <div className="space-y-3">
                        {recentTransactions.map((txn) => (
                            <div
                                key={txn._id}
                                className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === "Income"
                                                ? "bg-secondary/20 text-secondary"
                                                : "bg-accent/20 text-accent"
                                            }`}
                                    >
                                        {txn.type === "Income" ? <FaArrowUp /> : <FaArrowDown />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-base-content">{txn.category}</p>
                                        <p className="text-sm text-base-content/60">
                                            {txn.date ? new Date(txn.date).toLocaleDateString() : "N/A"}
                                        </p>
                                    </div>
                                </div>
                                <p
                                    className={`text-lg font-bold ${txn.type === "Income" ? "text-secondary" : "text-accent"
                                        }`}
                                >
                                    {txn.type === "Income" ? "+" : "-"}${parseFloat(txn.amount || 0).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;
