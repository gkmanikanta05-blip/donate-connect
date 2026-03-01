import { FiClock, FiGift, FiTruck, FiCheckCircle } from 'react-icons/fi';
import StatCard from '../../components/common/StatCard';
import AddDonationForm from '../../components/donor/AddDonationForm';
import MyDonationsTable from '../../components/donor/MyDonationsTable';
import { useAppContext } from '../../hooks/useAppContext';

const DonorDashboard = () => {
  const { currentUser, donations } = useAppContext();
  const mine = donations.filter((item) => item.donorId === currentUser.id);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="My Donations" value={mine.length} icon={<FiGift />} tone="indigo" />
        <StatCard title="Pending" value={mine.filter((d) => d.status === 'Pending').length} icon={<FiClock />} tone="amber" />
        <StatCard title="In Transit" value={mine.filter((d) => d.status === 'In Transit').length} icon={<FiTruck />} tone="rose" />
        <StatCard title="Delivered" value={mine.filter((d) => d.status === 'Delivered').length} icon={<FiCheckCircle />} tone="emerald" />
      </div>
      <AddDonationForm />
      <MyDonationsTable donations={mine} />
    </div>
  );
};

export default DonorDashboard;
