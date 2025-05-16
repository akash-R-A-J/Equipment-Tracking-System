import { Routes, Route } from "react-router-dom";
import { LandingPage3 } from "../pages/LandingPage3";
import { LoginPage } from "../pages/LoginPage";
import { UserSignup } from "../pages/UserSignup";
import { ManufacturerSignup } from "../pages/ManufacturerSignup";
import { UserDashboard } from "../pages/UserDashboard";
import { ManufacturerDashboard } from "../pages/ManufacturerDashboard";
import { EquipmentPage3 } from "../pages/EquipmentPage";
import { ProfilePage4 } from "../pages/ProfilePage4";
import { EquipmentHistory2 } from "../pages/EquipmentHistory2";
import { EquipmentDetails2 } from "../pages/EquipmentDetails2";
import { AddEquipmentForm2 } from "../pages/AddEquipment2";
import { NotFound } from "../pages/NotFoundPage";
import { TransferRequests } from "../components/TransferRequests";
import { PendingTransfers } from "../components/PendingTransfers";
import { RecentOrders } from "../components/RecentOrders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage3 />} />
      <Route path="/user-signup" element={<UserSignup />} />
      <Route path="/manufacturer-signup" element={<ManufacturerSignup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/add-equipment" element={<AddEquipmentForm2 />} />

      <Route path="/user-dashboard" element={<UserDashboard />}>
        <Route path="" element={<RecentOrders />} />
        <Route path="transfer-requests" element={<TransferRequests />} />
        <Route path="pending-requests" element={<PendingTransfers />} />
      </Route>

      <Route path="/manufacturer-dashboard" element={<ManufacturerDashboard />}>
        <Route path="" element={<RecentOrders />} />
        <Route path="transfer-requests" element={<TransferRequests />} />
        <Route path="pending-requests" element={<PendingTransfers />} />
      </Route>

      <Route path="/my-equipment" element={<EquipmentPage3 />} />
      <Route path="/equipment-detail" element={<EquipmentDetails2 />} />
      <Route path="/equipment-history" element={<EquipmentHistory2 />} />
      <Route path="/profile" element={<ProfilePage4 />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
