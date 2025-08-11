import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css"; // Make sure to import your CSS file

export default function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://localhost:7261/api/Expense/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const exp = res.data.data;
        setCategory(exp.category);
        setAmount(exp.amount);
        setDescription(exp.description);
        setDate(exp.date.split("T")[0]);
        setIsLoading(false);
      } catch {
        setError("Error loading expense details");
        setIsLoading(false);
      }
    };
    fetchExpense();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://localhost:7261/api/Expense/${id}`,
        {
          id: parseInt(id),
          category,
          amount: parseFloat(amount),
          description,
          date,
          customerId: parseInt(localStorage.getItem("id"))
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/my-expenses");
    } catch {
      setError("Error updating expense");
    }
  };

  if (isLoading) return <div className="loading-container">Loading...</div>;

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Edit Expense</h2>
          <p>Update your expense details</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleUpdate} className="expense-form">
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Housing">Housing</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
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
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes"
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
            <button type="submit" className="submit-btn">
              Update Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}