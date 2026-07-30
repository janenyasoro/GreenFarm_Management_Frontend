// Root component - sets up routing and authentication protection
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Livestock from './pages/Livestock';
import HealthRecords from './pages/HealthRecords';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Inventory from './pages/Inventory';
import Users from './pages/Admin/Users';
import Farms from './pages/Admin/Farms';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes - no auth required */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes - user must be logged in */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/livestock" element={
            <ProtectedRoute>
              <Layout><Livestock /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/health-records/:livestock_id" element={
            <ProtectedRoute>
              <Layout><HealthRecords /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/expenses" element={
            <ProtectedRoute>
              <Layout><Expenses /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/income" element={
            <ProtectedRoute>
              <Layout><Income /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/inventory" element={
            <ProtectedRoute>
              <Layout><Inventory /></Layout>
            </ProtectedRoute>
          } />

          {/* Admin routes - require admin role */}
          <Route path="/admin/users" element={
            <ProtectedRoute requireAdmin>
              <Layout><Users /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/farms" element={
            <ProtectedRoute requireAdmin>
              <Layout><Farms /></Layout>
            </ProtectedRoute>
          } />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;