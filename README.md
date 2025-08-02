# 💸 FinFlow

**FinFlow** is a comprehensive personal finance management system that helps users track expenses, manage invoices, monitor transactions, request loans, and interact with merchants. It offers two interchangeable backend implementations — one using **Spring Boot** and another using **ASP.NET Core Web API** — with a shared **React.js** frontend. The system uses **MySQL** as the database engine.

---

## 🚀 Tech Stack

### Frontend
- **React.js**
- Axios (for API communication)
- React Router

### Backend (Two Options)
- **Spring Boot (Java)**  
- **ASP.NET Core Web API (C#)**  
> Both backends implement the same features and connect to the same MySQL database.

### Database
- **MySQL**

---

## 📦 Features

- Customer and Admin login
- Expense tracking with categories
- Invoice creation and management
- Loan request and approval flow
- Transaction history
- Merchant portal for generating invoices
- Notification system for important events
- AI query module (placeholder for future integration)

---

## 🗂️ Project Structure

### React Frontend (`client`)


---

## ⚙️ Getting Started

### Prerequisites
- Node.js & npm
- Java 17+ and Maven
- .NET SDK 8.0
- MySQL Server

---

### 🧪 Setup Instructions

#### 📌 Database
```sql
CREATE DATABASE finflow;


✅ React Frontend
cd client
npm install
npm start


✅ Spring Boot Backend
cd server-spring-boot
# Make sure MySQL credentials are set in application.properties
mvn spring-boot:run


✅ .NET Core Backend
cd server-dotnet
# Make sure MySQL connection string is set in appsettings.json
dotnet restore
dotnet run

✍️ Author
Ankur Agrawal
PG-DAC, CDAC Mumbai (Kharghar)

📜 License
This project is licensed under the MIT License.

---

Let me know if you’d like a version with badge icons (e.g. build, license, tech stack) or if you want to publish it directly via GitHub CLI instructions.
