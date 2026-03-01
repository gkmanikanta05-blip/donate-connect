import { FiSearch } from 'react-icons/fi';

const SearchFilterBar = ({ search, setSearch, filter, setFilter, options }) => (
  <div className="mb-4 flex flex-col gap-3 md:flex-row">
    <div className="relative flex-1">
      <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm outline-none ring-indigo-300 focus:ring dark:border-slate-700 dark:bg-slate-900"
      />
    </div>
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-300 focus:ring dark:border-slate-700 dark:bg-slate-900"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SearchFilterBar;
