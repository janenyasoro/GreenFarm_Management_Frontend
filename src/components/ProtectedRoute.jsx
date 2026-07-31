// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log('🔒 ProtectedRoute - User:', user, 'Loading:', loading);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 mx-auto" style={{ borderColor: "#2C5F2D" }}></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    console.log('🔒 No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected content
  console.log('✅ User authenticated:', user.email);
  return children;
};

export default ProtectedRoute;