import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    CartesianGrid,
} from "recharts";

const Reports = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        if (!user?.email) return;
        setLoading(true);
        fetch(`http://localhost:5000/transactions?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data.transactions || []);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load transactions");
                setLoading(false);
            });
    }, [user]);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    const filteredTransactions = transactions.filter((t) => {
        const txnDate = new Date(t.date);
        const monthMatch =
            selectedMonth === "all" || txnDate.getMonth() === parseInt(selectedMonth);
        const categoryMatch =
            selectedCategory === "all" || t.category === selectedCategory;
        return monthMatch && categoryMatch;
    });

    const incomeTotal = filteredTransactions
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    const expenseTotal = filteredTransactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    const balance = incomeTotal - expenseTotal;

    const chartData = [
        { name: "Income", value: incomeTotal },
        { name: "Expense", value: expenseTotal },
    ];

    const monthlyData = months.map((m, i) => {
        const monthIncome = transactions
            .filter(
                (t) => new Date(t.date).getMonth() === i && t.type === "Income"
            )
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

        const monthExpense = transactions
            .filter(
                (t) => new Date(t.date).getMonth() === i && t.type === "Expense"
            )
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

        return { month: m, Income: monthIncome, Expense: monthExpense };
    });

    const COLORS = ["#22c55e", "#ef4444"];

    if (loading)
        return (
            <div className="flex justify-center items-center h-80">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-80 text-red-500 text-lg font-medium">
                {error}
            </div>
        );

    if (transactions.length === 0)
        return (
            <div className="text-center mt-20 text-lg font-medium">
                No transactions available
            </div>
        );

    return (
        <div className="p-6 md:p-10">
            <h2 className="text-3xl font-semibold text-center mb-6">Financial Reports</h2>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <select
                    className="select select-bordered"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="all">All Months</option>
                    {months.map((m, i) => (
                        <option key={i} value={i}>
                            {m}
                        </option>
                    ))}
                </select>

                <select
                    className="select select-bordered"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="Salary">Salary</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">
                <div className="p-6 rounded-xl bg-green-100 text-green-700 font-semibold">
                    Total Income: ${incomeTotal.toFixed(2)}
                </div>
                <div className="p-6 rounded-xl bg-red-100 text-red-700 font-semibold">
                    Total Expense: ${expenseTotal.toFixed(2)}
                </div>
                <div
                    className={`p-6 rounded-xl ${balance >= 0 ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                        } font-semibold`}
                >
                    Balance: ${balance.toFixed(2)}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-base-200 p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Income vs Expense (Bar Chart)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#3b82f6" radius={6} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-base-200 p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Income vs Expense (Pie Chart)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-base-200 p-6 rounded-xl shadow mt-10">
                <h3 className="text-xl font-semibold mb-4 text-center">
                    Monthly Income vs Expense Trend
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Income" stroke="#22c55e" strokeWidth={2} />
                        <Line type="monotone" dataKey="Expense" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Reports;
