import { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

const RequestEssentialsForm = () => {
  const { addRequest } = useAppContext();
  const [form, setForm] = useState({ item: '', quantity: '', urgency: 'High', location: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.item || !form.quantity || !form.location) return;
    addRequest({ ...form, quantity: Number(form.quantity) });
    setForm({ item: '', quantity: '', urgency: 'High', location: '' });
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Request Essentials</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          value={form.item}
          onChange={(e) => setForm((prev) => ({ ...prev, item: e.target.value }))}
          placeholder="Item needed"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
        <input
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
          placeholder="Quantity"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
        <select
          value={form.urgency}
          onChange={(e) => setForm((prev) => ({ ...prev, urgency: e.target.value }))}
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input
          value={form.location}
          onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
          placeholder="Location"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
      </div>
      <button className="mt-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white">
        Submit Request
      </button>
    </form>
  );
};

export default RequestEssentialsForm;
