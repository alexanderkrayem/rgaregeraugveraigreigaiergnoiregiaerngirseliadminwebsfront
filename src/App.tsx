import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Articles from './pages/Articles';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/articles" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
            <Route path="/articles/create" element={<ProtectedRoute><CreateArticle /></ProtectedRoute>} />
            <Route path="/articles/edit/:id" element={<ProtectedRoute><EditArticle /></ProtectedRoute>} />
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="bottom-left" />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;