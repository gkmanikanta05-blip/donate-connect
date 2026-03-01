import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart, FiPackage, FiTruck, FiUsers } from 'react-icons/fi';
import ThemeToggle from '../components/common/ThemeToggle';
import { useAppContext } from '../hooks/useAppContext';

const HomePage = () => {
  const { currentUser } = useAppContext();

  const dashboardRoute = {
    Admin: '/dashboard/admin',
    Donor: '/dashboard/donor',
    Recipient: '/dashboard/recipient',
    'Logistics Coordinator': '/dashboard/logistics',
  };

  return (
    <div className="min-h-screen">
      <section className="hero-bg relative overflow-hidden px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex justify-end">
            <ThemeToggle />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl"
          >
            Donate Connect: Coordinated Relief for Every Community
          </motion.h1>
          <p className="mt-5 max-w-2xl text-slate-100">
            Connect donors, recipients, administrators, and logistics teams through one emergency-ready platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {currentUser ? (
              <Link
                to={dashboardRoute[currentUser.role]}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700"
              >
                Open Dashboard <FiArrowRight />
              </Link>
            ) : (
              <>
                <Link to="/login" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700">Login</Link>
                <Link to="/register" className="rounded-xl border border-white/70 px-5 py-3 text-sm font-semibold">Register</Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 py-12 md:grid-cols-4">
        {[
          { title: 'Donors', icon: <FiHeart className="text-2xl text-rose-500" />, text: 'Submit and track donations live.' },
          { title: 'Recipients', icon: <FiUsers className="text-2xl text-blue-500" />, text: 'Request essentials with urgency levels.' },
          { title: 'Admin', icon: <FiPackage className="text-2xl text-indigo-500" />, text: 'Manage users, drives, and analytics.' },
          { title: 'Logistics', icon: <FiTruck className="text-2xl text-emerald-500" />, text: 'Coordinate and update delivery status.' },
        ].map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
          >
            {card.icon}
            <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{card.text}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
