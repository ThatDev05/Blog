import Link from "next/link";
import Image from "next/image";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function LandingPage() {
  return (
    <div className="landing-page" style={{ 
      backgroundColor: 'var(--background, #ffffff)',
      minHeight: 'calc(100vh - 100px)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Premium Hero Section */}
      <section className="hero-landing" style={{
        paddingBlock: '80px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '60px',
          paddingTop: '40px',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div className="hero-content">
            <div className="landing-logo" style={{ marginBottom: '40px' }}>
              <Link href="/">
                <Image 
                  src="/images/logo.svg" 
                  width={129} 
                  height={40} 
                  alt="Blogy logo" 
                />
              </Link>
            </div>
            <h1 className="h1 hero-title" style={{
              fontSize: '4rem',
              lineHeight: '1.1',
              marginBottom: '24px',
              color: 'var(--st-rich-black-fogra-29, #0d1117)'
            }}>
              Insights, stories and <strong style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}>ideas</strong> delivered to you.
            </h1>
            <p className="section-text" style={{
              fontSize: '1.25rem',
              lineHeight: '1.6',
              color: 'var(--st-sonic-silver, #707070)',
              marginBottom: '40px',
              maxWidth: '500px'
            }}>
              Join our community of 10,000+ writers and readers. Share your thoughts with the world and discover amazing stories every day.
            </p>
            
            <div className="cta-group" style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center'
            }}>
              <Link href="/register" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                borderRadius: '50px',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
                color: 'white',
                textDecoration: 'none'
              }}>
                <span className="span">Get Started for Free</span>
                <IoArrowForwardOutline className="ion-icon" aria-hidden="true" />
              </Link>
              <Link href="/login" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                borderRadius: '50px',
                fontWeight: 600,
                border: '2px solid #e5e7eb',
                color: 'var(--st-rich-black-fogra-29, #0d1117)',
                textDecoration: 'none'
              }}>
                <span className="span">Sign In</span>
              </Link>
            </div>
          </div>
          
          <div className="hero-visual" style={{
            position: 'relative',
            height: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div className="glass-card main-card" style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              zIndex: 2,
              width: '380px',
              padding: '32px'
            }}>
              <div className="card-header" style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                <div className="avatar-dot" style={{ width: '48px', height: '48px', background: '#e5e7eb', borderRadius: '50%' }}></div>
                <div className="text-lines">
                  <div className="line short" style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '8px', width: '80px' }}></div>
                  <div className="line long" style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '8px', width: '140px' }}></div>
                </div>
              </div>
              <div className="card-content">
                <div className="content-line first" style={{ height: '12px', background: '#f3f4f6', borderRadius: '6px', marginBottom: '16px', width: '100%' }}></div>
                <div className="content-line second" style={{ height: '12px', background: '#f3f4f6', borderRadius: '6px', marginBottom: '16px', width: '90%' }}></div>
                <div className="content-line third" style={{ height: '12px', background: '#f3f4f6', borderRadius: '6px', marginBottom: '16px', width: '60%' }}></div>
              </div>
            </div>
            <div className="glass-card secondary-card" style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              position: 'absolute',
              top: '40px',
              right: '-20px',
              zIndex: 1,
              opacity: 0.6,
              width: '280px',
              height: '180px'
            }}></div>
            <div className="floating-shape shape-1" style={{
              position: 'absolute',
              borderRadius: '50%',
              filter: 'blur(60px)',
              zIndex: 0,
              opacity: 0.4,
              width: '300px',
              height: '300px',
              background: '#7c3aed',
              top: '-100px',
              right: '-50px'
            }}></div>
            <div className="floating-shape shape-2" style={{
              position: 'absolute',
              borderRadius: '50%',
              filter: 'blur(60px)',
              zIndex: 0,
              opacity: 0.4,
              width: '400px',
              height: '400px',
              background: '#3b82f6',
              bottom: '-150px',
              left: '-100px'
            }}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
