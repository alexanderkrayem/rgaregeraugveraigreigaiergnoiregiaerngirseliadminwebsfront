import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebar from './Sidebar';
const AdminLayout = ({ children }) => {
    return (_jsxs("div", { className: "flex h-screen bg-gray-50", dir: "rtl", children: [_jsx("div", { className: "w-64 flex-shrink-0", children: _jsx(Sidebar, {}) }), _jsx("div", { className: "flex-1 flex flex-col overflow-hidden", children: _jsx("main", { className: "flex-1 overflow-y-auto p-6", children: children }) })] }));
};
export default AdminLayout;
