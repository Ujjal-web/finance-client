import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [summary, setSummary] = useState({ income: 0, expense: 0, count: 0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        fetch(`http://localhost:5000/summary?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.summary) {
                    setSummary(data.summary);
                }
            })
            .finally(() => setLoading(false));
    }, [user]);

    const balance = summary.income - summary.expense;

    return (
        <div className="container mx-auto p-6">

            <section className="bg-linear-to-r from-indigo-600 to-blue-500 text-white rounded-xl p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold">
                            {user?.displayName
                                ? `Welcome, ${user.displayName}!`
                                : "Welcome to FinEase!"}
                        </h1>
                        <p className="mt-2 text-lg max-w-xl">
                            Manage your money smartly — record transactions, track progress,
                            and visualize your financial journey in one place.
                        </p>
                        <div className="mt-4 flex gap-3 flex-wrap">
                            {user ? (
                                <>
                                    <Link to="/add-transaction" className="btn btn-secondary">
                                        Add Transaction
                                    </Link>
                                    <Link to="/reports" className="btn btn-outline text-white border-white">
                                        View Reports
                                    </Link>
                                </>
                            ) : (
                                <Link to="/login" className="btn btn-primary">
                                    Login to Get Started
                                </Link>
                            )}
                        </div>
                    </div>

                    <img
                        src="https://images.pexels.com/photos/8353809/pexels-photo-8353809.jpeg?_gl=1*1v30jsj*_ga*MjA1NzkxOTI5My4xNzYyODA5Mjg1*_ga_8JE65Q40S6*czE3NjI4MDkyODUkbzEkZzEkdDE3NjI4MDkzODgkajM2JGwwJGgw"
                        alt="Finance dashboard"
                        className="max-w-xs md:max-w-sm rounded-lg shadow-lg hidden md:block"
                    />
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center mb-6">Overview</h2>

                {user ? (
                    loading ? (
                        <div className="flex justify-center items-center h-32">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                            <div className="bg-green-100 p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-green-700 mb-2">
                                    Total Income
                                </h3>
                                <p className="text-3xl font-bold text-green-700">
                                    ${summary.income.toFixed(2)}
                                </p>
                            </div>
                            <div className="bg-red-100 p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-red-700 mb-2">
                                    Total Expense
                                </h3>
                                <p className="text-3xl font-bold text-red-700">
                                    ${summary.expense.toFixed(2)}
                                </p>
                            </div>
                            <div className="bg-blue-100 p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                                    Balance
                                </h3>
                                <p
                                    className={`text-3xl font-bold ${balance >= 0 ? "text-blue-700" : "text-orange-600"
                                        }`}
                                >
                                    ${balance.toFixed(2)}
                                </p>
                            </div>
                            <div className="bg-purple-100 p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-purple-700 mb-2">
                                    Total Transactions
                                </h3>
                                <p className="text-3xl font-bold text-purple-700">{summary.count}</p>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="text-center mt-6">
                        <p className="text-lg text-gray-600 mb-3">
                            Login to see your financial summary.
                        </p>
                        <Link to="/login" className="btn btn-primary">
                            Go to Login
                        </Link>
                    </div>
                )}
            </section>

            <section className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-base-200 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Add Transaction</h3>
                    <p className="mb-4">
                        Quickly log income or expense transactions to keep your records up to date.
                    </p>
                    <Link to="/add-transaction" className="btn btn-primary">
                        Add Transaction
                    </Link>
                </div>

                <div className="bg-base-200 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">My Transactions</h3>
                    <p className="mb-4">View and manage all of your transaction history.</p>
                    <Link to="/my-transactions" className="btn btn-primary">
                        View Transactions
                    </Link>
                </div>

                <div className="bg-base-200 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Reports & Insights</h3>
                    <p className="mb-4">
                        Get visual analytics of income vs expense and overall balance.
                    </p>
                    <Link to="/reports" className="btn btn-primary">
                        View Reports
                    </Link>
                </div>
            </section>

            <section className="my-12 bg-base-100 p-6 rounded-xl shadow">
                <h2 className="text-3xl font-semibold mb-4 text-center">
                    Budgeting Tips
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-bold mb-2">Track Every Expense</h4>
                        <p>
                            Record every expense you make — it builds awareness and helps you
                            identify spending patterns.
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-bold mb-2">Set a Realistic Budget</h4>
                        <p>
                            Base your budget on real income and prioritize essential expenses
                            before entertainment or luxury.
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-bold mb-2">Review Regularly</h4>
                        <p>
                            Review your budget every month and adjust based on lifestyle
                            changes and savings goals.
                        </p>
                    </div>
                </div>
            </section>

            <section className="my-12 bg-base-200 p-6 rounded-xl shadow">
                <h2 className="text-3xl font-semibold mb-4 text-center">
                    Why Financial Planning Matters
                </h2>
                <div className="max-w-4xl mx-auto text-center text-lg leading-relaxed">
                    <p>
                        Effective financial planning gives you control over your money. It
                        helps you prepare for emergencies, reach life goals such as
                        education or retirement, and reduce financial stress. With FinEase,
                        you can plan, track, and visualize your finances — all in one place.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;