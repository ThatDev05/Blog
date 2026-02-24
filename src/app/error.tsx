'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="section">
      <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2 className="h2">Something went wrong!</h2>
        <button
          className="btn"
          style={{ display: 'inline-block', marginTop: '20px' }}
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  )
}
