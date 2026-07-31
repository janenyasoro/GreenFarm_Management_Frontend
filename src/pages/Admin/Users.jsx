// Admin page - manage all platform users
import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Mail, Building2, MoreVertical, Shield, UserCog, UserCheck } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - replace with API fetch
    useEffect(() => {
        setTimeout(() => {
            setUsers([
                { id: 1, full_name: 'Jane Akinyi', email: 'jane@greenfarm.com', role: 'admin', farm: 'GreenFarm HQ', status: 'active', lastActive: '2 hours ago' },
                { id: 2, full_name: 'John Doe', email: 'john@sunrise.com', role: 'owner', farm: 'Sunrise Farm', status: 'active', lastActive: '1 day ago' },
                { id: 3, full_name: 'Mary Smith', email: 'mary@valley.com', role: 'owner', farm: 'Valley Farm', status: 'inactive', lastActive: '5 days ago' },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredUsers = users.filter(u =>
        u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.farm.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleIcon = (role) => {
        if (role === 'admin') return <Shield size={14} />;
        if (role === 'owner') return <UserCog size={14} />;
        return <UserCheck size={14} />;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                    <p className="text-gray-500 mt-1">Manage all users across the platform</p>
                </div>
                <button className="btn-primary text-sm"><Plus size={18} /> Add New User</button>
            </div>

            {/* Search */}
            <Card className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input type="text" placeholder="Search users..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-harvest-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </Card>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-harvest-50 via-amber-50 to-teal-50 border-b border-gray-100">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center py-8 text-gray-500">Loading...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No users found</td></tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-harvest-500 to-teal-500 flex items-center justify-center text-white font-medium text-sm">
                                                    {u.full_name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{u.full_name}</p>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1"><Mail size={12} /> {u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${u.role === 'admin' ? 'bg-harvest-100 text-harvest-800' :
                                                    u.role === 'owner' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                                                }`}>
                                                {getRoleIcon(u.role)}{u.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1"><Building2 size={14} className="text-gray-400" />{u.farm}</td>
                                        <td className="px-4 py-3"><Badge variant={u.status === 'active' ? 'harvest' : 'gray'}>{u.status}</Badge></td>
                                        <td className="px-4 py-3 text-sm text-gray-500">{u.lastActive}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                                                <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                                <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded"><MoreVertical size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm">
                    <p className="text-gray-500">Showing {filteredUsers.length} of {users.length} users</p>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">Previous</button>
                        <button className="px-3 py-1 bg-harvest-600 text-white rounded text-sm">1</button>
                        <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;