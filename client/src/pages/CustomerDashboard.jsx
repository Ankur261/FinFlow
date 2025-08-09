import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

function CustomerDashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log(localStorage.getItem("token"))
        axios.get("https://localhost:7261/api/Dashboard/customer", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }, []);

    if (!data) return <Loading/>;

    return (
        <div>
            <h1>Welcome {data.name}</h1>
            <p>Email: {data.email}</p>
            <p>Balance: ₹{data.balance}</p>
            <p>Monthly Salary: ₹{data.monthlySalary}</p>
            <p>Monthly Budget: ₹{data.monthlyBudget}</p>
        </div>
    );
}

export default CustomerDashboard;
