// Public landing page - showcases the platform and encourages signup
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    PawPrint,
    DollarSign,
    TrendingUp,
    Package,
    Users,
    Building2,
    Sprout,
    Shield,
    Calendar,
    ArrowRight,
    CheckCircle,
    Star,
    Truck,
    Leaf,
    Heart,
    Award,
    Clock,
    BarChart3
} from 'lucide-react';
import Button from '../components/ui/Button';

const Home = () => {
    const { user } = useAuth();

    // Features data
    const features = [
        {
            icon: <PawPrint size={28} className="text-harvest-600" />,
            title: 'Livestock Management',
            description: 'Track animal health, breeding, and production with ease'
        },
        {
            icon: <Sprout size={28} className="text-harvest-600" />,
            title: 'Crop Planning',
            description: 'Plan, track, and optimize your entire growing season'
        },
        {
            icon: <DollarSign size={28} className="text-harvest-600" />,
            title: 'Farm Accounting',
            description: 'Track expenses, income, and profitability in one place'
        },
        {
            icon: <Package size={28} className="text-harvest-600" />,
            title: 'Inventory Management',
            description: 'Keep track of supplies, feed, and equipment'
        },
        {
            icon: <Calendar size={28} className="text-harvest-600" />,
            title: 'Task Scheduling',
            description: 'Organize farm tasks and assign to your team'
        },
        {
            icon: <BarChart3 size={28} className="text-harvest-600" />,
            title: 'Analytics & Reports',
            description: 'Make data-driven decisions with insights and reports'
        },
    ];

    // Testimonials data
    const testimonials = [
        {
            name: 'Jane Akinyi',
            role: 'Farm Owner',
            content: 'GreenFarm has transformed how I manage my farm. I can track everything from livestock to finances in one place!',
            rating: 5,
        },
        {
            name: 'John Doe',
            role: 'Farm Manager',
            content: 'The task management feature has helped our team stay organized and productive. Highly recommend!',
            rating: 5,
        },
        {
            name: 'Mary Smith',
            role: 'Agripreneur',
            content: 'The analytics tools have helped me make better decisions and increase my farm\'s profitability.',
            rating: 4,
        },
    ];

    // Stats data
    const stats = [
        { label: 'Active Users', value: '5,000+', icon: <Users size={20} /> },
        { label: 'Farms Managed', value: '2,500+', icon: <Building2 size={20} /> },
        { label: 'Livestock Tracked', value: '50,000+', icon: <PawPrint size={20} /> },
        { label: 'Customer Satisfaction', value: '4.9/5', icon: <Star size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation - Simple variant for landing page */}
            <nav className="container-custom py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🌾</span>
                    <span className="text-xl font-bold text-harvest-700">GreenFarm</span>
                </div>
                <div className="flex items-center gap-3">
                    {user ? (
                        <Link to="/dashboard">
                            <Button variant="primary" size="sm">Go to Dashboard</Button>
                        </Link>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Sign In</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" size="sm">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container-custom py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-harvest-50 text-harvest-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                            <Award size={16} /> #1 Farm Management Software
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Farm Management{' '}
                            <span className="bg-gradient-to-r from-harvest-600 to-teal-600 bg-clip-text text-transparent">
                                Made Simple
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-lg">
                            Track livestock, crops, finances, and team tasks all in one powerful platform.
                            Join thousands of farmers who trust GreenFarm.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link to={user ? "/dashboard" : "/register"}>
                                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                                    {user ? "Go to Dashboard" : "Start Free Trial"}
                                </Button>
                            </Link>
                            <a href="#features" className="btn-ghost text-sm">
                                Learn More →
                            </a>
                        </div>
                        <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><CheckCircle size={16} className="text-harvest-500" /> No credit card required</span>
                            <span className="flex items-center gap-1"><CheckCircle size={16} className="text-harvest-500" /> Free 14-day trial</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-gradient-to-br from-harvest-100 via-amber-50 to-teal-100 rounded-3xl p-8 relative overflow-hidden">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><PawPrint size={18} className="text-harvest-600" /> 156 Livestock</div>
                                    <div className="mt-2 h-2 bg-gray-200 rounded-full"><div className="h-2 bg-harvest-500 rounded-full" style={{ width: '78%' }} /></div>
                                    <p className="text-xs text-gray-500 mt-1">Health: 78%</p>
                                </div>
                                <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><DollarSign size={18} className="text-amber-600" /> $28,450</div>
                                    <p className="text-xs text-gray-500 mt-1">Revenue this month</p>
                                    <span className="text-xs text-harvest-600 font-medium">↑ 12% vs last month</span>
                                </div>
                                <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Sprout size={18} className="text-teal-600" /> 45 Crops</div>
                                    <p className="text-xs text-gray-500 mt-1">Active growing</p>
                                    <span className="text-xs text-amber-600 font-medium">Harvest in 2 weeks</span>
                                </div>
                                <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Calendar size={18} className="text-purple-600" /> 12 Tasks</div>
                                    <p className="text-xs text-gray-500 mt-1">Pending</p>
                                    <span className="text-xs text-red-500 font-medium">3 overdue</span>
                                </div>
                            </div>
                            <div className="mt-4 bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">📊 Farm Overview</span>
                                    <span className="text-xs text-harvest-600 font-medium">View All →</span>
                                </div>
                                <div className="flex gap-1 mt-2">
                                    <div className="h-8 flex-1 bg-harvest-400 rounded-sm" style={{ height: '32px' }} />
                                    <div className="h-8 flex-1 bg-harvest-500 rounded-sm" style={{ height: '48px' }} />
                                    <div className="h-8 flex-1 bg-harvest-400 rounded-sm" style={{ height: '28px' }} />
                                    <div className="h-8 flex-1 bg-harvest-600 rounded-sm" style={{ height: '56px' }} />
                                    <div className="h-8 flex-1 bg-harvest-400 rounded-sm" style={{ height: '36px' }} />
                                    <div className="h-8 flex-1 bg-harvest-500 rounded-sm" style={{ height: '44px' }} />
                                </div>
                            </div>
                        </div>
                        {/* Floating badges */}
                        <div className="absolute -top-4 -right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                            🌟 Popular
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            🚀 Fast Setup
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-50 py-12 border-y border-gray-100">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="flex justify-center text-harvest-600 mb-2">{stat.icon}</div>
                                <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container-custom py-16 md:py-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Everything You Need to <span className="text-harvest-600">Manage Your Farm</span>
                    </h2>
                    <p className="mt-4 text-gray-600">
                        From livestock to finances, GreenFarm provides all the tools you need in one place.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div key={idx} className="card-hover group">
                            <div className="w-12 h-12 bg-harvest-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-harvest-100 transition">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                            <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gradient-to-r from-harvest-50 via-amber-50 to-teal-50 py-16">
                <div className="container-custom">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800">
                            What Our <span className="text-harvest-600">Farmers Say</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex gap-1 text-amber-500 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < testimonial.rating ? '#f59e0b' : 'none'} />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm italic">"{testimonial.content}"</p>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-harvest-500 to-teal-500 flex items-center justify-center text-white font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800 text-sm">{testimonial.name}</p>
                                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container-custom py-16 md:py-20">
                <div className="bg-gradient-to-r from-harvest-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Transform Your Farm?
                    </h2>
                    <p className="text-white/80 max-w-xl mx-auto mb-6">
                        Join thousands of farmers who are already using GreenFarm to grow their business.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to={user ? "/dashboard" : "/register"}>
                            <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right" className="bg-white text-harvest-700 hover:bg-gray-100">
                                {user ? "Go to Dashboard" : "Get Started Free"}
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="ghost" size="lg" className="border-2 border-white text-white hover:bg-white/10">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                    <p className="text-white/60 text-sm mt-4">No credit card required • Free 14-day trial</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🌾</span>
                            <span className="text-lg font-bold text-white">GreenFarm</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition">Terms of Service</a>
                            <a href="#" className="hover:text-white transition">Contact</a>
                            <span className="flex items-center gap-1">
                                Made with <Heart size={14} className="text-red-500" /> for farmers
                            </span>
                        </div>
                    </div>
                    <p className="text-center text-xs mt-4">© {new Date().getFullYear()} GreenFarm. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;