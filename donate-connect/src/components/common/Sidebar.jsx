import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = ({ links, title }) => {
  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:w-64 lg:border-b-0 lg:border-r">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h2>
      </motion.div>
      <nav className="grid gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
