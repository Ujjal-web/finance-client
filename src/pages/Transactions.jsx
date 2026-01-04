import React, { useState, useEffect } from "react";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import TransactionCard from "../components/TransactionCard";
import { TransactionSkeleton } from "../components/SkeletonLoader";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        type: "all",
        category: "all",
        minAmount: "",
        maxAmount: "",
    });
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        // Fetch all transactions (public endpoint)
        setLoading(true);
        fetch("https://finance-server-seven.vercel.app/transactions")
            .then((res) => res.json())
            .then((data) => {
                const txns = data.transactions || [];
                setTransactions(txns);
                setFilteredTransactions(txns);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching transactions:", err);
                setLoading(false);
            });
    }, []);

    // Apply filters and search
    useEffect(() => {
        let filtered = [...transactions];

        // Search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (txn) =>
                    txn.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    txn.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Type filter
        if (filters.type !== "all") {
            filtered = filtered.filter((txn) => txn.type === filters.type);
        }

        // Category filter
        if (filters.category !== "all") {
            filtered = filtered.filter((txn) => txn.category === filters.category);
        }

        // Amount filters
        if (filters.minAmount) {
            filtered = filtered.filter((txn) => parseFloat(txn.amount || 0) >= parseFloat(filters.minAmount));
        }
        if (filters.maxAmount) {
            filtered = filtered.filter((txn) => parseFloat(txn.amount || 0) <= parseFloat(filters.maxAmount));
        }

        // Sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.date || 0) - new Date(a.date || 0);
                case "oldest":
                    return new Date(a.date || 0) - new Date(b.date || 0);
                case "amount-high":
                    return parseFloat(b.amount || 0) - parseFloat(a.amount || 0);
                case "amount-low":
                    return parseFloat(a.amount || 0) - parseFloat(b.amount || 0);
                case "category":
                    return (a.category || "").localeCompare(b.category || "");
                default:
                    return 0;
            }
        });

        setFilteredTransactions(filtered);
        setCurrentPage(1);
    }, [transactions, searchQuery, filters, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

    const categories = ["Salary", "Food", "Shopping", "Bills", "Transport", "Entertainment"];

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-base-content mb-2">Explore Transactions</h1>
                    <p className="text-base-content/70">Browse and filter through all transactions</p>
                </div>

                {/* Search and Filters Bar */}
                <div className="bg-base-100 rounded-2xl shadow-md p-6 mb-8">
                    {/* Search */}
                    <div className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by category or description..."
                                className="input input-bordered w-full pl-10 rounded-lg focus:input-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Type Filter */}
                        <div>
                            <label className="label text-sm font-medium text-base-content/80">
                                <Filter className="w-4 h-4 mr-1" />
                                Type
                            </label>
                            <select
                                className="select select-bordered w-full rounded-lg focus:select-primary"
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            >
                                <option value="all">All Types</option>
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="label text-sm font-medium text-base-content/80">
                                Category
                            </label>
                            <select
                                className="select select-bordered w-full rounded-lg focus:select-primary"
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Min Amount */}
                        <div>
                            <label className="label text-sm font-medium text-base-content/80">
                                Min Amount
                            </label>
                            <input
                                type="number"
                                className="input input-bordered w-full rounded-lg focus:input-primary"
                                placeholder="Min"
                                value={filters.minAmount}
                                onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                            />
                        </div>

                        {/* Max Amount */}
                        <div>
                            <label className="label text-sm font-medium text-base-content/80">
                                Max Amount
                            </label>
                            <input
                                type="number"
                                className="input input-bordered w-full rounded-lg focus:input-primary"
                                placeholder="Max"
                                value={filters.maxAmount}
                                onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                            />
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="label text-sm font-medium text-base-content/80">
                                <SortAsc className="w-4 h-4 mr-1" />
                                Sort By
                            </label>
                            <select
                                className="select select-bordered w-full rounded-lg focus:select-primary"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="amount-high">Amount: High to Low</option>
                                <option value="amount-low">Amount: Low to High</option>
                                <option value="category">Category A-Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-base-content/70">
                        Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
                    </div>
                </div>

                {/* Transactions Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <TransactionSkeleton key={i} />
                        ))}
                    </div>
                ) : paginatedTransactions.length === 0 ? (
                    <div className="text-center py-16 bg-base-100 rounded-2xl">
                        <p className="text-lg text-base-content/70">No transactions found</p>
                        <p className="text-sm text-base-content/50 mt-2">Try adjusting your filters</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {paginatedTransactions.map((transaction) => (
                                <TransactionCard key={transaction._id} transaction={transaction} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages)].map((_, i) => {
                                    const page = i + 1;
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={page}
                                                className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-outline"}`}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </button>
                                        );
                                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                                        return <span key={page} className="px-2">...</span>;
                                    }
                                    return null;
                                })}
                                <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Transactions;


