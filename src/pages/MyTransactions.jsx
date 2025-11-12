import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { Wallet, ArrowDownCircle, ArrowUpCircle, Calendar, Edit3, Trash2, Eye } from "lucide-react";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTxn, setEditingTxn] = useState(null);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);

    let sortBy = "date";
    let order = "desc";

    if (sortOption === "newest") { sortBy = "date"; order = "desc"; }
    else if (sortOption === "oldest") { sortBy = "date"; order = "asc"; }
    else if (sortOption === "high-amount") { sortBy = "amount"; order = "desc"; }
    else if (sortOption === "low-amount") { sortBy = "amount"; order = "asc"; }

    fetch(`https://finance-server-seven.vercel.app/transactions?email=${user.email}&sortBy=${sortBy}&order=${order}`)
      .then((res) => res.json())
      .then((data) => {
        const txns = data.transactions || [];
        setTransactions(txns);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, sortOption]);


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this transaction.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://finance-server-seven.vercel.app/transactions/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setTransactions((prev) => prev.filter((txn) => txn._id !== id));
              Swal.fire("Deleted!", "Transaction removed successfully.", "success");
            }
          });
      }
    });
  };

  const handleEdit = (txn) => setEditingTxn(txn);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedTxn = {
      type: form.type.value,
      category: form.category.value,
      amount: parseFloat(form.amount.value),
      description: form.description.value,
      date: form.date.value,
    };

    fetch(`https://finance-server-seven.vercel.app/transactions/${editingTxn._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTxn),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Transaction updated successfully.", "success");
          setTransactions((prev) =>
            prev.map((txn) =>
              txn._id === editingTxn._id ? { ...txn, ...updatedTxn } : txn
            )
          );
          setEditingTxn(null);
        } else {
          Swal.fire("Info", "No changes were made.", "info");
        }
      });
  };

  const sortTransactions = (list, option) => {
    const sorted = [...list];
    switch (option) {
      case "newest":
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "high-amount":
        sorted.sort((a, b) => b.amount - a.amount);
        break;
      case "low-amount":
        sorted.sort((a, b) => a.amount - b.amount);
        break;
      default:
        break;
    }
    return sorted;
  };

  const sortedTransactions = sortTransactions(transactions, sortOption);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (transactions.length === 0)
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        No transactions found
      </div>
    );

  return (
    <div className="p-6 container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-semibold text-center md:text-left">My Transactions</h2>

        <div className="flex items-center gap-2">
          <label className="font-medium">Sort by:</label>
          <select
            className="select select-bordered"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="high-amount">Highest Amount</option>
            <option value="low-amount">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Card Layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedTransactions.map((txn) => (
          <div
            key={txn._id}
            className={`rounded-2xl h-full flex flex-col shadow-md p-6 border transition hover:shadow-xl ${txn.type === "Income" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3
                className={`text-xl font-bold ${txn.type === "Income" ? "text-green-700" : "text-red-700"
                  }`}
              >
                {txn.type}
              </h3>
              {txn.type === "Income" ? (
                <ArrowUpCircle className="text-green-600" size={28} />
              ) : (
                <ArrowDownCircle className="text-red-600" size={28} />
              )}
            </div>

            <p className="text-gray-700 mb-1">
              <strong>Category:</strong> {txn.category}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Amount:</strong>{" "}
              <span className="text-lg font-semibold">${parseFloat(txn.amount || 0).toFixed(2)}</span>
            </p>
            <p className="text-gray-600 mb-3 flex items-center gap-1">
              <Calendar size={16} /> {txn.date ? new Date(txn.date).toLocaleDateString() : "N/A"}
            </p>

            <div className="flex gap-2 mt-4 ">
              <Link
                to={`/transaction/${txn._id}`}
                className="flex items-center gap-1 btn btn-sm btn-info flex-1 justify-center text-white"
              >
                <Eye size={16} /> View Details
              </Link>
              <button
                onClick={() => handleEdit(txn)}
                className="flex items-center gap-1 btn btn-sm btn-warning flex-1 justify-center text-white"
              >
                <Edit3 size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(txn._id)}
                className="flex items-center gap-1 btn btn-sm btn-error flex-1 justify-center text-white"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingTxn && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              Edit Transaction
            </h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <select
                name="type"
                defaultValue={editingTxn.type}
                className="select select-bordered w-full"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>

              <select
                name="category"
                defaultValue={editingTxn.category}
                className="select select-bordered w-full"
              >
                <option value="Salary">Salary</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
              </select>

              <input
                type="number"
                name="amount"
                defaultValue={editingTxn.amount}
                className="input input-bordered w-full"
                required
              />

              <textarea
                name="description"
                defaultValue={editingTxn.description}
                className="textarea textarea-bordered w-full"
                required
              ></textarea>

              <input
                type="date"
                name="date"
                defaultValue={editingTxn.date?.split("T")[0]}
                className="input input-bordered w-full"
                required
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingTxn(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTransactions;