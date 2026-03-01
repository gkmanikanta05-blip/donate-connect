import { FiBox, FiCheckCircle, FiTruck, FiTrendingUp } from 'react-icons/fi';
import StatCard from '../../components/common/StatCard';
import ApprovedDeliveriesTable from '../../components/logistics/ApprovedDeliveriesTable';
import InventoryList from '../../components/logistics/InventoryList';
import { useAppContext } from '../../hooks/useAppContext';

const LogisticsDashboard = () => {
  const { donations, inventory, updateDonationStatus } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Approved" value={donations.filter((d) => d.status === 'Approved').length} icon={<FiTrendingUp />} tone="indigo" />
        <StatCard title="In Transit" value={donations.filter((d) => d.status === 'In Transit').length} icon={<FiTruck />} tone="amber" />
        <StatCard title="Delivered" value={donations.filter((d) => d.status === 'Delivered').length} icon={<FiCheckCircle />} tone="emerald" />
        <StatCard title="Inventory Items" value={inventory.length} icon={<FiBox />} tone="rose" />
      </div>
      <ApprovedDeliveriesTable donations={donations} onUpdate={updateDonationStatus} />
      <InventoryList inventory={inventory} />
    </div>
  );
};

export default LogisticsDashboard;
