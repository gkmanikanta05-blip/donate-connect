import { useMemo } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import StatusBadge from '../../components/common/StatusBadge';

const ProfilePage = () => {
  const { currentUser, donations, requests } = useAppContext();

  const stats = useMemo(() => {
    const myDonations = donations.filter((item) => item.donorId === currentUser.id);
    const myRequests = requests.filter((item) => item.recipientId === currentUser.id);
    return {
      donations: myDonations.length,
      requests: myRequests.length,
      completed: [...myDonations, ...myRequests].filter((item) => item.status === 'Delivered').length,
    };
  }, [currentUser.id, donations, requests]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 lg:col-span-1">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{currentUser.name}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{currentUser.email}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{currentUser.phone || 'N/A'}</p>
        <div className="mt-3">
          <StatusBadge status={currentUser.role === 'Admin' ? 'Active' : 'Approved'} />
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
        <h3 className="mb-4 text-lg font-semibold">Activity Summary</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <p className="text-xs text-slate-500">My Donations</p>
            <p className="text-2xl font-bold">{stats.donations}</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <p className="text-xs text-slate-500">My Requests</p>
            <p className="text-2xl font-bold">{stats.requests}</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <p className="text-xs text-slate-500">Completed</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
