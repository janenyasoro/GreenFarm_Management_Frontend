// Main dashboard - shows stats, activity feed, and role-based admin section
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
    PawPrint, DollarSign, TrendingUp, Package, Users, Building2,
    ArrowUpRight, ArrowDownRight, Calendar, Bell, Search, Plus, MoreVertical, Sprout, Activity
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const isAdmin = user?.role === 'admin' || user?.role === 'owner';

    // Mock data - replace with real API calls
    const [stats] = useState({
        totalLivestock: 156,
        totalRevenue: 28450,
        totalExpenses: 12300,
        totalCrops: 45,
        recentActivities: [
            { id: 1, type: 'livestock', action: 'New calf born - Tag #T045', time: '2 hours ago', icon: '🐄' },
            { id: 2, type: 'crop', action: 'Harvested 500kg tomatoes from Field B', time: '5 hours ago', icon: '🍅' },
            { id: 3, type: 'sale', action: 'Sold 10 goats to ABC Farm', time: '1 day ago', icon: '💰' },
        ],
        upcomingTasks: [
            { id: 1, title: 'Vaccinate calves', due: 'Today', priority: 'high' },
            { id: 2, title: 'Irrigation maintenance', due: 'Tomorrow', priority: 'medium' },
        ]
    });

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harvest-600"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Welcome back, {user?.full_name?.split(' ')[0] || 'User'}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">Here's what's happening on your farm today</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input type="text" placeholder="Search..." className="w-full md:w-56 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-harvest-500" />
                    </div>
                    <button className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition relative">
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
                <Link to="/livestock" className="btn-primary text-sm"><Plus size={18} /> Add Livestock</Link>
                <Link to="/expenses" className="btn-secondary text-sm"><Plus size={18} /> Add Expense</Link>
                <Link to="/income" className="btn-tertiary text-sm"><Plus size={18} /> Record Income</Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Livestock', value: stats.totalLivestock, icon: <PawPrint size={20} />, color: 'harvest', change: '+12%' },
                    { label: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: <TrendingUp size={20} />, color: 'teal', change: '+8.5%' },
                    { label: 'Expenses', value: `$${stats.totalExpenses.toLocaleString()}`, icon: <DollarSign size={20} />, color: 'amber', change: '+3.2%' },
                    { label: 'Active Crops', value: stats.totalCrops, icon: <Sprout size={20} />, color: 'green', change: '+5%' },
                ].map((stat, idx) => (
                    <div key={idx} className="card">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="mt-3 flex items-center text-sm">
                            <ArrowUpRight size={16} className="text-harvest-500" />
                            <span className="text-harvest-500 font-medium">{stat.change}</span>
                            <span className="text-gray-400 ml-1">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity & Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="card lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                        <button className="text-sm text-harvest-600 hover:text-harvest-700 font-medium">View All →</button>
                    </div>
                    <div className="space-y-3">
                        {stats.recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="text-2xl">{activity.icon}</span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-800">{activity.action}</p>
                                    <p className="text-xs text-gray-400">{activity.time}</p>
                                </div>
                                <button className="text-gray-300 hover:text-gray-500"><MoreVertical size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-800">Upcoming Tasks</h3>
                        <button className="text-sm text-harvest-600 hover:text-harvest-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-3">
                        {stats.upcomingTasks.map((task) => (
                            <div key={task.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                                <div className="mt-0.5">
                                    <Activity size={16} className={
                                        task.priority === 'high' ? 'text-red-500' :
                                            task.priority === 'medium' ? 'text-amber-500' : 'text-teal-500'
                                    } />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">{task.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={12} /> {task.due}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                task.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'
                                            }`}>{task.priority}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Admin Section - visible only to admin/owner */}
            {isAdmin && (
                <div className="bg-gradient-to-r from-harvest-50 via-amber-50 to-teal-50 rounded-xl p-6 border border-harvest-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">👑 Admin Dashboard</h3>
                            <p className="text-sm text-gray-600">Manage all farms, users, and system settings</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/admin/users" className="bg-white hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 transition flex items-center gap-2">
                                <Users size={16} /> Manage Users
                            </Link>
                            <Link to="/admin/farms" className="bg-white hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 transition flex items-center gap-2">
                                <Building2 size={16} /> Manage Farms
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;      