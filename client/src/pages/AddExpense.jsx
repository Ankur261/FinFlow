import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function AddExpense() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const customerId = localStorage.getItem("id");
      const customerName = localStorage.getItem("name");

      const payload = {
        category,
        amount: parseFloat(amount),
        description,
        date,
        customerId: parseInt(customerId),
        customerName: customerName
      };

      const res = await axios.post(
        "https://localhost:7261/api/Expense/",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/customer/expense");
    } catch (error) {
      setError(error.response?.data?.message || "Error adding expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Add New Expense</h2>
          <p>Track your spending to better manage your finances</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Housing">Housing</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <input
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Dinner with friends"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/my-expenses")}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}