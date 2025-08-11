import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function CustomerExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const customerId = localStorage.getItem("id");

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `https://localhost:7261/api/Expense/customer/${customerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExpenses(res.data.data);
    } catch (err) {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://localhost:7261/api/Expense/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchExpenses();
    } catch {
      setError("Failed to delete expense");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) return <div className="loading-container">Loading expenses...</div>;

  return (
    <div className="expenses-container">
      <div className="expenses-header">
        <h2>My Expenses</h2>
        <button 
          className="add-expense-btn"
          onClick={() => navigate("/customer/addExpense")}
        >
          + Add New Expense
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="expenses-table-container">
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>
                    <span className={`category-badge ${exp.category.toLowerCase()}`}>
                      {exp.category}
                    </span>
                  </td>
                  <td className="amount-cell">₹{exp.amount.toFixed(2)}</td>
                  <td>{exp.description || "-"}</td>
                  <td>{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/customer/editExpense/${exp.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteExpense(exp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-expenses">
                  No expenses found. Add your first expense!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}