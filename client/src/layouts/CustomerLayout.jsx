import CustomerNavBar from "../components/navbars/CustomerNavBar";
import "../pages/styles.css";

export default function CustomerLayout({ children }) {
  return (
    <div className="customer-layout">
      <CustomerNavBar />
      <main>{children}</main>
      <footer className="footer">
        © 2024 Financial Ecosystem. Secure & Reliable.
      </footer>
    </div>
  );
}