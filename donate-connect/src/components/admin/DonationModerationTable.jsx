import { useMemo, useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import SearchFilterBar from '../common/SearchFilterBar';
import EmptyState from '../common/EmptyState';

const DonationModerationTable = ({ donations, onStatusChange }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () =>
      donations.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' ? true : item.status === filter;
        return matchesSearch && matchesFilter;
      }),
    [donations, search, filter]
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Approve / Reject Donations</h3>
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        options={['All', 'Pending', 'Approved', 'Rejected', 'In Transit', 'Delivered']}
      />
      {filtered.length === 0 ? (
        <EmptyState title="No donations" text="No donation records match filters." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500 dark:text-slate-300">
                <th className="py-2">Donation</th>
                <th>Donor</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-2">{item.title}</td>
                  <td>{item.donorName}</td>
                  <td>{item.quantity}</td>
                  <td><StatusBadge status={item.status} /></td>
                  <td className="flex gap-2 py-2">
                    <button onClick={() => onStatusChange(item.id, 'Approved')} className="rounded bg-blue-600 px-2 py-1 text-xs text-white">Approve</button>
                    <button onClick={() => onStatusChange(item.id, 'Rejected')} className="rounded bg-rose-600 px-2 py-1 text-xs text-white">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationModerationTable;
