import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddTransaction from "../pages/AddTransaction";
import Reports from "../pages/Reports";
import MyTransaction from "../pages/MyTransaction";
import PrivateRoute from "./PrivateRoute";

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
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/add-transaction",
                element: (
                    <PrivateRoute>
                        <AddTransaction />
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-transactions",
                element: (
                    <PrivateRoute>
                        <MyTransaction />
                    </PrivateRoute>
                ),
            },
            {
                path: "/reports",
                element: (
                    <PrivateRoute>
                        <Reports />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <div className="text-center mt-20 text-xl">404 | Page Not Found</div>,
    },
]);
