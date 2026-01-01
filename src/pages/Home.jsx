import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import BannerSection from "../components/Home/BannerSection";
import OverviewSection from "../components/Home/OverviewSection";
import StaticSections from "../components/Home/StaticSection";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [summary, setSummary] = useState({ income: 0, expense: 0, count: 0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        fetch(`https://finance-server-seven.vercel.app/summary?email=${user.email}`)
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
        <div className="mx-auto p-6 md:px-24 bg-base-100 text-base-content">
            <BannerSection user={user} />
            <OverviewSection summary={summary} loading={loading} user={user} />
            <div className="pt-16 md:pt-24 bg-base-100/80 backdrop-blur-sm">
                <StaticSections />
            </div>

            <section className="relative py-20 bg-base-200 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]"></div>

                <div className="relative container mx-auto px-6">
                    <h2 className="text-2xl font-extrabold md:text-5xl leading-tight drop-shadow-sm text-center text-base-content mb-12">
                        Manage Your Finances
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Add Transaction */}
                        <div className="group bg-base-100/80 backdrop-blur-sm border border-base-300 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-full mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-base-content mb-3">
                                    Add Transaction
                                </h3>
                                <p className="text-base-content/70 mb-6">
                                    Quickly log income or expense transactions to keep your records up
                                    to date.
                                </p>
                                <Link
                                    to="/add-transaction"
                                    className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 border-none"
                                >
                                    Add Transaction
                                </Link>
                            </div>
                        </div>

                        {/* My Transactions */}
                        <div className="group bg-base-100/80 backdrop-blur-sm border border-base-300 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8 text-blue-600 dark:text-blue-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-base-content mb-3">
                                    My Transactions
                                </h3>
                                <p className="text-base-content/70 mb-6">
                                    View and manage all of your transaction history.
                                </p>
                                <Link
                                    to="/my-transactions"
                                    className="btn bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 border-none"
                                >
                                    View Transactions
                                </Link>
                            </div>
                        </div>

                        {/* Reports & Insights */}
                        <div className="group bg-base-100/80 backdrop-blur-sm border border-base-300 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8 text-purple-600 dark:text-purple-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 19V6a1 1 0 00-2 0v13a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-2 0v13H11z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-base-content mb-3">
                                    Reports & Insights
                                </h3>
                                <p className="text-base-content/70 mb-6">
                                    Get visual analytics of income vs expense and your overall balance.
                                </p>
                                <Link
                                    to="/reports"
                                    className="btn bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 border-none"
                                >
                                    View Reports
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
};

export default Home;