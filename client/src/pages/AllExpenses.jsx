import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllExpenses() {
  const [expenses, setExpenses] = useState([]);

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://localhost:7261/api/Expense",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExpenses(res.data.data);
    } catch {
      alert("Error fetching all expenses");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <h2>All Expenses</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Customer</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.category}</td>
              <td>{exp.amount}</td>
              <td>{exp.description}</td>
              <td>{exp.date?.split("T")[0]}</td>
              <td>{exp.customerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
