'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      background: '#0a0a0a',
      color: 'white'
    }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600
        }}
      >
        Try again
      </button>
    </div>
  );
}
