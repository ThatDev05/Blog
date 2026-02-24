import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="section">
      <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2 className="h2">Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/" className="btn" style={{ display: 'inline-block', marginTop: '20px' }}>
          Return Home
        </Link>
      </div>
    </div>
  )
}
