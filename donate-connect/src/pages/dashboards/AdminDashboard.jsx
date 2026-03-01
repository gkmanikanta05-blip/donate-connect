import { useEffect, useState } from 'react';
import { FiActivity, FiDatabase, FiTruck, FiUsers } from 'react-icons/fi';
import StatCard from '../../components/common/StatCard';
import UserManagementTable from '../../components/admin/UserManagementTable';
import DonationModerationTable from '../../components/admin/DonationModerationTable';
import AnalyticsCharts from '../../components/admin/AnalyticsCharts';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import { useAppContext } from '../../hooks/useAppContext';

const AdminDashboard = () => {
  const { users, donations, requests, removeUser, updateDonationStatus } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [removeId, setRemoveId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader text="Preparing admin analytics..." />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Users" value={users.length} icon={<FiUsers />} tone="indigo" />
        <StatCard title="Donations" value={donations.length} icon={<FiDatabase />} tone="emerald" />
        <StatCard title="Requests" value={requests.length} icon={<FiActivity />} tone="amber" />
        <StatCard title="In Transit" value={donations.filter((d) => d.status === 'In Transit').length} icon={<FiTruck />} tone="rose" />
      </div>
      <AnalyticsCharts donations={donations} requests={requests} />
      <DonationModerationTable donations={donations} onStatusChange={updateDonationStatus} />
      <UserManagementTable users={users} onRemove={setRemoveId} />

      <Modal
        open={Boolean(removeId)}
        title="Remove user"
        onClose={() => setRemoveId(null)}
        onConfirm={() => {
          removeUser(removeId);
          setRemoveId(null);
        }}
      >
        This action removes the selected user from the mock dataset.
      </Modal>
    </div>
  );
};

export default AdminDashboard;
