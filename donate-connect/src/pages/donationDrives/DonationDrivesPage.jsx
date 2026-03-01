import { useMemo, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import DriveForm from '../../components/admin/DriveForm';
import EmptyState from '../../components/common/EmptyState';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import StatusBadge from '../../components/common/StatusBadge';

const DonationDrivesPage = () => {
  const { currentUser, drives, createDonationDrive } = useAppContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () =>
      drives.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' ? true : item.status === filter;
        return matchesSearch && matchesFilter;
      }),
    [drives, search, filter]
  );

  return (
    <div className="space-y-6">
      {currentUser.role === 'Admin' && <DriveForm onCreate={createDonationDrive} />}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-3 text-lg font-semibold">Donation Drives</h2>
        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          options={['All', 'Active']}
        />
        {filtered.length === 0 ? (
          <EmptyState title="No drives available" text="Create a drive to get started." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((drive) => (
              <article key={drive.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{drive.title}</h3>
                  <StatusBadge status={drive.status} />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{drive.description}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-violet-600"
                    style={{ width: `${Math.min((drive.collected / drive.goal) * 100, 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">
                  {drive.collected}/{drive.goal} collected • By {drive.createdBy}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationDrivesPage;
