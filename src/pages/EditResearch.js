import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import ResearchForm from '../components/forms/ResearchForm';
import { api } from '../context/AuthContext';
const EditResearch = () => {
    const { id } = useParams();
    const [research, setResearch] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchResearch = async () => {
            try {
                if (!id)
                    return;
                const response = await api.get(`/research/${id}`);
                setResearch(response.data);
            }
            catch (error) {
                console.error('Error fetching research:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchResearch();
    }, [id]);
    if (loading) {
        return (_jsx(AdminLayout, { children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-300 rounded w-1/4 mb-6" }), _jsx("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-4 bg-gray-300 rounded w-1/4" }), _jsx("div", { className: "h-10 bg-gray-300 rounded" }), _jsx("div", { className: "h-4 bg-gray-300 rounded w-1/4" }), _jsx("div", { className: "h-32 bg-gray-300 rounded" })] }) })] }) }));
    }
    if (!research) {
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-gray-500", children: "\u0627\u0644\u0628\u062D\u062B \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" }) }) }));
    }
    return (_jsx(AdminLayout, { children: _jsx(ResearchForm, { research: research, isEditing: true }) }));
};
export default EditResearch;
