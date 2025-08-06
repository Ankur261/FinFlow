import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

export default function CustomerDashBoard() {
    

    const [data, setData] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [newCustomer, setNewCustomer] = useState({
        name: "",
        balance: "",
        monthlySalary: "",
        monthlyBudget: ""
    });

    const fetchCustomer = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://localhost:7261/api/Customer/7`);
            setData(res.data);
        } catch (err) {
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchExpenses = async () => {
        try {
            const res = await axios.get(`https://localhost:7261/api/Expense/Customer/${CUSTOMER_ID}`);
            setExpenses(res.data);
        } catch (err) {
            console.error("Failed to fetch expenses");
        }
    };

    const fetchInvoices = async () => {
        try {
            const res = await axios.get(`https://localhost:7261/api/Invoice/Customer/${CUSTOMER_ID}`);
            setInvoices(res.data);
        } catch (err) {
            console.error("Failed to fetch invoices");
        }
    };

    const fetchTransactions = async () => {
        try {
            const res = await axios.get(`https://localhost:7261/api/Transaction/Customer/${CUSTOMER_ID}`);
            setTransactions(res.data);
        } catch (err) {
            console.error("Failed to fetch transactions");
        }
    };

    useEffect(() => {
        fetchCustomer();
        fetchExpenses();
        fetchInvoices();
        fetchTransactions();
    }, []);

    const handleAddCustomer = () => {
        axios.post("https://localhost:7261/api/Customer", newCustomer)
            .then(() => {
                alert("Customer added successfully!");
                setNewCustomer({ name: "", balance: "", monthlySalary: "", monthlyBudget: "" });
                fetchCustomer();
            })
            .catch((err) => {
                alert("Failed to add customer.");
            });
    };

    const handleUpdateCustomer = () => {
        const dto = {
            name: data.name,
            balance: data.balance,
            monthlySalary: data.monthlySalary,
            monthlyBudget: data.monthlyBudget
        };

        axios.put(`https://localhost:7261/api/Customer/7`, dto)
            .then(() => {
                alert("Customer updated successfully!");
                setEditMode(false);
                fetchCustomer();
            })
            .catch((err) => {
                alert("Failed to update customer.");
            });
    };

    const handleDeleteCustomer = () => {
        axios.delete(`https://localhost:7261/api/Customer/7`)
            .then(() => {
                alert("Customer deleted successfully!");
                setData(null);
            })
            .catch((err) => {
                alert("Failed to delete customer.");
            });
    };

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Customer Dashboard</h2>

            {data ? (
                <div>
                    {editMode ? (
                        <div>
                            <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Name" />
                            <input type="number" value={data.balance} onChange={(e) => setData({ ...data, balance: Number(e.target.value) })} placeholder="Balance" />
                            <input type="number" value={data.monthlySalary} onChange={(e) => setData({ ...data, monthlySalary: Number(e.target.value) })} placeholder="Monthly Salary" />
                            <input type="number" value={data.monthlyBudget} onChange={(e) => setData({ ...data, monthlyBudget: Number(e.target.value) })} placeholder="Monthly Budget" />
                            <button onClick={handleUpdateCustomer}>Update</button>
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Name:</strong> {data.name}</p>
                            <p><strong>Balance:</strong> ₹{data.balance}</p>
                            <p><strong>Monthly Salary:</strong> ₹{data.monthlySalary}</p>
                            <p><strong>Monthly Budget:</strong> ₹{data.monthlyBudget}</p>
                            <button onClick={() => setEditMode(true)}>Edit</button>
                            <button onClick={handleDeleteCustomer}>Delete</button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <p><strong>No customer found</strong></p>
                    <p>Please add a new one below</p>
                </div>
            )}

            <hr />

            <h3>Add New Customer</h3>
            <input type="text" placeholder="Name" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} />
            <input type="number" placeholder="Balance" value={newCustomer.balance} onChange={(e) => setNewCustomer({ ...newCustomer, balance: Number(e.target.value) })} />
            <input type="number" placeholder="Monthly Salary" value={newCustomer.monthlySalary} onChange={(e) => setNewCustomer({ ...newCustomer, monthlySalary: Number(e.target.value) })} />
            <input type="number" placeholder="Monthly Budget" value={newCustomer.monthlyBudget} onChange={(e) => setNewCustomer({ ...newCustomer, monthlyBudget: Number(e.target.value) })} />
            <button onClick={handleAddCustomer}>Add Customer</button>

            <hr />

            {/* Section: Recent Expenses */}
            <h3>Recent Expenses</h3>
            {expenses.length > 0 ? (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            ₹{expense.amount} - {expense.category} ({expense.date})
                        </li>
                    ))}
                </ul>
            ) : <p>No recent expenses found.</p>}

            {/* Section: Customer Invoices */}
            <h3>Customer Invoices</h3>
            {invoices.length > 0 ? (
                <ul>
                    {invoices.map((invoice) => (
                        <li key={invoice.id}>
                            Invoice #{invoice.id} - ₹{invoice.totalAmount} - {invoice.date}
                        </li>
                    ))}
                </ul>
            ) : <p>No invoices found.</p>}

            {/* Section: Transactions */}
            <h3>Transactions</h3>
            {transactions.length > 0 ? (
                <ul>
                    {transactions.map((txn) => (
                        <li key={txn.id}>
                            {txn.type}: ₹{txn.amount} on {txn.date}
                        </li>
                    ))}
                </ul>
            ) : <p>No transactions found.</p>}
        </div>
    );
}
