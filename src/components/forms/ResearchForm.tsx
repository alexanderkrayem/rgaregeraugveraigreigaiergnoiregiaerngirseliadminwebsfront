import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import RichTextEditor from '../editor/RichTextEditor';
import { api } from '../../context/AuthContext';

interface ResearchFormProps {
  research?: any;
  isEditing?: boolean;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ research, isEditing = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    journal: '',
    publication_date: '',
    authors: [] as string[],
  });
  const [researchFile, setResearchFile] = useState<File | null>(null);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAbstractChange = (abstract: string) => {
    setFormData(prev => ({ ...prev, abstract }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeAuthor = (authorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.filter(author => author !== authorToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      } else {
        response = await api.post('/admin/research', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      toast.success(isEditing ? 'تم تحديث البحث بنجاح' : 'تم إنشاء البحث بنجاح');
      navigate('/research');
    } catch (error: any) {
      console.error('Error saving research:', error);
      const errorMessage = error.response?.data?.error || 'حدث خطأ أثناء حفظ البحث';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'تعديل البحث' : 'إضافة بحث جديد'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عنوان البحث *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
            placeholder="أدخل عنوان البحث"
            required
          />
        </div>

        {/* Journal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المجلة العلمية *
          </label>
          <input
            type="text"
            name="journal"
            value={formData.journal}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
            placeholder="أدخل اسم المجلة العلمية"
            required
          />
        </div>

        {/* Publication Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تاريخ النشر *
          </label>
          <input
            type="date"
            name="publication_date"
            value={formData.publication_date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
            required
          />
        </div>

        {/* Abstract */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ملخص البحث *
          </label>
          <RichTextEditor
            value={formData.abstract}
            onChange={handleAbstractChange}
            height="300px"
            placeholder="أدخل ملخص البحث"
          />
        </div>

        {/* Authors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المؤلفون *
          </label>
          <div className="flex space-x-2 space-x-reverse mb-2">
            <input
              type="text"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAuthor())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
              placeholder="أدخل اسم المؤلف واضغط Enter"
            />
            <button
              type="button"
              onClick={addAuthor}
              className="px-4 py-2 bg-[#005CB9] text-white rounded-md hover:bg-[#0047A0] transition-colors"
            >
              إضافة
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.authors.map((author, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {author}
                <button
                  type="button"
                  onClick={() => removeAuthor(author)}
                  className="mr-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Research File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ملف البحث {!isEditing && '*'}
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005CB9]"
          />
          <p className="text-sm text-gray-500 mt-1">
            يُقبل ملفات PDF, DOC, DOCX فقط (حد أقصى 5 ميجابايت)
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 space-x-reverse pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/research')}
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

export default ResearchForm;