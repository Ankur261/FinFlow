import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

export default function InvoiceByCustomer() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7261/api/invoice/customer/3")  // Get all invoices
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Invoices</h2>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Invoice #</th>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Issue Date</th>
                        <th className="p-2 border">Due Date</th>
                        <th className="p-2 border">Customer ID</th>
                        <th className="p-2 border">Merchant ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((inv, index) => (
                            <tr key={index}>
                                <td className="p-2 border">{inv.invoiceNumber}</td>
                                <td className="p-2 border">₹{inv.amount}</td>
                                <td className="p-2 border">{inv.status}</td>
                                <td className="p-2 border">{inv.issueDate?.split('T')[0]}</td>
                                <td className="p-2 border">{inv.dueDate?.split('T')[0]}</td>
                                <td className="p-2 border">{inv.customerId}</td>
                                <td className="p-2 border">{inv.merchantId}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
