import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CreateInvoice = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    amount: '',
    dueDate: '',
    issueDate: '',
    status: 'Pending',
    customerId: '',
    merchantId: localStorage.getItem('id') || ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://localhost:7261/api/invoice', invoice, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/invoices');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create invoice');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Create New Invoice</h2>
          <p>Generate an invoice for your customer</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="invoice-form">
          <div className="form-group">
            <label>Invoice Number</label>
            <input
              name="invoiceNumber"
              type="text"
              value={invoice.invoiceNumber}
              onChange={handleChange}
              placeholder="INV-0001"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              name="amount"
              type="number"
              value={invoice.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={invoice.status}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="form-group">
            <label>Customer ID</label>
            <input
              name="customerId"
              type="text"
              value={invoice.customerId}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Merchant ID</label>
            <input
              name="merchantId"
              type="text"
              value={invoice.merchantId}
              onChange={handleChange}
              className="form-input"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={invoice.issueDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={invoice.dueDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/invoices')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;