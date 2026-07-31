// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

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

// Import components
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';

function App() {
    return (
        <Router>
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Routes>
                    {/* Public routes - no authentication needed */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Root route - Home page (public) */}
                    <Route path="/" element={<Home />} />

                    {/* Dashboard - requires authentication */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
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

                    {/* Catch all - redirect to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;