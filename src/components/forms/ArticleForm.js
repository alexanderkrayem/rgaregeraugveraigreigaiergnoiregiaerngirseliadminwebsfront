import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Upload, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import RichTextEditor from '../editor/RichTextEditor';
import { api } from '../../context/AuthContext';
const ArticleForm = ({ article, isEditing = false }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        tags: [],
        is_featured: false,
        cover_image_url: '',
    });
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [tagInput, setTagInput] = useState('');
    const [useImageUrl, setUseImageUrl] = useState(false);
    useEffect(() => {
        if (article && isEditing) {
            setFormData({
                title: article.title || '',
                excerpt: article.excerpt || '',
                content: article.content || '',
                author: article.author || '',
                tags: article.tags || [],
                is_featured: article.is_featured || false,
                cover_image_url: article.cover_image || '',
            });
            setUseImageUrl(article.cover_image && !article.cover_image.startsWith('/uploads/'));
        }
    }, [article, isEditing]);
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? e.target.checked : value
        }));
    };
    const handleContentChange = (content) => {
        setFormData(prev => ({ ...prev, content }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImageFile(file);
        }
    };
    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };
    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
            toast.error('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        if (formData.tags.length === 0) {
            toast.error('يرجى إضافة علامة واحدة على الأقل');
            return;
        }
        if (!useImageUrl && !coverImageFile && !isEditing) {
            toast.error('يرجى اختيار صورة الغلاف');
            return;
        }
        if (useImageUrl && !formData.cover_image_url) {
            toast.error('يرجى إدخال رابط صورة الغلاف');
            return;
        }
        try {
            setLoading(true);
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('excerpt', formData.excerpt);
            submitData.append('content', formData.content);
            submitData.append('author', formData.author);
            submitData.append('tags', JSON.stringify(formData.tags));
            submitData.append('is_featured', formData.is_featured.toString());
            if (useImageUrl) {
                submitData.append('cover_image_url', formData.cover_image_url);
            }
            else if (coverImageFile) {
                submitData.append('cover_image', coverImageFile);
            }
            let response;
            if (isEditing && article) {
                response = await api.put(`/admin/articles/${article.id}`, submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            else {
                response = await api.post('/admin/articles', submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            toast.success(isEditing ? 'تم تحديث المقال بنجاح' : 'تم إنشاء المقال بنجاح');
            navigate('/articles');
        }
        catch (error) {
            console.error('Error saving article:', error);
            const errorMessage = error.response?.data?.error || 'حدث خطأ أثناء حفظ المقال';
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm", children: [_jsx("div", { className: "p-6 border-b", children: _jsx("h1", { className: "text-2xl font-bold text-gray-800", children: isEditing ? 'تعديل المقال' : 'إضافة مقال جديد' }) }), _jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0642\u0627\u0644 *" }), _jsx("input", { type: "text", name: "title", value: formData.title, onChange: handleInputChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]", placeholder: "\u0623\u062F\u062E\u0644 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0642\u0627\u0644", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0627\u0644\u0645\u0624\u0644\u0641 *" }), _jsx("input", { type: "text", name: "author", value: formData.author, onChange: handleInputChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]", placeholder: "\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0624\u0644\u0641", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0627\u0644\u0645\u0642\u062F\u0645\u0629 *" }), _jsx("textarea", { name: "excerpt", value: formData.excerpt, onChange: handleInputChange, rows: 3, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]", placeholder: "\u0623\u062F\u062E\u0644 \u0645\u0642\u062F\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0644", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0642\u0627\u0644 *" }), _jsx(RichTextEditor, { value: formData.content, onChange: handleContentChange, height: "400px" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0635\u0648\u0631\u0629 \u0627\u0644\u063A\u0644\u0627\u0641 *" }), _jsxs("div", { className: "flex items-center space-x-4 space-x-reverse mb-4", children: [_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "radio", checked: !useImageUrl, onChange: () => setUseImageUrl(false), className: "ml-2" }), _jsx(Upload, { size: 16, className: "ml-1" }), "\u0631\u0641\u0639 \u0645\u0644\u0641"] }), _jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "radio", checked: useImageUrl, onChange: () => setUseImageUrl(true), className: "ml-2" }), _jsx(LinkIcon, { size: 16, className: "ml-1" }), "\u0631\u0627\u0628\u0637 \u0635\u0648\u0631\u0629"] })] }), useImageUrl ? (_jsx("input", { type: "url", name: "cover_image_url", value: formData.cover_image_url, onChange: handleInputChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]", placeholder: "\u0623\u062F\u062E\u0644 \u0631\u0627\u0628\u0637 \u0627\u0644\u0635\u0648\u0631\u0629" })) : (_jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]" }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A *" }), _jsxs("div", { className: "flex space-x-2 space-x-reverse mb-2", children: [_jsx("input", { type: "text", value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyPress: (e) => e.key === 'Enter' && (e.preventDefault(), addTag()), className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]", placeholder: "\u0623\u062F\u062E\u0644 \u0639\u0644\u0627\u0645\u0629 \u0648\u0627\u0636\u063A\u0637 Enter" }), _jsx("button", { type: "button", onClick: addTag, className: "px-4 py-2 bg-[#005CB9] text-white rounded-md hover:bg-[#0047A0] transition-colors", children: "\u0625\u0636\u0627\u0641\u0629" })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: formData.tags.map((tag, index) => (_jsxs("span", { className: "inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm", children: [tag, _jsx("button", { type: "button", onClick: () => removeTag(tag), className: "mr-2 text-blue-600 hover:text-blue-800", children: _jsx(X, { size: 14 }) })] }, index))) })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", name: "is_featured", checked: formData.is_featured, onChange: handleInputChange, className: "ml-2" }), _jsx("label", { className: "text-sm font-medium text-gray-700", children: "\u0645\u0642\u0627\u0644 \u0645\u0645\u064A\u0632" })] }), _jsxs("div", { className: "flex justify-end space-x-4 space-x-reverse pt-6 border-t", children: [_jsx("button", { type: "button", onClick: () => navigate('/articles'), className: "px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors", children: "\u0625\u0644\u063A\u0627\u0621" }), _jsxs("button", { type: "submit", disabled: loading, className: "flex items-center px-6 py-2 bg-[#005CB9] text-white rounded-md hover:bg-[#0047A0] transition-colors disabled:opacity-50", children: [_jsx(Save, { size: 16, className: "ml-2" }), loading ? 'جاري الحفظ...' : (isEditing ? 'تحديث' : 'حفظ')] })] })] })] }));
};
export default ArticleForm;
