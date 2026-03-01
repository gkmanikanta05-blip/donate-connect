import { FiLogOut } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { useAppContext } from '../../hooks/useAppContext';

const TopNavbar = ({ title }) => {
  const { currentUser, logout } = useAppContext();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-300">{currentUser?.role}</p>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
