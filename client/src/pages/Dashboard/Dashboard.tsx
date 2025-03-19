import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// TODO: implementar o dashboard
const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/processes"); 
    }, [navigate]);

    return null;
};

export default Dashboard;
