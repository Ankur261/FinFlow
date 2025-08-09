import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

function AdminDashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7261/api/Dashboard/admin", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }, []);

    if (!data) return <Loading/>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Total Customers: {data.totalCustomers}</p>
            <p>Total Merchants: {data.totalMerchants}</p>
            <p>Total Invoices: {data.totalInvoices}</p>
        </div>
    );
}

export default AdminDashboard;
