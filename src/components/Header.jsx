import React from 'react';
import { Link } from 'react-router';

const Header = () => {
    return (
        <header className="bg-primary text-primary-content flex justify-between p-8">
            <h1 className="font-bold text-lg">FinEase</h1>
            <nav className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
};

export default Header;