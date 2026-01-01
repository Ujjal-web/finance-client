import React from "react";

const StaticSections = () => {
    return (
        <>

            <section className="relative py-20 px-6 bg-base-200">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-extrabold mb-12 text-base-content md:text-5xl leading-tight drop-shadow-sm">
                        Smart Budgeting Tips
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-base-100/90 backdrop-blur-sm border border-base-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/478/478544.png"
                                        alt="track icon"
                                        className="w-10 h-10"
                                    />
                                </div>
                            </div>
                            <h4 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-3">
                                Track Every Expense
                            </h4>
                            <p className="text-base-content/70 leading-relaxed">
                                Log all your expenses — big or small. It builds awareness and
                                gives you clarity on where your money really goes.
                            </p>
                        </div>

                        <div className="bg-base-100/90 backdrop-blur-sm border border-base-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1998/1998615.png"
                                        alt="budget icon"
                                        className="w-10 h-10"
                                    />
                                </div>
                            </div>
                            <h4 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-3">
                                Set a Realistic Budget
                            </h4>
                            <p className="text-base-content/70 leading-relaxed">
                                Base your budget on real income, prioritize essentials, and set
                                achievable financial targets that match your lifestyle.
                            </p>
                        </div>

                        <div className="bg-base-100/90 backdrop-blur-sm border border-base-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
                                        alt="review icon"
                                        className="w-10 h-10"
                                    />
                                </div>
                            </div>
                            <h4 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">
                                Review Regularly
                            </h4>
                            <p className="text-base-content/70 leading-relaxed">
                                Revisit your budget each month to track progress, adjust
                                spending, and stay aligned with your long-term goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-24 px-6 bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white rounded-3xl overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]"></div>

                <div className="relative max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl md:text-5xl font-extrabold leading-tight mb-4 text-white drop-shadow-sm">
                        Why Financial Planning Matters
                    </h2>
                    <div className="m-5 rounded-xl overflow-hidden shadow-2xl border-4 border-white/50 inline-block">
                        <img
                            src="/planning.png"
                            alt="Couple planning their financial future with a view of a city skyline"
                            className="w-full max-h-96 object-cover"
                        />
                    </div>
                    <p className="text-lg md:text-xl text-indigo-100 leading-relaxed max-w-3xl mx-auto">
                        Financial planning empowers you to shape your future with
                        confidence. It ensures stability, reduces stress, and helps you
                        achieve your dreams — whether that’s education, business, or
                        retirement. With <span className="font-semibold text-white">FinEase</span>,
                        your journey toward financial freedom starts today.
                    </p>

                </div>
            </section>
        </>
    );
};

export default StaticSections;