import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function InvoiceByCustomer() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const customerId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        if (!customerId || !token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`https://localhost:7261/api/Invoice/customer/${customerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setInvoices(data);
        } else {
          setError("Failed to fetch invoices");
        }
      } catch (err) {
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [navigate]);

  if (loading) return <div className="loading-container">Loading invoices...</div>;

  return (
    <div className="invoices-container">
      <div className="invoices-header">
        <h2>My Invoices</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="invoices-table-container">
        {invoices.length > 0 ? (
          <table className="invoices-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Amount (₹)</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} onClick={() => navigate(`/invoice/${inv.id}`)} className="invoice-row">
                  <td>{inv.invoiceNumber}</td>
                  <td className="amount-cell">{parseFloat(inv.amount).toFixed(2)}</td>
                  <td>{new Date(inv.issueDate).toLocaleDateString()}</td>
                  <td>{new Date(inv.dueDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${inv.status.toLowerCase()}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-invoices">
            <p>No invoices found</p>
            <button 
              className="primary-btn"
              onClick={() => navigate("/create-invoice")}
            >
              Create Your First Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}