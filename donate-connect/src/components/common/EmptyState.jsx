import illustration from '../../assets/empty-state.svg';

const EmptyState = ({ title, text }) => (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
    <img src={illustration} alt="Empty state" className="mx-auto mb-3 w-40" />
    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
    <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{text}</p>
  </div>
);

export default EmptyState;
