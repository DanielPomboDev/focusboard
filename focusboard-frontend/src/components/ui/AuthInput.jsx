export default function AuthInput({ label, name, type = 'text', placeholder, value, onChange, autoFocus }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-xs font-medium uppercase tracking-widest"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        autoFocus={autoFocus}
        className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
          fontFamily: 'DM Sans, sans-serif',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'var(--border)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}