import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import {
    PawPrint,
    DollarSign,
    Package,
    Users,
    Building2,
    Sprout,
    Calendar,
    ArrowRight,
    CheckCircle,
    Star,
    Heart,
    Award,
    BarChart3
} from 'lucide-react';
import Button from '../components/ui/Button';

const Home = () => {
    const { user } = useAuth();

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

    const stats = [
        { label: 'Active Users', value: '5,000+', icon: <Users size={20} /> },
        { label: 'Farms Managed', value: '2,500+', icon: <Building2 size={20} /> },
        { label: 'Livestock Tracked', value: '50,000+', icon: <PawPrint size={20} /> },
        { label: 'Customer Satisfaction', value: '4.9/5', icon: <Star size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-white">
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
                        <div className="absolute -top-4 -right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                            🌟 Popular
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            🚀 Fast Setup
                        </div>
                    </div>
                </div>
            </section>

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

            <section id="features" className="container-custom py-16 md:py-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Everything Your Farm Needs</h2>
                    <p className="mt-3 text-gray-600">A complete suite of tools designed to help you manage your agricultural operations efficiently.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div key={idx} className="card-hover">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Trusted by Farmers Everywhere</h2>
                        <p className="mt-3 text-gray-600">See what our users are saying about GreenFarm.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className="card">
                                <div className="flex items-center gap-1 text-amber-500 mb-4">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-600 mb-4">“{testimonial.content}”</p>
                                <div>
                                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container-custom py-16 md:py-20">
                <div className="bg-gradient-to-r from-harvest-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Farm?</h2>
                    <p className="mt-4 text-harvest-50 max-w-2xl mx-auto">Join thousands of farmers using GreenFarm to make better decisions, save time, and increase profitability.</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link to={user ? "/dashboard" : "/register"}>
                            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                                {user ? "Go to Dashboard" : "Start Free Trial"}
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="ghost" size="lg">Sign In</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t border-gray-100 py-6">
                <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} GreenFarm. All rights reserved.</p>
                    <p className="flex items-center gap-1"><Heart size={14} className="text-red-500" /> Made with care for farmers</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
