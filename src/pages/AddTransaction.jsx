import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const AddTransaction = () => {
    const { user } = useContext(AuthContext);


    const [formData, setFormData] = useState({
        type: "Income",
        category: "",
        amount: "",
        description: "",
        date: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire("Error", "You must be logged in to add transactions.", "error");
            return;
        }

        const transactionData = {
            ...formData,
            userEmail: user.email,
            userName: user.displayName,
            createdAt: new Date(),
        };

        try {
            const res = await fetch("http://localhost:5000/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transactionData),
            });

            const data = await res.json();

            if (data.insertedId || data.success) {
                Swal.fire("Success!", "Transaction added successfully", "success");
                setFormData({
                    type: "Income",
                    category: "",
                    amount: "",
                    description: "",
                    date: "",
                });
            } else {
                Swal.fire("Error!", "Failed to add transaction.", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Something went wrong.", "error");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-base-200 p-8 rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-semibold mb-6 text-center">Add Transaction</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Salary">Salary</option>
                        <option value="Food">Food</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="Enter amount"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter description"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block font-medium mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">User Name</label>
                        <input
                            type="text"
                            readOnly
                            value={user?.displayName || ""}
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">User Email</label>
                        <input
                            type="email"
                            readOnly
                            value={user?.email || ""}
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransaction;
