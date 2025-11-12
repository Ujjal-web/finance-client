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
        if (!user)
            return Swal.fire("Error", "You must be logged in to add transactions.", "error");

        const transactionData = {
            ...formData,
            userEmail: user.email,
            userName: user.displayName,
            createdAt: new Date(),
        };

        try {
            const res = await fetch("https://finance-server-seven.vercel.app/transactions", {
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
            } else Swal.fire("Error!", "Failed to add transaction.", "error");
        } catch (err) {
            Swal.fire("Error!", "Something went wrong.", "error");
        }
    };

    return (
        <section className="min-h-[80vh] py-16 bg-linear-to-br from-slate-50 via-indigo-50 to-blue-50">
            <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm border border-indigo-100 p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    Add Transaction
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-medium mb-2">Type</label>
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
                        <label className="block font-medium mb-2">Category</label>
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
                        <label className="block font-medium mb-2">Amount</label>
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
                        <label className="block font-medium mb-2">Description</label>
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
                        <label className="block font-medium mb-2">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-2">User Name</label>
                            <input
                                type="text"
                                readOnly
                                value={user?.displayName || ""}
                                className="input input-bordered w-full bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-2">User Email</label>
                            <input
                                type="email"
                                readOnly
                                value={user?.email || ""}
                                className="input input-bordered w-full bg-gray-100"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-6 rounded-full"
                    >
                        Add Transaction
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddTransaction;