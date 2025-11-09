import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import { Link, NavLink } from "react-router";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTxn, setEditingTxn] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`http://localhost:5000/transactions?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this transaction.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/transactions/${id}`, {
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

    fetch(`http://localhost:5000/transactions/${editingTxn._id}`, {
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
    <div className="overflow-x-auto p-6">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        My Transactions
      </h2>
      <table className="table w-full border">
        <thead className="bg-base-200">
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id} className="hover">
              <td>{txn.type}</td>
              <td>{txn.category}</td>
              <td>${txn.amount}</td>
              <td>{txn.description}</td>
              <td>{new Date(txn.date).toLocaleDateString()}</td>
              <td className="text-center space-x-2">
                <button
                  onClick={() => setEditingTxn(txn)}
                  className="btn btn-sm btn-info text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(txn._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>

                <NavLink to={`/transaction/${txn._id}`} className="btn btn-sm btn-info">
                  View Details
                </NavLink>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTxn && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl transform scale-100 animate-fadeIn">
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
                defaultValue={editingTxn.date}
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
