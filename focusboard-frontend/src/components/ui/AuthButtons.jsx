export default function AuthButton({ loading, label }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3 rounded-lg font-semibold flex items-center justify-center mt-2 transition-all duration-200"
      style={{
        backgroundColor: 'var(--accent)',
        color: 'var(--bg-primary)',
        fontFamily: 'DM Sans, sans-serif',
        opacity: loading ? 0.6 : 1,
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={e => {
        if (!loading) {
          e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,166,35,0.3)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {loading
        ? <span className="w-5 h-5 border-2 rounded-full animate-spin"
            style={{ borderColor: 'rgba(15,17,23,0.3)', borderTopColor: 'var(--bg-primary)' }}
          />
        : label
      }
    </button>
  );
}