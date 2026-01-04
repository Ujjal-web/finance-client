import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpCircle, ArrowDownCircle, Calendar, DollarSign } from "lucide-react";

const TransactionCard = ({ transaction }) => {
    const isIncome = transaction.type === "Income";
    const amount = parseFloat(transaction.amount || 0);
    const date = transaction.date ? new Date(transaction.date).toLocaleDateString() : "N/A";

    // Category icons mapping
    const categoryIcons = {
        Salary: "💰",
        Food: "🍔",
        Shopping: "🛍️",
        Bills: "📄",
        Transport: "🚗",
        Entertainment: "🎬",
    };

    return (
        <div className="bg-base-100 border border-base-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
            {/* Image/Icon Section */}
            <div className={`h-32 flex items-center justify-center ${isIncome ? "bg-secondary/10" : "bg-accent/10"}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isIncome ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent"}`}>
                    <span className="text-3xl">{categoryIcons[transaction.category] || (isIncome ? "📈" : "📉")}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-xl font-bold text-base-content mb-2 line-clamp-1">
                    {transaction.category}
                </h3>

                {/* Description */}
                <p className="text-base-content/70 text-sm mb-4 line-clamp-2 min-h-10">
                    {transaction.description || "No description provided"}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center gap-2 text-sm">
                        <DollarSign className={`w-4 h-4 ${isIncome ? "text-secondary" : "text-accent"}`} />
                        <span className={`font-semibold ${isIncome ? "text-secondary" : "text-accent"}`}>
                            {isIncome ? "+" : "-"}${amount.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-base-content/60">
                        <Calendar className="w-4 h-4" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {isIncome ? (
                            <ArrowUpCircle className="w-4 h-4 text-secondary" />
                        ) : (
                            <ArrowDownCircle className="w-4 h-4 text-accent" />
                        )}
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${isIncome ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent"}`}>
                            {transaction.type}
                        </span>
                    </div>
                </div>

                {/* View Details Button */}
                <Link
                    to={`/transaction/${transaction._id}`}
                    className="btn btn-primary btn-block rounded-lg mt-auto"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default TransactionCard;