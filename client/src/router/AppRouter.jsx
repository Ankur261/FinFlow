import AdminDashBoard from '../pages/AdminDashboard'
import MerchantDashBoard from '../pages/MerchantDashboard'
import { BrowserRouter, Routes, Route } from "react-router";

function AppRouter() {
    return (

        <Routes>
            <Route index element={< AdminDashBoard />} />
            <Route path="/merchantdashboard" element={< MerchantDashBoard />} />
            <Route path="/customerdashboard" element={< MerchantDashBoard />} />
        </Routes>
    )
}

export default AppRouter