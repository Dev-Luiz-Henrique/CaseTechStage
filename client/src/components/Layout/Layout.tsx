import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./Layout.scss";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='layout'>
            <Header />
            <div className='layout__main'>
                <Sidebar />
                <main className='layout__content'>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
