import { jsx as _jsx } from "react/jsx-runtime";
import AdminLayout from '../components/layout/AdminLayout';
import ArticleForm from '../components/forms/ArticleForm';
const CreateArticle = () => {
    return (_jsx(AdminLayout, { children: _jsx(ArticleForm, {}) }));
};
export default CreateArticle;
