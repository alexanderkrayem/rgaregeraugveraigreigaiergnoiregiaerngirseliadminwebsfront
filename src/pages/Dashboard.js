import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { FileText, BookOpen, Users, TrendingUp } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';
const Dashboard = () => {
    const [stats, setStats] = useState({
        totalArticles: 0,
        totalResearch: 0,
        featuredArticles: 0,
        recentArticles: []
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In a real app, you'd have dedicated stats endpoints
                // For now, we'll simulate the data
                setStats({
                    totalArticles: 25,
                    totalResearch: 12,
                    featuredArticles: 5,
                    recentArticles: []
                });
            }
            catch (error) {
                console.error('Error fetching stats:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
    const statCards = [
        {
            title: 'إجمالي المقالات',
            value: stats.totalArticles,
            icon: FileText,
            color: 'bg-blue-500',
        },
        {
            title: 'الأبحاث العلمية',
            value: stats.totalResearch,
            icon: BookOpen,
            color: 'bg-green-500',
        },
        {
            title: 'المقالات المميزة',
            value: stats.featuredArticles,
            icon: TrendingUp,
            color: 'bg-yellow-500',
        },
        {
            title: 'المشرفون',
            value: 1,
            icon: Users,
            color: 'bg-purple-500',
        },
    ];
    if (loading) {
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "animate-pulse", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [...Array(4)].map((_, index) => (_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: [_jsx("div", { className: "h-4 bg-gray-300 rounded w-1/2 mb-4" }), _jsx("div", { className: "h-8 bg-gray-300 rounded w-1/3" })] }, index))) }) }) }));
    }
    return (_jsx(AdminLayout, { children: _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-8", children: "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (_jsx("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: stat.title }), _jsx("p", { className: "text-3xl font-bold text-gray-800", children: stat.value })] }), _jsx("div", { className: `p-3 rounded-full ${stat.color}`, children: _jsx(Icon, { size: 24, className: "text-white" }) })] }) }, index));
                    }) }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h2", { className: "text-xl font-bold text-gray-800 mb-4", children: "\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0633\u0631\u064A\u0639\u0629" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs("a", { href: "/articles/create", className: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx(FileText, { size: 20, className: "text-[#005CB9] ml-3" }), _jsx("span", { className: "font-medium", children: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0642\u0627\u0644 \u062C\u062F\u064A\u062F" })] }), _jsxs("a", { href: "/research/create", className: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx(BookOpen, { size: 20, className: "text-[#005CB9] ml-3" }), _jsx("span", { className: "font-medium", children: "\u0625\u0636\u0627\u0641\u0629 \u0628\u062D\u062B \u0639\u0644\u0645\u064A" })] }), _jsxs("a", { href: "/articles", className: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx(TrendingUp, { size: 20, className: "text-[#005CB9] ml-3" }), _jsx("span", { className: "font-medium", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062D\u062A\u0648\u0649" })] })] })] })] }) }));
};
export default Dashboard;
