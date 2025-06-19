import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import RichTextEditor from '../editor/RichTextEditor';
import { api } from '../../context/AuthContext';
const ResearchForm = ({ research, isEditing = false }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        abstract: '',
        journal: '',
        publication_date: '',
        authors: [],
    });
    const [researchFile, setResearchFile] = useState(null);
    const [authorInput, setAuthorInput] = useState('');
    useEffect(() => {
        if (research && isEditing) {
            setFormData({
                title: research.title || '',
                abstract: research.abstract || '',
                journal: research.journal || '',
                publication_date: research.publication_date ? research.publication_date.split('T')[0] : '',
                authors: research.authors || [],
            });
        }
    }, [research, isEditing]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleAbstractChange = (abstract) => {
        setFormData(prev => ({ ...prev, abstract }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setResearchFile(file);
        }
    };
    const addAuthor = () => {
        if (authorInput.trim() && !formData.authors.includes(authorInput.trim())) {
            setFormData(prev => ({
                ...prev,
                authors: [...prev.authors, authorInput.trim()]
            }));
            setAuthorInput('');
        }
    };
    const removeAuthor = (authorToRemove) => {
        setFormData(prev => ({
            ...prev,
            authors: prev.authors.filter(author => author !== authorToRemove)
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.abstract || !formData.journal || !formData.publication_date) {
            toast.error('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        if (formData.authors.length === 0) {
            toast.error('يرجى إضافة مؤلف واحد على الأقل');
            return;
        }
        if (!researchFile && !isEditing) {
            toast.error('يرجى اختيار ملف البحث');
            return;
        }
        try {
            setLoading(true);
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('abstract', formData.abstract);
            submitData.append('journal', formData.journal);
            submitData.append('publication_date', formData.publication_date);
            submitData.append('authors', JSON.stringify(formData.authors));
            if (researchFile) {
                submitData.append('research_file', researchFile);
            }
            let response;
            if (isEditing && research) {
                response = await api.put(`/admin/research/${research.id}`, submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            else {
                response = await api.post('/admin/research', submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            toast.success(isEditing ? 'تم تحديث البحث بنجاح' : 'تم إنشاء البحث بنجاح');
            navigate('/research');
        }
        catch (error) {
            console.error('Error saving research:', error);
            const errorMessage = error.response?.data?.error || 'حدث خطأ أثناء حفظ البحث';
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm", children: [_jsx("div", { className: "p-6 border-b", children: _jsx("h1", { className: "text-2xl font-bold text-gray-800", children: isEditing ? 'تعديل البحث' : 'إضافة بحث جديد' }) }), _jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u062D\u062B *" }), _jsx("input", { type: "text", name: "title", value: formData.title, onChange: handleInputChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]", placeholder: "\u0623\u062F\u062E\u0644 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u062D\u062B", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0627\u0644\u0645\u062C\u0644\u0629 \u0627\u0644\u0639\u0644\u0645\u064A\u0629 *" }), _jsx("input", { type: "text", name: "journal", value: formData.journal, onChange: handleInputChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]", placeholder: "\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u062C\u0644\u0629 \u0627\u0644\u0639\u0644\u0645\u064A\u0629", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0634\u0631 *" }), _jsx("input", { type: "date", name: "publication_date", value: formData.publication_date, onChange: handleInputChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0645\u0644\u062E\u0635 \u0627\u0644\u0628\u062D\u062B *" }), _jsx(RichTextEditor, { value: formData.abstract, onChange: handleAbstractChange, height: "300px", placeholder: "\u0623\u062F\u062E\u0644 \u0645\u0644\u062E\u0635 \u0627\u0644\u0628\u062D\u062B" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0627\u0644\u0645\u0624\u0644\u0641\u0648\u0646 *" }), _jsxs("div", { className: "flex space-x-2 space-x-reverse mb-2", children: [_jsx("input", { type: "text", value: authorInput, onChange: (e) => setAuthorInput(e.target.value), onKeyPress: (e) => e.key === 'Enter' && (e.preventDefault(), addAuthor()), className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]", placeholder: "\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0624\u0644\u0641 \u0648\u0627\u0636\u063A\u0637 Enter" }), _jsx("button", { type: "button", onClick: addAuthor, className: "px-4 py-2 bg-[#005CB9] text-white rounded-md hover:bg-[#0047A0] transition-colors", children: "\u0625\u0636\u0627\u0641\u0629" })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: formData.authors.map((author, index) => (_jsxs("span", { className: "inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm", children: [author, _jsx("button", { type: "button", onClick: () => removeAuthor(author), className: "mr-2 text-blue-600 hover:text-blue-800", children: _jsx(X, { size: 14 }) })] }, index))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["\u0645\u0644\u0641 \u0627\u0644\u0628\u062D\u062B ", !isEditing && '*'] }), _jsx("input", { type: "file", accept: ".pdf,.doc,.docx", onChange: handleFileChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "\u064A\u064F\u0642\u0628\u0644 \u0645\u0644\u0641\u0627\u062A PDF, DOC, DOCX \u0641\u0642\u0637 (\u062D\u062F \u0623\u0642\u0635\u0649 5 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A)" })] }), _jsxs("div", { className: "flex justify-end space-x-4 space-x-reverse pt-6 border-t", children: [_jsx("button", { type: "button", onClick: () => navigate('/research'), className: "px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors", children: "\u0625\u0644\u063A\u0627\u0621" }), _jsxs("button", { type: "submit", disabled: loading, className: "flex items-center px-6 py-2 bg-[#005CB9] text-white rounded-md hover:bg-[#0047A0] transition-colors disabled:opacity-50", children: [_jsx(Save, { size: 16, className: "ml-2" }), loading ? 'جاري الحفظ...' : (isEditing ? 'تحديث' : 'حفظ')] })] })] })] }));
};
export default ResearchForm;
