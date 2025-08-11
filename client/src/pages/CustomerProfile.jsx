import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import "./styles.css";

function CustomerProfile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7261/api/dashboard/customer",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) return <Loading />;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Your Profile</h1>
          <a href="/customer/profile/edit" className="edit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Profile
          </a>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <label>Full Name</label>
            <p>{profileData.name}</p>
          </div>

          <div className="detail-item">
            <label>Email</label>
            <p>{profileData.email}</p>
          </div>

          <div className="detail-item">
            <label>Account Balance</label>
            <p>₹{profileData.balance.toLocaleString()}</p>
          </div>

          <div className="detail-item">
            <label>Monthly Salary</label>
            <p>₹{profileData.monthlySalary.toLocaleString()}</p>
          </div>

          <div className="detail-item">
            <label>Monthly Budget</label>
            <p>₹{profileData.monthlyBudget.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;