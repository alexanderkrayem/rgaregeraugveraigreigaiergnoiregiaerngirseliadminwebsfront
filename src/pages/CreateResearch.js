import { jsx as _jsx } from "react/jsx-runtime";
import AdminLayout from '../components/layout/AdminLayout';
import ResearchForm from '../components/forms/ResearchForm';
const CreateResearch = () => {
    return (_jsx(AdminLayout, { children: _jsx(ResearchForm, {}) }));
};
export default CreateResearch;
