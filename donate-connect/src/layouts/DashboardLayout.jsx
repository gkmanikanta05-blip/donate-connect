import { Outlet } from 'react-router-dom';
import { FiHome, FiMapPin, FiPackage, FiUser } from 'react-icons/fi';
import Sidebar from '../components/common/Sidebar';
import TopNavbar from '../components/common/TopNavbar';
import { useAppContext } from '../hooks/useAppContext';
import { ROLES } from '../utils/constants';

const DashboardLayout = () => {
  const { currentUser } = useAppContext();

  const linksByRole = {
    [ROLES.ADMIN]: [
      { label: 'Dashboard', to: '/dashboard/admin', icon: <FiHome /> },
      { label: 'Donation Drives', to: '/donation-drives', icon: <FiPackage /> },
      { label: 'Profile', to: '/profile', icon: <FiUser /> },
    ],
    [ROLES.DONOR]: [
      { label: 'Dashboard', to: '/dashboard/donor', icon: <FiHome /> },
      { label: 'Donation Drives', to: '/donation-drives', icon: <FiPackage /> },
      { label: 'Profile', to: '/profile', icon: <FiUser /> },
    ],
    [ROLES.RECIPIENT]: [
      { label: 'Dashboard', to: '/dashboard/recipient', icon: <FiHome /> },
      { label: 'Requests', to: '/requests', icon: <FiMapPin /> },
      { label: 'Profile', to: '/profile', icon: <FiUser /> },
    ],
    [ROLES.LOGISTICS]: [
      { label: 'Dashboard', to: '/dashboard/logistics', icon: <FiHome /> },
      { label: 'Requests', to: '/requests', icon: <FiMapPin /> },
      { label: 'Profile', to: '/profile', icon: <FiUser /> },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 lg:flex">
      <Sidebar title="Donate Connect" links={linksByRole[currentUser.role]} />
      <div className="flex-1">
        <TopNavbar title={`${currentUser.role} Panel`} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
