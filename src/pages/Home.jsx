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
        fetch(`http://localhost:5000/transactions?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                const txns = data.transactions || [];
                const income = txns.filter(t => t.type === "Income").reduce((s, t) => s + Number(t.amount || 0), 0);
                const expense = txns.filter(t => t.type === "Expense").reduce((s, t) => s + Number(t.amount || 0), 0);
                setSummary({ income, expense, count: txns.length });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user]);

    return (
        <div className="container mx-auto p-6">
            <section className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold">FinEase</h1>
                        <p className="mt-2 text-lg max-w-xl">
                            Simple personal finance manager — track income, record expenses, and visualize your finances.
                        </p>
                        <div className="mt-4 flex gap-3">
                            <Link to="/add-transaction" className="btn btn-secondary">Add Transaction</Link>
                            <Link to="/reports" className="btn btn-outline">View Reports</Link>
                        </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-sm opacity-90">Quick summary</p>
                        {loading ? (
                            <div className="mt-4"><span className="loading loading-spinner loading-sm"></span></div>
                        ) : (
                            <div className="mt-3 grid grid-cols-1 gap-2 text-right">
                                <div className="text-lg font-semibold">Income: ${summary.income.toFixed(2)}</div>
                                <div className="text-lg font-semibold text-red-200">Expense: ${summary.expense.toFixed(2)}</div>
                                <div className="text-sm opacity-90">Transactions: {summary.count}</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>


            <section className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-base-200 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Add new transaction</h3>
                    <p className="mb-4">
                        Quickly add income or expenses to keep your records up to date.
                    </p>
                    <Link to="/add-transaction" className="btn btn-primary">
                        Add Transaction
                    </Link>
                </div>

                <div className="bg-base-200 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">My transactions</h3>
                    <p className="mb-4">View and manage all of your transactions.</p>
                    <Link to="/my-transactions" className="btn btn-primary">
                        View Transactions
                    </Link>
                </div>

                <div className="bg-base-200 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                    <p className="mb-4">Visualize income and expense trends.</p>
                    <Link to="/reports" className="btn btn-primary">
                        Open Reports
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
                            Write down or record every single expense you make, no matter how
                            small. This builds awareness and shows where your money really goes.
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-bold mb-2">Set a Realistic Budget</h4>
                        <p>
                            Base your monthly budget on actual income and prioritize essential
                            costs first before discretionary spending.
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-bold mb-2">Review and Adjust</h4>
                        <p>
                            Revisit your budget each month. Adjust for new expenses and track
                            progress toward savings goals.
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
                        Effective financial planning gives you control over your money. It helps
                        you prepare for emergencies, reach life goals such as education or
                        retirement, and reduce financial stress. With FinEase, you can plan,
                        track, and visualize your finances all in one place.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
