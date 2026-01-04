import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { ArrowUpCircle, ArrowDownCircle, Calendar, DollarSign, User, FileText, TrendingUp } from "lucide-react";
import Swal from "sweetalert2";
import TransactionCard from "../components/TransactionCard";

const TransactionDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [transaction, setTransaction] = useState(null);
    const [categoryTotal, setCategoryTotal] = useState(0);
    const [relatedTransactions, setRelatedTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        fetch(`https://finance-server-seven.vercel.app/transactions/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.success || !data.transaction) {
                    Swal.fire("Not Found", "Transaction not found!", "warning");
                    setLoading(false);
                    return;
                }
                setTransaction(data.transaction);
                setCategoryTotal(data.totalAmount || 0);
                
                // Fetch related transactions
                fetch(`https://finance-server-seven.vercel.app/transactions?category=${data.transaction.category}&limit=4`)
                    .then((res) => res.json())
                    .then((relatedData) => {
                        const related = (relatedData.transactions || []).filter(t => t._id !== id);
                        setRelatedTransactions(related.slice(0, 3));
                    });
                
                setLoading(false);
            })
            .catch(() => {
                Swal.fire("Error", "Failed to load transaction details.", "error");
                setLoading(false);
            });
    }, [id]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );

    if (!transaction)
        return (
            <div className="text-center mt-20 text-lg font-medium text-base-content">
                Transaction not found
            </div>
        );

    const isIncome = transaction.type === "Income";
    const amount = parseFloat(transaction.amount || 0);

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Back Button */}
                <Link to="/transactions" className="btn btn-ghost mb-6 text-base-content">
                    ← Back to Transactions
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overview Section */}
                        <div className="bg-base-100 rounded-2xl shadow-lg p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isIncome ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent"}`}>
                                    {isIncome ? <ArrowUpCircle size={40} /> : <ArrowDownCircle size={40} />}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-base-content">{transaction.category}</h1>
                                    <p className="text-base-content/70">{transaction.type}</p>
                                </div>
                            </div>

                            {/* Image/Media Placeholder */}
                            <div className="mb-6 rounded-xl overflow-hidden bg-base-200 h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">
                                        {isIncome ? "💰" : "📉"}
                                    </div>
                                    <p className="text-base-content/50">Transaction Visual</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-base-content mb-3 flex items-center gap-2">
                                    <FileText size={20} />
                                    Description
                                </h2>
                                <p className="text-base-content/80 leading-relaxed">
                                    {transaction.description || "No description provided for this transaction."}
                                </p>
                            </div>
                        </div>

                        {/* Key Information Section */}
                        <div className="bg-base-100 rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-base-content mb-6">Key Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                                    <DollarSign className={`w-8 h-8 ${isIncome ? "text-secondary" : "text-accent"}`} />
                                    <div>
                                        <p className="text-sm text-base-content/60">Amount</p>
                                        <p className={`text-2xl font-bold ${isIncome ? "text-secondary" : "text-accent"}`}>
                                            {isIncome ? "+" : "-"}${amount.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                                    <Calendar className="w-8 h-8 text-primary" />
                                    <div>
                                        <p className="text-sm text-base-content/60">Date</p>
                                        <p className="text-xl font-semibold text-base-content">
                                            {new Date(transaction.date).toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                                    <TrendingUp className="w-8 h-8 text-primary" />
                                    <div>
                                        <p className="text-sm text-base-content/60">Category</p>
                                        <p className="text-xl font-semibold text-base-content">{transaction.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                                    <User className="w-8 h-8 text-primary" />
                                    <div>
                                        <p className="text-sm text-base-content/60">User</p>
                                        <p className="text-lg font-semibold text-base-content">{transaction.userName || "Unknown"}</p>
                                        <p className="text-sm text-base-content/60">{transaction.userEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="bg-base-100 rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-base-content mb-6">Category Statistics</h2>
                            <div className="bg-gradient-to-r from-primary to-secondary text-primary-content p-6 rounded-xl text-center">
                                <p className="text-sm opacity-90 mb-2">Total {transaction.type} in {transaction.category}</p>
                                <p className="text-4xl font-bold">${categoryTotal.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info Card */}
                        <div className="bg-base-100 rounded-2xl shadow-lg p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-base-content mb-4">Quick Info</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-base-content/60">Transaction ID</p>
                                    <p className="text-xs font-mono text-base-content/80 break-all">{transaction._id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-base-content/60">Created</p>
                                    <p className="text-sm text-base-content">
                                        {transaction.createdAt 
                                            ? new Date(transaction.createdAt).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Related Transactions */}
                        {relatedTransactions.length > 0 && (
                            <div className="bg-base-100 rounded-2xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-base-content mb-4">Related Transactions</h3>
                                <div className="space-y-4">
                                    {relatedTransactions.map((txn) => (
                                        <Link key={txn._id} to={`/transaction/${txn._id}`}>
                                            <div className="p-3 bg-base-200 rounded-lg hover:bg-base-300 transition">
                                                <p className="font-semibold text-base-content text-sm">{txn.category}</p>
                                                <p className={`text-xs ${txn.type === "Income" ? "text-secondary" : "text-accent"}`}>
                                                    {txn.type === "Income" ? "+" : "-"}${parseFloat(txn.amount || 0).toFixed(2)}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link to="/transactions" className="btn btn-sm btn-primary btn-block mt-4">
                                    View All
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
