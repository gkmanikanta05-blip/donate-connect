const Loader = ({ text = 'Loading...' }) => (
  <div className="grid place-items-center py-12">
    <div className="flex items-center gap-3">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      <p className="text-sm text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  </div>
);

export default Loader;
