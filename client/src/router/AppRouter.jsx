import { Routes, Route } from "react-router";
import AdminDashboard from "../pages/AdminDashboard";
import CustomerDashboard from "../pages/CustomerDashboard";
import MerchantDashboard from "../pages/MerchantDashboard";
import InvoiceByCustomer from "../pages/InvoiceByCustomer";
import CreateInvoice from "../pages/CreateInvoice";
import InvoiceByMerchant from "../pages/InvoiceByMerchant";
import AllInvoices from "../pages/AllInvoices";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import GuestRoute from "./GuestRoute";

function AppRouter() {
    return (
        <Routes>
            {/* Guest routes */}
            <Route path="/login" element={
                <GuestRoute>
                    <Login />
                </GuestRoute>
            } />
            <Route path="/register" element={
                <GuestRoute>
                    <Register />
                </GuestRoute>
            } />

            {/* Protected routes */}
            <Route path="/admin/dashboard" element={
                <AuthRoute>
                    <PrivateRoute role="Admin">
                        <AdminDashboard />
                    </PrivateRoute>
                </AuthRoute>
            } />
            <Route path="/merchant/dashboard" element={
                <AuthRoute>
                    <PrivateRoute role="Merchant">
                        <MerchantDashboard />
                    </PrivateRoute>
                </AuthRoute>
            } />
            <Route path="/customer/dashboard" element={
                <AuthRoute>
                    <PrivateRoute role="Customer">
                        <CustomerDashboard />
                    </PrivateRoute>
                </AuthRoute>
            } />

            {/* Invoice routes (protected) */}
            <Route path="/invoice/create" element={<AuthRoute><CreateInvoice /></AuthRoute>} />
            <Route path="/invoice/customer" element={<AuthRoute><InvoiceByCustomer /></AuthRoute>} />
            <Route path="/invoice/merchant" element={<AuthRoute><InvoiceByMerchant /></AuthRoute>} />
            <Route path="/invoice" element={<AuthRoute><AllInvoices /></AuthRoute>} />
        </Routes>
    );
}

export default AppRouter;
