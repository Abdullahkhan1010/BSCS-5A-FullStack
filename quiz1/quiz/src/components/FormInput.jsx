const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, required = false, options = [], step }) => {
  if (type === 'select') {
    return (
      <div className="mb-6">
        <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wide" htmlFor={name}>
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none bg-white shadow-sm hover:border-slate-300"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="mb-6">
        <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wide" htmlFor={name}>
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows="4"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none resize-none shadow-sm hover:border-slate-300"
        />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wide" htmlFor={name}>
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={step}
        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none shadow-sm hover:border-slate-300"
      />
    </div>
  );
};

export default FormInput;
