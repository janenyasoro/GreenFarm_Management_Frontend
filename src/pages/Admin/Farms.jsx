// Admin page - manage all farms on the platform
import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, MapPin, MoreVertical, Building2, PawPrint, Sprout } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const Farms = () => {
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - replace with API fetch
    useEffect(() => {
        setTimeout(() => {
            setFarms([
                { id: 1, name: 'GreenFarm HQ', location: 'Nairobi, Kenya', owner: 'Jane Akinyi', size: 50, livestock: 45, crops: 12, status: 'active' },
                { id: 2, name: 'Sunrise Farm', location: 'Kiambu, Kenya', owner: 'John Doe', size: 75, livestock: 30, crops: 8, status: 'active' },
                { id: 3, name: 'Valley Farm', location: 'Nakuru, Kenya', owner: 'Mary Smith', size: 30, livestock: 15, crops: 5, status: 'inactive' },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredFarms = farms.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Farm Management</h1>
                    <p className="text-gray-500 mt-1">Manage all farms on the platform</p>
                </div>
                <button className="btn-primary text-sm"><Plus size={18} /> Register New Farm</button>
            </div>

            {/* Search */}
            <Card className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input type="text" placeholder="Search farms..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-harvest-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </Card>

            {/* Farms Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-harvest-600" /></div>
            ) : filteredFarms.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No farms found</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFarms.map((farm) => (
                        <Card key={farm.id} hover className="flex flex-col">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg bg-harvest-100 flex items-center justify-center"><Building2 size={20} className="text-harvest-600" /></div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{farm.name}</h3>
                                        <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12} /> {farm.location}</p>
                                    </div>
                                </div>
                                <Badge variant={farm.status === 'active' ? 'harvest' : 'gray'}>{farm.status}</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                <div className="bg-gray-50 rounded p-2 text-center"><p className="text-xs text-gray-500">Owner</p><p className="font-medium text-gray-700">{farm.owner}</p></div>
                                <div className="bg-gray-50 rounded p-2 text-center"><p className="text-xs text-gray-500">Size</p><p className="font-medium text-gray-700">{farm.size} acres</p></div>
                                <div className="bg-gray-50 rounded p-2 text-center"><p className="text-xs text-gray-500 flex items-center justify-center gap-1"><PawPrint size={12} /> Livestock</p><p className="font-medium text-gray-700">{farm.livestock}</p></div>
                                <div className="bg-gray-50 rounded p-2 text-center"><p className="text-xs text-gray-500 flex items-center justify-center gap-1"><Sprout size={12} /> Crops</p><p className="font-medium text-gray-700">{farm.crops}</p></div>
                            </div>

                            <div className="flex justify-end gap-2 mt-auto pt-3 border-t border-gray-100">
                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                                <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded"><MoreVertical size={16} /></button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Farms;