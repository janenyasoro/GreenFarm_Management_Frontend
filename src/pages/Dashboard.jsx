// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {/* Welcome Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                    Welcome, {user?.full_name || 'User'}! 👋
                </h2>
                <p className="text-gray-600">You are successfully logged in to GreenFarm.</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded p-4">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user?.email}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-4">
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium capitalize">{user?.role || 'Owner'}</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-harvest-50 hover:bg-harvest-100 rounded-lg p-6 transition flex flex-col justify-between">
                    <div>
                        <div className="text-3xl mb-2">🐄</div>
                        <h3 className="text-lg font-semibold">Livestock</h3>
                        <p className="text-harvest-700 text-sm">Manage your animals</p>
                    </div>
                    <div className="mt-4">
                        <Link to="/livestock">
                            <Button variant="primary">Open Livestock</Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-harvest-50 hover:bg-harvest-100 rounded-lg p-6 transition flex flex-col justify-between">
                    <div>
                        <div className="text-3xl mb-2">💰</div>
                        <h3 className="text-lg font-semibold">Expenses</h3>
                        <p className="text-harvest-700 text-sm">Track your spending</p>
                    </div>
                    <div className="mt-4">
                        <Link to="/expenses">
                            <Button variant="ghost">View Expenses</Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-harvest-50 hover:bg-harvest-100 rounded-lg p-6 transition flex flex-col justify-between">
                    <div>
                        <div className="text-3xl mb-2">📈</div>
                        <h3 className="text-lg font-semibold">Income</h3>
                        <p className="text-harvest-700 text-sm">Track your earnings</p>
                    </div>
                    <div className="mt-4">
                        <Link to="/income">
                            <Button variant="primary">Open Income</Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-harvest-50 hover:bg-harvest-100 rounded-lg p-6 transition flex flex-col justify-between">
                    <div>
                        <div className="text-3xl mb-2">📦</div>
                        <h3 className="text-lg font-semibold">Inventory</h3>
                        <p className="text-harvest-700 text-sm">Manage your stock</p>
                    </div>
                    <div className="mt-4">
                        <Link to="/inventory">
                            <Button variant="ghost">View Inventory</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;