import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowUpCircle,
    ArrowDownCircle,
    Wallet,
    ListChecks,
} from "lucide-react";

const OverviewSection = ({ summary, loading, user }) => {
    const balance = summary.income - summary.expense;

    if (!user)
        return (
            <div className="text-center mt-12 bg-base-100/80 backdrop-blur-sm p-10 rounded-2xl shadow-lg max-w-md mx-auto">
                <p className="text-lg text-base-content/70 mb-4">
                    Login to see your financial summary.
                </p>
                <Link
                    to="/login"
                    className="btn btn-primary rounded-full px-8"
                >
                    Go to Login
                </Link>
            </div>
        );

    return (
        <section className="relative py-24 bg-base-200 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]"></div>

            <div className="relative container mx-auto px-6">
                <h2 className="text-2xl font-extrabold md:text-5xl leading-tight drop-shadow-sm text-center text-base-content mb-12">
                    Financial Overview
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Total Balance */}
                        <div className="group bg-base-100/80 backdrop-blur-sm border border-base-200 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col items-center">
                                <Wallet
                                    className="text-primary mb-4 group-hover:scale-110 transition-transform"
                                    size={44}
                                />
                                <h3 className="text-lg font-semibold text-base-content/80 mb-2">
                                    Total Balance
                                </h3>
                                <p
                                    className={`text-4xl font-extrabold ${balance >= 0 ? "text-primary" : "text-accent"
                                        }`}
                                >
                                    ${balance.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Total Income */}
                        <div className="group bg-base-100/80 backdrop-blur-sm border border-base-200 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col items-center">
                                <ArrowUpCircle
                                    className="text-secondary mb-4 group-hover:scale-110 transition-transform"
                                    size={44}
                                />
                                <h3 className="text-lg font-semibold text-base-content/80 mb-2">
                                    Total Income
                                </h3>
                                <p className="text-4xl font-extrabold text-secondary">
                                    ${summary.income.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Total Expense */}
                        <div className="group bg-base-100/80 backdrop-blur-sm border border-base-200 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col items-center">
                                <ArrowDownCircle
                                    className="text-accent mb-4 group-hover:scale-110 transition-transform"
                                    size={44}
                                />
                                <h3 className="text-lg font-semibold text-base-content/80 mb-2">
                                    Total Expense
                                </h3>
                                <p className="text-4xl font-extrabold text-accent">
                                    ${summary.expense.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Total Transactions */}
                        <div className="group bg-base-100/80 backdrop-blur-sm border border-base-200 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col items-center">
                                <ListChecks
                                    className="text-primary mb-4 group-hover:scale-110 transition-transform"
                                    size={44}
                                />
                                <h3 className="text-lg font-semibold text-base-content/80 mb-2">
                                    Total Transactions
                                </h3>
                                <p className="text-4xl font-extrabold text-primary">
                                    {summary.count}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OverviewSection;