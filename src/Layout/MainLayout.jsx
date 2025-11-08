import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
            <div>
                <Header></Header>
                <div>
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>

            <Toaster></Toaster>
        </div>
    );
};

export default MainLayout;