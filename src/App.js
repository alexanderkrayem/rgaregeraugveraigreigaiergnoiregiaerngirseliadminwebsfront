import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// Pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Articles from './pages/Articles';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import Research from './pages/Research';
import CreateResearch from './pages/CreateResearch';
import EditResearch from './pages/EditResearch';
import NotFoundPage from './pages/NotFoundPage';
// Context
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
function App() {
    return (_jsx("div", { className: "min-h-screen bg-gray-50 flex flex-col", dir: "rtl", children: _jsx(AuthProvider, { children: _jsxs(Router, { children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/articles", element: _jsx(ProtectedRoute, { children: _jsx(Articles, {}) }) }), _jsx(Route, { path: "/articles/create", element: _jsx(ProtectedRoute, { children: _jsx(CreateArticle, {}) }) }), _jsx(Route, { path: "/articles/edit/:id", element: _jsx(ProtectedRoute, { children: _jsx(EditArticle, {}) }) }), _jsx(Route, { path: "/research", element: _jsx(ProtectedRoute, { children: _jsx(Research, {}) }) }), _jsx(Route, { path: "/research/create", element: _jsx(ProtectedRoute, { children: _jsx(CreateResearch, {}) }) }), _jsx(Route, { path: "/research/edit/:id", element: _jsx(ProtectedRoute, { children: _jsx(EditResearch, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }), _jsx(Toaster, { position: "bottom-left" })] }) }) }));
}
export default App;
