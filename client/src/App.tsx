import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => (
    <Router>
        <Layout>
            <Routes>
                <Route path='/' element={<Dashboard />} />
            </Routes>
        </Layout>
    </Router>
);

export default App;
