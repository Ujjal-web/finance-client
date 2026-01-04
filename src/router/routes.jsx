import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Transactions from "../pages/Transactions";
import TransactionDetails from "../pages/TransactionDetails";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Dashboard Pages
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyTransactions from "../pages/Dashboard/MyTransactions";
import AddTransaction from "../pages/Dashboard/AddTransaction";
import TransactionDetailsDashboard from "../pages/Dashboard/TransactionDetails";
import Reports from "../pages/Dashboard/Reports";
import Profile from "../pages/Dashboard/Profile";
import AllUsers from "../pages/Dashboard/AllUsers";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
            {
                path: "/register",
                element: (
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                ),
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/privacy",
                element: <PrivacyPolicy />,
            },
            {
                path: "/transactions",
                element: <Transactions />,
            },
            {
                path: "/transaction/:id",
                element: <TransactionDetails />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardHome />,
            },
            {
                path: "my-transactions",
                element: <MyTransactions />,
            },
            {
                path: "add-transaction",
                element: <AddTransaction />,
            },
            {
                path: "transaction/:id",
                element: <TransactionDetailsDashboard />,
            },
            {
                path: "reports",
                element: <Reports />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "users",
                element: <AllUsers />, // Admin only - protected in component
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
