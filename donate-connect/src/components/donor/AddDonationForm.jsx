import { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

const AddDonationForm = () => {
  const { addDonation } = useAppContext();
  const [form, setForm] = useState({ title: '', category: 'Food', quantity: '', location: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.quantity || !form.location) return;
    addDonation({ ...form, quantity: Number(form.quantity) });
    setForm({ title: '', category: 'Food', quantity: '', location: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Add Donation</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Donation title"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
        <select
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        >
          <option>Food</option>
          <option>Medical</option>
          <option>Essentials</option>
          <option>Shelter</option>
        </select>
        <input
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
          placeholder="Quantity"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
        <input
          value={form.location}
          onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
          placeholder="Location"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
      </div>
      <button className="mt-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white">
        Submit Donation
      </button>
    </form>
  );
};

export default AddDonationForm;
