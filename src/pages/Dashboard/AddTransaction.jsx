import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const AddTransaction = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
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

        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center items-center min-h-[80vh]">
            <div className="w-full max-w-xl bg-base-100/80 backdrop-blur-sm border border-base-200 p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <h2 className="text-4xl font-extrabold text-center text-base-content mb-8">
                    Add Transaction
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-medium mb-2 text-base-content/80">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="select select-bordered w-full rounded-lg focus:select-primary"
                        >
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-2 text-base-content/80">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="select select-bordered w-full rounded-lg focus:select-primary"
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
                        <label className="block font-medium mb-2 text-base-content/80">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="input input-bordered w-full rounded-lg focus:input-primary"
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2 text-base-content/80">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full rounded-lg focus:textarea-primary"
                            placeholder="Enter description"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-medium mb-2 text-base-content/80">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="input input-bordered w-full rounded-lg focus:input-primary"
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-2 text-base-content/80">User Name</label>
                            <input
                                type="text"
                                readOnly
                                value={user?.displayName || ""}
                                className="input input-bordered w-full bg-base-200 rounded-lg text-base-content/60"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-2 text-base-content/80">User Email</label>
                            <input
                                type="email"
                                readOnly
                                value={user?.email || ""}
                                className="input input-bordered w-full bg-base-200 rounded-lg text-base-content/60"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-6 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Add Transaction"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTransaction;