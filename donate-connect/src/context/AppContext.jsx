import { createContext, useEffect, useMemo, useState } from 'react';
import usersSeed from '../data/users.json';
import donationsSeed from '../data/donations.json';
import requestsSeed from '../data/requests.json';
import drivesSeed from '../data/drives.json';
import inventorySeed from '../data/inventory.json';

export const AppContext = createContext(null);

const STORAGE_KEYS = {
  user: 'dc_user',
  theme: 'dc_theme',
  users: 'dc_users',
  donations: 'dc_donations',
  requests: 'dc_requests',
  drives: 'dc_drives',
  inventory: 'dc_inventory',
};

const readStorage = (key, fallback) => {
  const item = localStorage.getItem(key);
  if (!item) return fallback;
  try {
    return JSON.parse(item);
  } catch {
    return fallback;
  }
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => readStorage(STORAGE_KEYS.user, null));
  const [theme, setTheme] = useState(() => readStorage(STORAGE_KEYS.theme, 'light'));
  const [users, setUsers] = useState(() => readStorage(STORAGE_KEYS.users, usersSeed));
  const [donations, setDonations] = useState(() => readStorage(STORAGE_KEYS.donations, donationsSeed));
  const [requests, setRequests] = useState(() => readStorage(STORAGE_KEYS.requests, requestsSeed));
  const [drives, setDrives] = useState(() => readStorage(STORAGE_KEYS.drives, drivesSeed));
  const [inventory, setInventory] = useState(() => readStorage(STORAGE_KEYS.inventory, inventorySeed));
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(theme));
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.donations, JSON.stringify(donations)), [donations]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.requests, JSON.stringify(requests)), [requests]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.drives, JSON.stringify(drives)), [drives]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.inventory, JSON.stringify(inventory)), [inventory]);

  const addToast = (message, type = 'success') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3000);
  };

  const login = (email, password) => {
    const user = users.find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password
    );
    if (!user) return { success: false, message: 'Invalid credentials' };
    setCurrentUser(user);
    addToast(`Welcome back, ${user.name}`);
    return { success: true, user };
  };

  const register = (payload) => {
    const exists = users.some((entry) => entry.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) return { success: false, message: 'Email already exists' };

    const newUser = {
      ...payload,
      id: crypto.randomUUID(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast('Registration successful');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('Logged out', 'info');
  };

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const addDonation = (payload) => {
    const donation = {
      id: crypto.randomUUID(),
      ...payload,
      donorId: currentUser.id,
      donorName: currentUser.name,
      status: 'Pending',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setDonations((prev) => [donation, ...prev]);
    addToast('Donation submitted');
  };

  const updateDonationStatus = (id, status) => {
    setDonations((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    addToast(`Donation marked as ${status}`);
  };

  const addRequest = (payload) => {
    const request = {
      id: crypto.randomUUID(),
      ...payload,
      recipientId: currentUser.id,
      recipientName: currentUser.name,
      status: 'Pending',
      feedback: '',
    };
    setRequests((prev) => [request, ...prev]);
    addToast('Request submitted');
  };

  const updateRequestStatus = (id, status) => {
    setRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    addToast(`Request marked as ${status}`);
  };

  const submitFeedback = (id, feedback) => {
    setRequests((prev) => prev.map((item) => (item.id === id ? { ...item, feedback } : item)));
    addToast('Feedback submitted');
  };

  const createDonationDrive = (payload) => {
    const drive = {
      id: crypto.randomUUID(),
      ...payload,
      collected: 0,
      status: 'Active',
      createdBy: currentUser.name,
    };
    setDrives((prev) => [drive, ...prev]);
    addToast('Donation drive created');
  };

  const removeUser = (id) => {
    setUsers((prev) => prev.filter((item) => item.id !== id));
    addToast('User removed', 'warning');
  };

  const value = useMemo(
    () => ({
      currentUser,
      users,
      donations,
      requests,
      drives,
      inventory,
      toasts,
      theme,
      login,
      register,
      logout,
      toggleTheme,
      addDonation,
      updateDonationStatus,
      addRequest,
      updateRequestStatus,
      submitFeedback,
      createDonationDrive,
      removeUser,
      setInventory,
      addToast,
    }),
    [currentUser, users, donations, requests, drives, inventory, toasts, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
