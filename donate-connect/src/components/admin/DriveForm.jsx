import { useState } from 'react';

const DriveForm = ({ onCreate }) => {
  const [form, setForm] = useState({ title: '', description: '', goal: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.goal) return;
    onCreate({ ...form, goal: Number(form.goal) });
    setForm({ title: '', description: '', goal: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Create Emergency Donation Drive</h3>
      <div className="grid gap-3">
        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Drive title"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Drive description"
          rows="3"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
        <input
          type="number"
          min="1"
          value={form.goal}
          onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value }))}
          placeholder="Target quantity"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
      </div>
      <button className="mt-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white">
        Create Drive
      </button>
    </form>
  );
};

export default DriveForm;
