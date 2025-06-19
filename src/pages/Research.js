import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Download, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../components/layout/AdminLayout';
import { api } from '../context/AuthContext';
const Research = () => {
    const [researches, setResearches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResearches, setFilteredResearches] = useState([]);
    useEffect(() => {
        fetchResearches();
    }, []);
    useEffect(() => {
        const filtered = researches.filter(research => research.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            research.journal.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredResearches(filtered);
    }, [researches, searchTerm]);
    const fetchResearches = async () => {
        try {
            setLoading(true);
            const response = await api.get('/research');
            const researchData = response.data.data || response.data || [];
            setResearches(researchData);
        }
        catch (error) {
            console.error('Error fetching researches:', error);
            toast.error('فشل في تحميل الأبحاث');
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        if (!confirm('هل أنت متأكد من حذف هذا البحث؟')) {
            return;
        }
        try {
            await api.delete(`/admin/research/${id}`);
            toast.success('تم حذف البحث بنجاح');
            fetchResearches();
        }
        catch (error) {
            console.error('Error deleting research:', error);
            toast.error('فشل في حذف البحث');
        }
    };
    if (loading) {
        return (_jsx(AdminLayout, { children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-300 rounded w-1/4 mb-6" }), _jsx("div", { className: "space-y-4", children: [...Array(5)].map((_, index) => (_jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm", children: [_jsx("div", { className: "h-4 bg-gray-300 rounded w-3/4 mb-2" }), _jsx("div", { className: "h-4 bg-gray-300 rounded w-1/2" })] }, index))) })] }) }));
    }
    return (_jsx(AdminLayout, { children: _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0628\u062D\u0627\u062B" }), _jsxs(Link, { to: "/research/create", className: "flex items-center bg-[#005CB9] hover:bg-[#0047A0] text-white px-4 py-2 rounded-md transition-colors", children: [_jsx(Plus, { size: 20, className: "ml-2" }), "\u0625\u0636\u0627\u0641\u0629 \u0628\u062D\u062B \u062C\u062F\u064A\u062F"] })] }), _jsx("div", { className: "bg-white p-4 rounded-lg shadow-sm mb-6", children: _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0623\u0628\u062D\u0627\u062B...", className: "w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005CB9]", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500", size: 20 })] }) }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0645\u062C\u0644\u0629" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0645\u0624\u0644\u0641\u0648\u0646" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0634\u0631" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredResearches.map((research) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsxs("td", { className: "px-6 py-4", children: [_jsx("div", { className: "text-sm font-medium text-gray-900", children: research.title }), _jsxs("div", { className: "text-sm text-gray-500", children: [research.abstract.substring(0, 100), "..."] })] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: research.journal }), _jsx("td", { className: "px-6 py-4 text-sm text-gray-900", children: research.authors.join('، ') }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(research.publication_date).toLocaleDateString('ar-SA') }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: _jsxs("div", { className: "flex space-x-2 space-x-reverse", children: [_jsx("a", { href: research.file_url, download: true, className: "text-green-600 hover:text-green-900", children: _jsx(Download, { size: 16 }) }), _jsx(Link, { to: `/research/edit/${research.id}`, className: "text-indigo-600 hover:text-indigo-900", children: _jsx(Edit, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(research.id), className: "text-red-600 hover:text-red-900", children: _jsx(Trash2, { size: 16 }) })] }) })] }, research.id))) })] }) }), filteredResearches.length === 0 && (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-gray-500", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0628\u062D\u0627\u062B \u0645\u062A\u0627\u062D\u0629" }) }))] })] }) }));
};
export default Research;
