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
import CustomerProfile from '../pages/CustomerProfile';
import EditCustomerProfile from '../pages/EditCustomerProfile';
import CustomerExpenses from '../pages/CustomerExpenses'
import AddExpense from '../pages/AddExpense';

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import MerchantLayout from "../layouts/MerchantLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import EditExpense from "../pages/EditExpense";
import MainPage from "../pages/MainPage";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            {/* Guest routes */}
            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <GuestRoute>
                        <Register />
                    </GuestRoute>
                }
            />

            {/* Admin routes */}
            <Route
                path="/admin/dashboard"
                element={
                    <AuthRoute>
                        <PrivateRoute role="admin">
                            <AdminLayout>
                                <AdminDashboard />
                            </AdminLayout>
                        </PrivateRoute>
                    </AuthRoute>
                }
            />

            {/* Merchant routes */}
            <Route
                path="/merchant/dashboard"
                element={
                    <AuthRoute>
                        <PrivateRoute role="merchant">
                            <MerchantLayout>
                                <MerchantDashboard />
                            </MerchantLayout>
                        </PrivateRoute>
                    </AuthRoute>
                }
            />

            {/* Customer routes */}
            <Route
                path="/customer/dashboard"
                element={
                    <AuthRoute>
                        <PrivateRoute role="customer">
                            <CustomerLayout>
                                <CustomerDashboard />
                            </CustomerLayout>
                        </PrivateRoute>
                    </AuthRoute>
                }
            />
            <Route
                path="/customer/profile/edit"
                element={
                    <AuthRoute>
                        <PrivateRoute role="customer">
                            <CustomerLayout>
                                <EditCustomerProfile/>
                            </CustomerLayout>
                        </PrivateRoute>
                    </AuthRoute>
                }
            />
            <Route
                path="/customer/profile"
                element={
                    <AuthRoute>
                        <PrivateRoute role="customer">
                            <CustomerLayout>
                                <CustomerProfile />
                            </CustomerLayout>
                        </PrivateRoute>
                    </AuthRoute>
                }
            />
            <Route
                path="/customer/expense"
                element={
                    <AuthRoute>
                        <PrivateRoute role="customer">
                            <CustomerLayout>
                                <CustomerExpenses/>
                            </CustomerLayout>
                        </PrivateRoute>
                    </AuthRoute>
                }
            />
            <Route
                path="/customer/addExpense"
                element={
                    <AuthRoute>
                        <PrivateRoute role="customer">
                            <CustomerLayout>
                                <AddExpense/>
                            </CustomerLayout>
                        </PrivateRoute>
                    </AuthRoute>
                }
            />
            <Route
                path="/customer/editExpense/:id"
                element={
                    <AuthRoute>
                        <PrivateRoute role="customer">
                            <CustomerLayout>
                                <EditExpense/>
                            </CustomerLayout>
                        </PrivateRoute>
                    </AuthRoute>
                }
            />

            <Route
                path="/invoice/customer"
                element={
                    <AuthRoute>
                        <PrivateRoute role="customer">
                            <CustomerLayout>
                                <InvoiceByCustomer />
                            </CustomerLayout>
                        </PrivateRoute>
                    </AuthRoute>
                }
            />

            {/* <Route path="/invoice/customer" element={<AuthRoute><InvoiceByCustomer /></AuthRoute>} /> */}
                                
            {/* Invoice routes (no layout) */}
            <Route path="/invoice/create" element={<AuthRoute><CreateInvoice /></AuthRoute>} />
            <Route path="/invoice/customer" element={<AuthRoute><InvoiceByCustomer /></AuthRoute>} />
            <Route path="/invoice/merchant" element={<AuthRoute><InvoiceByMerchant /></AuthRoute>} />
            <Route path="/invoice" element={<AuthRoute><AllInvoices /></AuthRoute>} />
        </Routes>
    );
}

export default AppRouter;
