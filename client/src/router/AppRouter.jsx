import AdminDashBoard from '../pages/AdminDashboard'
import CustomerDashBoard from '../pages/CustomerDashboard';
import MerchantDashBoard from '../pages/MerchantDashboard'
import InvoiceByCustomer from '../pages/InvoiceByCustomer';
import CreateInvoice from '../pages/CreateInvoice';
import InvoiceByMerchant  from '../pages/InvoiceByMerchant';
import AllInvoices from '../pages/AllInvoices';
import { BrowserRouter, Routes, Route } from "react-router";
function AppRouter() {
    return (

        <Routes>
            <Route index element={< AdminDashBoard />} />
            <Route path="/merchantdashboard" element={< MerchantDashBoard />} />
            <Route path="/customerdashboard" element={< MerchantDashBoard />} />
       
            <Route path="/invoice/create" element={<CreateInvoice />} />
       
            <Route path="/invoice/customer" element={<InvoiceByCustomer />} />
            <Route path="/invoice/merchant" element={<InvoiceByMerchant />} />
            <Route path="/invoice" element={<AllInvoices />} />
            <Route path="/customerdashboard" element={< CustomerDashBoard/>} />

        </Routes>
    )
}

export default AppRouter