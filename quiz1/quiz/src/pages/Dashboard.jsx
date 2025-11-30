import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    dishes: 0,
    cooks: 0,
    customers: 0,
    orders: 0,
    pendingOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const dishes = JSON.parse(localStorage.getItem('dishes') || '[]');
    const cooks = JSON.parse(localStorage.getItem('cooks') || '[]');
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    
    const totalRevenue = orders.reduce((total, order) => {
      return total + order.items.reduce((orderTotal, item) => {
        const dish = dishes.find(d => d.id === item.dishId);
        return orderTotal + (dish ? dish.price * item.quantity : 0);
      }, 0);
    }, 0);

    setStats({
      dishes: dishes.length,
      cooks: cooks.length,
      customers: customers.length,
      orders: orders.length,
      pendingOrders,
      totalRevenue: totalRevenue.toFixed(2)
    });
  }, []);

  const statCards = [
    {
      title: 'Total Dishes',
      value: stats.dishes,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      ),
      gradient: 'from-blue-500 to-blue-700',
      link: '/dishes'
    },
    {
      title: 'Total Cooks',
      value: stats.cooks,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      ),
      gradient: 'from-purple-500 to-purple-700',
      link: '/cooks'
    },
    {
      title: 'Total Customers',
      value: stats.customers,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      ),
      gradient: 'from-green-500 to-green-700',
      link: '/customers'
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      ),
      gradient: 'from-orange-500 to-orange-700',
      link: '/orders'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      gradient: 'from-yellow-500 to-yellow-700',
      link: '/orders'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue}`,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      gradient: 'from-pink-500 to-pink-700',
      link: '/orders'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 animate-fade-in relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 transform skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="animate-float inline-block mb-6">
              <svg className="w-20 h-20 mx-auto text-white drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-6xl font-extrabold mb-4 animate-slide-up drop-shadow-2xl">
              Welcome to Hotel Management
            </h1>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Manage your hotel operations efficiently with our modern, intuitive system
            </p>
            <div className="flex justify-center space-x-4 animate-slide-up">
              <Button onClick={() => navigate('/orders/add')} className="!bg-white !text-indigo-700 hover:!bg-slate-100 !shadow-2xl">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Order
                </span>
              </Button>
              <Button onClick={() => navigate('/dishes/add')} variant="secondary" className="!bg-indigo-500/30 !text-white !border-white/30 hover:!bg-indigo-500/50 backdrop-blur-sm">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Dish
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-extrabold text-slate-800 mb-8 animate-slide-up">
          📊 Dashboard Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {statCards.map((stat, index) => (
            <Card 
              key={index}
              className="cursor-pointer transform transition-all duration-500 hover:scale-105 group relative overflow-hidden"
              onClick={() => navigate(stat.link)}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity" style={{background: `linear-gradient(135deg, var(--tw-gradient-stops))`, '--tw-gradient-from': stat.gradient.split(' ')[1], '--tw-gradient-to': stat.gradient.split(' ')[3]}}></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">{stat.title}</p>
                  <p className="text-5xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent" style={{backgroundImage: `linear-gradient(135deg, ${stat.gradient.replace('from-', '#').replace('to-', '#')})`}}>{stat.value}</p>
                </div>
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {stat.icon}
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-slate-500 group-hover:text-indigo-600 transition-colors">
                <span className="font-semibold">View Details</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-16 animate-slide-up">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-8">⚡ Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => navigate('/dishes')}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group border-2 border-blue-200/50"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="text-slate-800 font-bold text-lg">View Dishes</span>
                <span className="text-slate-500 text-sm mt-1">Manage menu items</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/cooks')}
              className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group border-2 border-purple-200/50"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-slate-800 font-bold text-lg">View Cooks</span>
                <span className="text-slate-500 text-sm mt-1">Manage kitchen staff</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/customers')}
              className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group border-2 border-green-200/50"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-slate-800 font-bold text-lg">View Customers</span>
                <span className="text-slate-500 text-sm mt-1">Manage clients</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/orders')}
              className="bg-gradient-to-br from-orange-50 to-amber-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group border-2 border-orange-200/50"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-slate-800 font-bold text-lg">View Orders</span>
                <span className="text-slate-500 text-sm mt-1">Track bookings</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
