import React, { useState, useEffect } from 'react';
import { FileText, BookOpen, Users, TrendingUp } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';
import { api } from '../context/AuthContext';

const Dashboard: React.FC = () => {
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
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
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
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">لوحة التحكم</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/articles/create"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText size={20} className="text-[#005CB9] ml-3" />
              <span className="font-medium">إضافة مقال جديد</span>
            </a>
            <a
              href="/research/create"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BookOpen size={20} className="text-[#005CB9] ml-3" />
              <span className="font-medium">إضافة بحث علمي</span>
            </a>
            <a
              href="/articles"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <TrendingUp size={20} className="text-[#005CB9] ml-3" />
              <span className="font-medium">إدارة المحتوى</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;