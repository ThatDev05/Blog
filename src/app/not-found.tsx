import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      background: '#0a0a0a',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 900, background: 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
      <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Page Not Found</h2>
      <p style={{ color: '#9ca3af', maxWidth: '400px', fontSize: '1.1rem' }}>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
      <Link 
        href="/" 
        style={{
          marginTop: '20px',
          background: 'rgba(255,255,255,0.05)',
          padding: '12px 24px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          textDecoration: 'none',
          color: 'white',
          fontWeight: 600,
          transition: 'all 0.3s'
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
