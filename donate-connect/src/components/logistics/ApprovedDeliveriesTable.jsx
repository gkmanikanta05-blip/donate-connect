import { useMemo, useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import SearchFilterBar from '../common/SearchFilterBar';
import EmptyState from '../common/EmptyState';

const ApprovedDeliveriesTable = ({ donations, onUpdate }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const dataset = donations.filter((item) => ['Approved', 'In Transit'].includes(item.status));

  const filtered = useMemo(
    () =>
      dataset.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' ? true : item.status === filter;
        return matchesSearch && matchesFilter;
      }),
    [dataset, search, filter]
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Approved Deliveries</h3>
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        options={['All', 'Approved', 'In Transit']}
      />
      {filtered.length === 0 ? (
        <EmptyState title="No deliveries" text="No approved deliveries available." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500 dark:text-slate-300">
                <th className="py-2">Donation</th>
                <th>Location</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-2">{item.title}</td>
                  <td>{item.location}</td>
                  <td><StatusBadge status={item.status} /></td>
                  <td className="flex gap-2 py-2">
                    <button onClick={() => onUpdate(item.id, 'In Transit')} className="rounded bg-violet-600 px-2 py-1 text-xs text-white">In Transit</button>
                    <button onClick={() => onUpdate(item.id, 'Delivered')} className="rounded bg-emerald-600 px-2 py-1 text-xs text-white">Delivered</button>
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

export default ApprovedDeliveriesTable;
