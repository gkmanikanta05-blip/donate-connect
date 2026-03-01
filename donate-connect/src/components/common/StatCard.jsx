import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, tone = 'indigo' }) => {
  const toneMap = {
    indigo: 'from-indigo-500 to-blue-500',
    emerald: 'from-emerald-500 to-teal-500',
    amber: 'from-amber-500 to-orange-500',
    rose: 'from-rose-500 to-pink-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-300">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`rounded-xl bg-gradient-to-r p-3 text-xl text-white ${toneMap[tone] || toneMap.indigo}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
