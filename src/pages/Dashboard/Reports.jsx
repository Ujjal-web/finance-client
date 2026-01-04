import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
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
import { ReportCardSkeleton, ChartSkeleton } from "../../components/SkeletonLoader";

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
        fetch(`https://finance-server-seven.vercel.app/transactions?email=${user.email}`)
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

    const chartData = [
        { name: "Income", value: incomeTotal },
        { name: "Expense", value: expenseTotal },
    ];

    // Use theme colors for charts
    const COLORS = ["#0D9488", "#E11D48"]; // secondary, accent

    if (loading)
        return (
            <div className="p-6 md:p-10 bg-base-200 min-h-screen">
                <div className="h-10 w-64 bg-base-300 rounded mx-auto mb-8 animate-pulse"></div>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <div className="h-12 w-32 bg-base-300 rounded animate-pulse"></div>
                    <div className="h-12 w-32 bg-base-300 rounded animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <ReportCardSkeleton />
                    <ReportCardSkeleton />
                    <ReportCardSkeleton />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ChartSkeleton />
                    <ChartSkeleton />
                </div>
                <div className="mt-10">
                    <ChartSkeleton />
                </div>
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
        <div className="p-6 md:p-10 bg-base-200 min-h-screen">
            <h2 className="text-4xl font-extrabold text-center text-base-content mb-8">
                Financial Reports
            </h2>

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
                <div className="p-6 rounded-2xl bg-secondary/20 dark:bg-secondary/30 border border-secondary/40 dark:border-secondary/50 text-secondary dark:text-secondary font-semibold shadow-md">
                    Total Income: ${incomeTotal.toFixed(2)}
                </div>
                <div className="p-6 rounded-2xl bg-accent/20 dark:bg-accent/30 border border-accent/40 dark:border-accent/50 text-accent dark:text-accent font-semibold shadow-md">
                    Total Expense: ${expenseTotal.toFixed(2)}
                </div>
                <div
                    className={`p-6 rounded-2xl shadow-md font-semibold ${balance >= 0
                        ? "bg-primary/20 dark:bg-primary/30 border border-primary/40 dark:border-primary/50 text-primary dark:text-primary"
                        : "bg-accent/20 dark:bg-accent/30 border border-accent/40 dark:border-accent/50 text-accent dark:text-accent"
                        }`}
                >
                    Balance: ${balance.toFixed(2)}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-base-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold mb-4 text-center text-base-content">
                        Income vs Expense (Bar Chart)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#4F46E5" radius={6} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-base-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold mb-4 text-center text-base-content">
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

            <div className="bg-base-100 p-6 rounded-2xl shadow-md hover:shadow-xl mt-10 transition">
                <h3 className="text-xl font-semibold mb-4 text-center text-base-content">
                    Monthly Income vs Expense Trend
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="Income"
                            stroke="#0D9488"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="Expense"
                            stroke="#E11D48"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Reports;