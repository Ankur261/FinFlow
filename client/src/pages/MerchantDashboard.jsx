import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';



export default function MerchantDashboard() {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7261/api/Dashboard/merchant", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            })
    }, [])

    if(loading) {
        return (<Loading/>)
    }
    if(error) {
        return (
            <div>
                Error: {error}
            </div>
        )
    }
    return (
        <div>
            <h1>{data.businessName} Dashboard</h1>
            <p>Email: {data.email}</p>
            <p>Business Type: {data.businessType}</p>
            <p>Total Invoices: {data.totalInvoices}</p>
        </div>
    );
}
