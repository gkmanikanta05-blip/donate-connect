import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '../../hooks/useAppContext';

const iconByType = {
  success: <FiCheckCircle className="text-emerald-500" />,
  warning: <FiAlertCircle className="text-amber-500" />,
  info: <FiInfo className="text-blue-500" />,
};

const ToastContainer = () => {
  const { toasts } = useAppContext();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[60] grid gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto flex min-w-60 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-900"
          >
            {iconByType[toast.type] || iconByType.success}
            <span className="text-sm text-slate-700 dark:text-slate-200">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
