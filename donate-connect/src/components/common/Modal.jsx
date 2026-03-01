import { motion } from 'framer-motion';

const Modal = ({ open, title, children, onClose, onConfirm, confirmText = 'Confirm' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">{children}</div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-2 text-sm dark:border-slate-700">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white"
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
