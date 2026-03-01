import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';

const LoginPage = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
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
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Use seeded accounts or register a new role.</p>
        <div className="mt-4 grid gap-3">
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
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white">
            Sign In
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">
          No account? <Link to="/register" className="font-semibold text-indigo-600">Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
