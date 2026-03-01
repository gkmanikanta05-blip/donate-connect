import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { ROLES } from '../../utils/constants';

const RegisterPage = () => {
  const { register } = useAppContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: ROLES.DONOR,
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(form);
    if (!result.success) {
      setError(result.message);
      return;
    }

    const target = {
      Admin: '/dashboard/admin',
      Donor: '/dashboard/donor',
      Recipient: '/dashboard/recipient',
      'Logistics Coordinator': '/dashboard/logistics',
    }[result.user.role];

    navigate(target);
  };

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold">Register</h1>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Full name"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Email"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Password"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="Phone"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
          <select
            value={form.role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 md:col-span-2"
          >
            <option>{ROLES.DONOR}</option>
            <option>{ROLES.RECIPIENT}</option>
            <option>{ROLES.LOGISTICS}</option>
            <option>{ROLES.ADMIN}</option>
          </select>
          {error && <p className="text-sm text-rose-600 md:col-span-2">{error}</p>}
          <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2">
            Create Account
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">
          Already have an account? <Link to="/login" className="font-semibold text-indigo-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
