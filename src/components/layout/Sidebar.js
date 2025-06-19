import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, BookOpen, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const isActive = (path) => {
        return location.pathname === path;
    };
    const handleLogout = async () => {
        try {
            await logout();
        }
        catch (error) {
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
    ];
    return (_jsxs("div", { className: "bg-white shadow-lg h-full flex flex-col", children: [_jsxs("div", { className: "p-6 border-b", children: [_jsx("h2", { className: "text-xl font-bold text-gray-800", children: "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u0637\u0628 \u0627\u0644\u0623\u0633\u0646\u0627\u0646 \u0627\u0644\u0639\u0631\u0628\u064A" })] }), _jsx("nav", { className: "flex-1 p-4", children: _jsx("ul", { className: "space-y-2", children: menuItems.map((item) => {
                        const Icon = item.icon;
                        return (_jsx("li", { children: _jsxs(Link, { to: item.path, className: `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                    ? 'bg-[#005CB9] text-white'
                                    : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(Icon, { size: 20, className: "ml-3" }), _jsx("span", { children: item.label })] }) }, item.path));
                    }) }) }), _jsx("div", { className: "p-4 border-t", children: _jsxs("button", { onClick: handleLogout, className: "flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors", children: [_jsx(LogOut, { size: 20, className: "ml-3" }), _jsx("span", { children: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C" })] }) })] }));
};
export default Sidebar;
