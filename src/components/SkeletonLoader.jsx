import React from "react";

export const TransactionSkeleton = () => {
    return (
        <div className="rounded-2xl bg-base-200 animate-pulse p-6 border border-base-300">
            <div className="flex justify-between items-center mb-3">
                <div className="h-6 w-20 bg-base-300 rounded"></div>
                <div className="h-7 w-7 bg-base-300 rounded-full"></div>
            </div>
            <div className="space-y-2 mb-3">
                <div className="h-4 w-32 bg-base-300 rounded"></div>
                <div className="h-4 w-24 bg-base-300 rounded"></div>
                <div className="h-4 w-28 bg-base-300 rounded"></div>
            </div>
            <div className="flex gap-2 mt-4">
                <div className="h-8 flex-1 bg-base-300 rounded"></div>
                <div className="h-8 flex-1 bg-base-300 rounded"></div>
                <div className="h-8 flex-1 bg-base-300 rounded"></div>
            </div>
        </div>
    );
};

export const ReportCardSkeleton = () => {
    return (
        <div className="p-6 rounded-2xl bg-base-200 animate-pulse border border-base-300">
            <div className="h-6 w-32 bg-base-300 rounded mx-auto mb-2"></div>
            <div className="h-8 w-24 bg-base-300 rounded mx-auto"></div>
        </div>
    );
};

export const ChartSkeleton = () => {
    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-md border border-base-200">
            <div className="h-6 w-48 bg-base-300 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-64 bg-base-200 rounded animate-pulse"></div>
        </div>
    );
};


