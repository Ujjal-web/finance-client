import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const TransactionDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [transaction, setTransaction] = useState(null);
    const [categoryTotal, setCategoryTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        fetch(`http://localhost:5000/transactions/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.success || !data.transaction) {
                    Swal.fire("Not Found", "Transaction not found!", "warning");
                    setLoading(false);
                    return;
                }
                setTransaction(data.transaction);
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
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    if (!transaction)
        return (
            <div className="text-center mt-20 text-lg font-medium">
                Transaction not found
            </div>
        );

    return (
        <div className="max-w-2xl mx-auto bg-base-200 p-6 rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-semibold mb-6 text-center">
                Transaction Details
            </h2>

            <div className="space-y-3 text-lg">
                <p>
                    <span className="font-semibold">Type:</span> {transaction.type}
                </p>
                <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {transaction.category}
                </p>
                <p>
                    <span className="font-semibold">Amount:</span> $
                    {parseFloat(transaction.amount).toFixed(2)}
                </p>
                <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {transaction.description}
                </p>
                <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(transaction.date).toLocaleDateString()}
                </p>
                <p>
                    <span className="font-semibold">User:</span> {transaction.userName} (
                    {transaction.userEmail})
                </p>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg shadow text-center">
                <h3 className="text-xl font-semibold">
                    Total {transaction.type} in {transaction.category}
                </h3>
                <p className="text-2xl font-bold mt-2 text-primary">
                    ${categoryTotal.toFixed(2)}
                </p>
            </div>

            <div className="mt-8 text-center">
                <Link to="/my-transactions" className="btn btn-primary">
                    Back to My Transactions
                </Link>
            </div>
        </div>
    );
};

export default TransactionDetails;
