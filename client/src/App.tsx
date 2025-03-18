import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AreasPage from "./pages/Areas/AreasPage";
import UnitsPage from "./pages/OrganizationalUnits/UnitsPage";
import ProcessesListPage from "./pages/Processes/ProcessesListPage";
import ProcessFormPage from "./pages/Processes/ProcessesFormPage";

const App = () => (
    <Router>
        <Layout>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/areas' element={<AreasPage />} />
                <Route path='/units' element={<UnitsPage />} />
                <Route path='/processes' element={<ProcessesListPage />} />
                <Route path='/processes/manage' element={<ProcessFormPage />} />
            </Routes>
        </Layout>
    </Router>
);

export default App;
