const Card = ({ children, className = '', hover = true }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-100/50 transition-all duration-300 ${hover ? 'hover:shadow-2xl hover:-translate-y-2 card-hover-effect' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
