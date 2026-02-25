'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          background: '#0a0a0a',
          color: 'white',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Critical Error</h1>
          <p style={{ color: '#9ca3af' }}>A global error occurred in the root layout.</p>
          <button
            onClick={() => reset()}
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
