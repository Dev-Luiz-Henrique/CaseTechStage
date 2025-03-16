import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AreasPage from "./pages/Areas/AreasPage";

const App = () => (
    <Router>
        <Layout>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/areas' element={<AreasPage />} />
            </Routes>
        </Layout>
    </Router>
);

export default App;
