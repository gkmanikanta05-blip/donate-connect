const StatusBadge = ({ status }) => {
  const classes = {
    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    Approved: 'bg-blue-100 text-blue-700 border-blue-200',
    'In Transit': 'bg-violet-100 text-violet-700 border-violet-200',
    Delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Rejected: 'bg-rose-100 text-rose-700 border-rose-200',
    Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${classes[status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
