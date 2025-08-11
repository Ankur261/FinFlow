import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import "./styles.css";

function CustomerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:7261/api/dashboard/customer", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setData(res.data))
    .catch(err => console.error(err));
  }, []);

  if (!data) return <Loading />;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, <span>{data.name}</span></h1>
        <p>Here's your financial overview</p>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-header">
            <h3>Total Balance</h3>
            <div className="icon-container blue">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="card-value">₹{data.balance.toLocaleString()}</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Monthly Salary</h3>
            <div className="icon-container green">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <path d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
              </svg>
            </div>
          </div>
          <p className="card-value">₹{data.monthlySalary.toLocaleString()}</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Monthly Budget</h3>
            <div className="icon-container purple">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="card-value">₹{data.monthlyBudget.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;