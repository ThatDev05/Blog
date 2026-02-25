"use client";

import Link from "next/link";
import Image from "next/image";
import { IoArrowForwardOutline, IoSparklesOutline, IoShieldCheckmarkOutline, IoTrendingUpOutline } from "react-icons/io5";

export default function LandingPage() {
  return (
    <div className="landing-page-root">
      <style jsx global>{`
        @keyframes landing-float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes landing-drift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes landing-fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes landing-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .landing-page-root {
          min-height: 100vh;
          background: #030712;
          color: white;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
        }
        .mesh-gradient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(217, 70, 239, 0.1) 0%, transparent 50%);
          background-size: 200% 200%;
          animation: landing-drift 15s ease infinite;
          z-index: 0;
        }
        .animate-fade-in {
          animation: landing-fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .glass-card-premium {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .hero-title-gradient {
          background: linear-gradient(to right, #fff, #9ca3af);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .btn-premium {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.4);
        }
        .cta-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
          color: white;
        }
      `}</style>

      <div className="mesh-gradient" />

      {/* Modern Header Nav */}
      <nav style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: '30px 0',
        zIndex: 10
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <Link href="/" className="logo">
            <Image src="/images/logo.svg" width={120} height={36} alt="Blogy logo" style={{ filter: 'brightness(0) invert(1)' }} />
          </Link>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <Link href="/login" style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Sign In</Link>
            <Link href="/register" className="btn-premium" style={{
               background: 'rgba(255,255,255,0.05)',
               padding: '10px 24px',
               borderRadius: '12px',
               border: '1px solid rgba(255,255,255,0.1)',
               textDecoration: 'none',
               color: 'white',
               fontWeight: 600
            }}>Join Community</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '180px 20px 100px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center'
      }}>
        
        <div className="hero-text-content">
          <div className="animate-fade-in" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 16px', 
            borderRadius: '100px', 
            background: 'rgba(124, 58, 237, 0.1)', 
            border: '1px solid rgba(124, 58, 237, 0.2)',
            color: '#a78bfa',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '32px'
          }}>
            <IoSparklesOutline />
            Next Generation Blogging
          </div>

          <h1 className="hero-title-gradient animate-fade-in delay-1" style={{
            fontSize: '5rem',
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}>
            Create. Share. <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Inspire.</span>
          </h1>

          <p className="animate-fade-in delay-2" style={{
            fontSize: '1.25rem',
            lineHeight: 1.6,
            color: '#9ca3af',
            marginBottom: '48px',
            maxWidth: '540px'
          }}>
            Join the most vibrant community of thoughts, stories, and ideas. A minimal, functional, and powerful space for creators like you.
          </p>

          <div className="animate-fade-in delay-3" style={{ display: 'flex', gap: '20px' }}>
            <Link href="/register" className="btn-premium cta-primary" style={{
              padding: '18px 36px',
              borderRadius: '16px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              Start Writing <IoArrowForwardOutline />
            </Link>
          </div>
        </div>

        <div className="hero-visual" style={{ position: 'relative' }}>
          {/* Main Card */}
          <div className="glass-card-premium" style={{
            width: '100%',
            aspectRatio: '16/10',
            padding: '40px',
            position: 'relative',
            zIndex: 2,
            animation: 'landing-float 6s ease-in-out infinite'
          }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }} />
              <div>
                <div style={{ width: '120px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.1)', marginBottom: '8px' }} />
                <div style={{ width: '80px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '100%', height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ width: '95%', height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ width: '60%', height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.08)' }} />
            </div>
            
            {/* Overlay features */}
            <div className="glass-card-premium" style={{
              position: 'absolute',
              bottom: '-30px',
              right: '-30px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 3,
              background: 'rgba(255,255,255,0.08)'
            }}>
              <IoShieldCheckmarkOutline style={{ color: '#10b981', fontSize: '1.5rem' }} />
              <div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Secure & Fast</div>
                <div style={{ fontWeight: 700 }}>Built for Scale</div>
              </div>
            </div>

            <div className="glass-card-premium" style={{
              position: 'absolute',
              top: '80px',
              left: '-40px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 1,
              background: 'rgba(255,255,255,0.08)'
            }}>
              <IoTrendingUpOutline style={{ color: '#f59e0b', fontSize: '1.5rem' }} />
              <div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Analytics</div>
                <div style={{ fontWeight: 700 }}>Growth Focused</div>
              </div>
            </div>
          </div>

          {/* Background Blobs */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'rgba(124, 58, 237, 0.2)',
            filter: 'blur(100px)',
            borderRadius: '50%',
            top: '-100px',
            right: '-100px',
            zIndex: 0,
            animation: 'landing-glow 8s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'rgba(59, 130, 246, 0.15)',
            filter: 'blur(80px)',
            borderRadius: '50%',
            bottom: '-50px',
            left: '0',
            zIndex: 0,
            animation: 'landing-glow 10s ease-in-out infinite reverse'
          }} />
        </div>
      </main>

      {/* Social Proof Section */}
      <section className="container animate-fade-in delay-3" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px 100px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)', marginBottom: '40px' }} />
        <p style={{ color: '#6b7280', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px' }}>
          Loved by creative writers worldwide
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', opacity: 0.5, filter: 'grayscale(1)' }}>
          {/* Mock Logos */}
          <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>WRITERS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>STORYHUB</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>BLOGGERS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>MEDIUMX</div>
        </div>
      </section>
    </div>
  );
}
