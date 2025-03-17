import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AreasPage from "./pages/Areas/AreasPage";
import UnitsPage from "./pages/OrganizationalUnits/UnitsPage";
import ProcessesPage from "./pages/Processes/ProcessesPage";

const App = () => (
    <Router>
        <Layout>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/areas' element={<AreasPage />} />
                <Route path='/units' element={<UnitsPage />} />
                <Route path='/processes' element={<ProcessesPage />} />
            </Routes>
        </Layout>
    </Router>
);

export default App;
