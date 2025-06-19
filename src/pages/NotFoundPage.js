import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
const NotFoundPage = () => {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "text-center p-8", children: [_jsx("h1", { className: "text-9xl font-bold text-[#005CB9]", children: "404" }), _jsx("h2", { className: "text-3xl font-bold text-gray-800 mt-4 mb-6", children: "\u0627\u0644\u0635\u0641\u062D\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" }), _jsx("p", { className: "text-gray-600 max-w-md mx-auto mb-8", children: "\u0639\u0630\u0631\u0627\u064B\u060C \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u064A \u062A\u0628\u062D\u062B \u0639\u0646\u0647\u0627 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0623\u0648 \u062A\u0645 \u0646\u0642\u0644\u0647\u0627 \u0625\u0644\u0649 \u0639\u0646\u0648\u0627\u0646 \u0622\u062E\u0631." }), _jsxs(Link, { to: "/", className: "inline-flex items-center bg-[#005CB9] hover:bg-[#0047A0] text-white px-6 py-3 rounded-md transition-colors", children: [_jsx(Home, { size: 18, className: "ml-2" }), "\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645"] })] }) }));
};
export default NotFoundPage;
