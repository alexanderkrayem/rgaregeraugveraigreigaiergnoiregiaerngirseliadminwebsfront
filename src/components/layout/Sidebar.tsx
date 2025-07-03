import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Users,
  Plus, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'لوحة التحكم',
      path: '/',
    },
    {
      icon: FileText,
      label: 'المقالات',
      path: '/articles',
    },
    {
      icon: Plus,
      label: 'إضافة مقال',
      path: '/articles/create',
    },
    {
      icon: BookOpen,
      label: 'الأبحاث',
      path: '/research',
    },
    {
      icon: Plus,
      label: 'إضافة بحث',
      path: '/research/create',
    },
    {
      icon: Users,
      label: 'المؤلفون',
      path: '/authors',
    },
    {
      icon: Plus,
      label: 'إضافة مؤلف',
      path: '/authors/create',
    },
  ];

  return (
    <div className="bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">لوحة التحكم</h2>
        <p className="text-sm text-gray-600">طب الأسنان العربي</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-[#005CB9] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} className="ml-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut size={20} className="ml-3" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;