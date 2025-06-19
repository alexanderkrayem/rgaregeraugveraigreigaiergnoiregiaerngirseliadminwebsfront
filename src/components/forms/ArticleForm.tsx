import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Upload, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import RichTextEditor from '../editor/RichTextEditor';
import { api } from '../../context/AuthContext';

interface ArticleFormProps {
  article?: any;
  isEditing?: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, isEditing = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    tags: [] as string[],
    is_featured: false,
    cover_image_url: '',
  });
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      } else if (coverImageFile) {
        submitData.append('cover_image', coverImageFile);
      }

      let response;
      if (isEditing && article) {
        response = await api.put(`/admin/articles/${article.id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await api.post('/admin/articles', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      toast.success(isEditing ? 'تم تحديث المقال بنجاح' : 'تم إنشاء المقال بنجاح');
      navigate('/articles');
    } catch (error: any) {
      console.error('Error saving article:', error);
      const errorMessage = error.response?.data?.error || 'حدث خطأ أثناء حفظ المقال';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'تعديل المقال' : 'إضافة مقال جديد'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عنوان المقال *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
            placeholder="أدخل عنوان المقال"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المؤلف *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
            placeholder="أدخل اسم المؤلف"
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المقدمة *
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
            placeholder="أدخل مقدمة المقال"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            محتوى المقال *
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={handleContentChange}
            height="400px"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            صورة الغلاف *
          </label>
          
          <div className="flex items-center space-x-4 space-x-reverse mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={!useImageUrl}
                onChange={() => setUseImageUrl(false)}
                className="ml-2"
              />
              <Upload size={16} className="ml-1" />
              رفع ملف
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={useImageUrl}
                onChange={() => setUseImageUrl(true)}
                className="ml-2"
              />
              <LinkIcon size={16} className="ml-1" />
              رابط صورة
            </label>
          </div>

          {useImageUrl ? (
            <input
              type="url"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
              placeholder="أدخل رابط الصورة"
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
            />
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            العلامات *
          </label>
          <div className="flex space-x-2 space-x-reverse mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
              placeholder="أدخل علامة واضغط Enter"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-[#005CB9] text-white rounded-md hover:bg-[#0047A0] transition-colors"
            >
              إضافة
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="mr-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleInputChange}
            className="ml-2"
          />
          <label className="text-sm font-medium text-gray-700">
            مقال مميز
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 space-x-reverse pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/articles')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-[#005CB9] text-white rounded-md hover:bg-[#0047A0] transition-colors disabled:opacity-50"
          >
            <Save size={16} className="ml-2" />
            {loading ? 'جاري الحفظ...' : (isEditing ? 'تحديث' : 'حفظ')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;