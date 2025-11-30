const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '' }) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-4 relative overflow-hidden btn-ripple';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white hover:shadow-2xl hover:-translate-y-1 hover:scale-105 focus:ring-blue-500/50',
    secondary: 'bg-white text-slate-700 border-2 border-slate-200 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 focus:ring-slate-500/30',
    danger: 'bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white hover:shadow-2xl hover:-translate-y-1 hover:scale-105 focus:ring-red-500/50',
    success: 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white hover:shadow-2xl hover:-translate-y-1 hover:scale-105 focus:ring-green-500/50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
