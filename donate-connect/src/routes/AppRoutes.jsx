import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import AdminDashboard from '../pages/dashboards/AdminDashboard';
import DonorDashboard from '../pages/dashboards/DonorDashboard';
import RecipientDashboard from '../pages/dashboards/RecipientDashboard';
import LogisticsDashboard from '../pages/dashboards/LogisticsDashboard';
import DonationDrivesPage from '../pages/donationDrives/DonationDrivesPage';
import RequestsPage from '../pages/requests/RequestsPage';
import ProfilePage from '../pages/profile/ProfilePage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route path="/donation-drives" element={<DonationDrivesPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={[ROLES.DONOR]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard/donor" element={<DonorDashboard />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={[ROLES.RECIPIENT]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard/recipient" element={<RecipientDashboard />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={[ROLES.LOGISTICS]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard/logistics" element={<LogisticsDashboard />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
