import { FiAlertCircle, FiCheckCircle, FiClock, FiList } from 'react-icons/fi';
import StatCard from '../../components/common/StatCard';
import RequestEssentialsForm from '../../components/recipient/RequestEssentialsForm';
import RecipientRequestsTable from '../../components/recipient/RecipientRequestsTable';
import { useAppContext } from '../../hooks/useAppContext';

const RecipientDashboard = () => {
  const { currentUser, requests } = useAppContext();
  const mine = requests.filter((item) => item.recipientId === currentUser.id);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="My Requests" value={mine.length} icon={<FiList />} tone="indigo" />
        <StatCard title="High Urgency" value={mine.filter((r) => r.urgency === 'High').length} icon={<FiAlertCircle />} tone="rose" />
        <StatCard title="Pending" value={mine.filter((r) => r.status === 'Pending').length} icon={<FiClock />} tone="amber" />
        <StatCard title="Delivered" value={mine.filter((r) => r.status === 'Delivered').length} icon={<FiCheckCircle />} tone="emerald" />
      </div>
      <RequestEssentialsForm />
      <RecipientRequestsTable requests={mine} />
    </div>
  );
};

export default RecipientDashboard;
