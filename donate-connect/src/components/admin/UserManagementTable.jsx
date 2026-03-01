import { useMemo, useState } from 'react';
import SearchFilterBar from '../common/SearchFilterBar';
import EmptyState from '../common/EmptyState';

const UserManagementTable = ({ users, onRemove }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () =>
      users.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' ? true : item.role === filter;
        return matchesSearch && matchesFilter;
      }),
    [users, search, filter]
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Manage Users</h3>
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        options={['All', 'Admin', 'Donor', 'Recipient', 'Logistics Coordinator']}
      />
      {filtered.length === 0 ? (
        <EmptyState title="No users found" text="No user matches your filter." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500 dark:text-slate-300">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-2">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => onRemove(user.id)} className="rounded-lg bg-rose-600 px-2 py-1 text-xs font-semibold text-white">
                      Remove
                    </button>
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

export default UserManagementTable;
