export default function AuthLeftPanel() {
  return (
    <div
      className="hidden md:flex flex-col justify-center gap-8 px-16 py-20 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border)' }}
    >
      {/* Background circles */}
      <div className="absolute pointer-events-none" style={{
        top: '-60px', right: '-60px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)'
      }} />
      <div className="absolute pointer-events-none" style={{
        top: '-20px', right: '-20px',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)'
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '-40px', left: '-60px',
        width: '260px', height: '260px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%)'
      }} />

      {/* Brand */}
      <div className="relative z-10 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-base shrink-0"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
        >
          F
        </div>
        <span className="text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
          FocusBoard
        </span>
      </div>

      {/* Tagline */}
      <div className="relative z-10">
        <h2
          className="text-4xl leading-tight"
          style={{ color: 'var(--text-primary)', fontFamily: 'DM Serif Display, serif' }}
        >
          Your AI-powered<br />
          daily{' '}
          <span style={{ color: 'var(--accent)' }}>command center.</span>
        </h2>
      </div>

      {/* Stats */}
      <div className="relative z-10 grid grid-cols-3 gap-3">
        {[
          { num: '5x', label: 'More productive' },
          { num: 'AI', label: 'Smart planning' },
          { num: '∞', label: 'Task insights' },
        ].map(({ num, label }) => (
          <div
            key={label}
            className="rounded-lg p-3"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="text-2xl font-medium" style={{ color: 'var(--accent)' }}>{num}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="relative z-10 flex flex-col gap-3">
        {[
          'Break goals into actionable tasks',
          'AI builds your daily schedule',
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}
            />
            <span className="text-sm">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}