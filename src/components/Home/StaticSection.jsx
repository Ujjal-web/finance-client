import React from "react";

const StaticSections = () => {
    return (
        <>

            <section className="relative py-20 px-6 bg-linear-to-br from-white via-slate-50 to-indigo-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-12 text-gray-800">
                        Smart Budgeting Tips
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <div className="bg-indigo-100 p-3 rounded-full">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/478/478544.png"
                                        alt="track icon"
                                        className="w-10 h-10"
                                    />
                                </div>
                            </div>
                            <h4 className="text-xl font-semibold text-indigo-700 mb-3">
                                Track Every Expense
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                Log all your expenses — big or small. It builds awareness and
                                gives you clarity on where your money really goes.
                            </p>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1998/1998615.png"
                                        alt="budget icon"
                                        className="w-10 h-10"
                                    />
                                </div>
                            </div>
                            <h4 className="text-xl font-semibold text-green-700 mb-3">
                                Set a Realistic Budget
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                Base your budget on real income, prioritize essentials, and set
                                achievable financial targets that match your lifestyle.
                            </p>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
                                        alt="review icon"
                                        className="w-10 h-10"
                                    />
                                </div>
                            </div>
                            <h4 className="text-xl font-semibold text-purple-700 mb-3">
                                Review Regularly
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                Revisit your budget each month to track progress, adjust
                                spending, and stay aligned with your long-term goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-24 px-6 bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]"></div>

                <div className="relative max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-6">
                        Why Financial Planning Matters
                    </h2>
                    <p className="text-lg md:text-xl text-indigo-100 leading-relaxed max-w-3xl mx-auto mb-10">
                        Financial planning empowers you to shape your future with
                        confidence. It ensures stability, reduces stress, and helps you
                        achieve your dreams — whether that’s education, business, or
                        retirement. With <span className="font-semibold text-white">FinEase</span>,
                        your journey toward financial freedom starts today.
                    </p>

                    <div className="flex justify-center">
                        <button className="btn btn-outline border-white text-white hover:bg-white hover:text-indigo-700 rounded-full px-6 py-2 transition-all">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StaticSections;