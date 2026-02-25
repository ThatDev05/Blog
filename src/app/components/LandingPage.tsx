import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Premium Hero Section */}
      <section className="hero-landing">
        <div className="container">
          <div className="hero-content">
            <h1 className="h1 hero-title">
              Insights, stories and <strong className="strong-gradient">ideas</strong> delivered to you.
            </h1>
            <p className="section-text">
              Join our community of 10,000+ writers and readers. Share your thoughts with the world and discover amazing stories every day.
            </p>
            
            <div className="cta-group">
              <Link href="/register" className="btn btn-primary">
                <span className="span">Get Started for Free</span>
                <IoArrowForwardOutline className="ion-icon" aria-hidden="true" />
              </Link>
              <Link href="/login" className="btn btn-secondary">
                <span className="span">Sign In</span>
              </Link>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="glass-card main-card">
              <div className="card-header">
                <div className="avatar-dot"></div>
                <div className="text-lines">
                  <div className="line short"></div>
                  <div className="line long"></div>
                </div>
              </div>
              <div className="card-content">
                <div className="content-line first"></div>
                <div className="content-line second"></div>
                <div className="content-line third"></div>
              </div>
            </div>
            <div className="glass-card secondary-card"></div>
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
          </div>
        </div>
      </section>

      {/* Styled JSX for Premium Aesthetics */}
      <style jsx>{`
        .landing-page {
          background-color: var(--background, #ffffff);
          min-height: calc(100vh - 100px);
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .hero-landing {
          padding-block: 80px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .hero-landing .container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 24px;
          color: var(--st-rich-black-fogra-29, #0d1117);
        }

        .strong-gradient {
          background: linear-gradient(135deg, #7c3aed 0%, #d946ef 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }

        .section-text {
          font-size: 1.25rem;
          line-height: 1.6;
          color: var(--st-sonic-silver, #707070);
          margin-bottom: 40px;
          max-width: 500px;
        }

        .cta-group {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: 50px;
          font-weight: 600;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
          color: white;
        }

        .btn-secondary {
          border: 2px solid #e5e7eb;
          color: var(--st-rich-black-fogra-29, #0d1117);
        }

        /* Hero Visuals */
        .hero-visual {
          position: relative;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          position: relative;
          z-index: 2;
        }

        .main-card {
          width: 380px;
          padding: 32px;
          animation: float 6s ease-in-out infinite;
        }

        .secondary-card {
          width: 280px;
          height: 180px;
          position: absolute;
          top: 40px;
          right: -20px;
          z-index: 1;
          opacity: 0.6;
          animation: float 8s ease-in-out infinite reverse;
        }

        .card-header {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
        }

        .avatar-dot {
          width: 48px;
          height: 48px;
          background: #e5e7eb;
          border-radius: 50%;
        }

        .text-lines .line {
          height: 8px;
          background: #f3f4f6;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .line.short { width: 80px; }
        .line.long { width: 140px; }

        .content-line {
          height: 12px;
          background: #f3f4f6;
          border-radius: 6px;
          margin-bottom: 16px;
        }

        .first { width: 100%; }
        .second { width: 90%; }
        .third { width: 60%; }

        /* Floating Shapes */
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          z-index: 0;
          opacity: 0.4;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          background: #7c3aed;
          top: -100px;
          right: -50px;
          animation: blob 10s infinite;
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          background: #3b82f6;
          bottom: -150px;
          left: -100px;
          animation: blob 15s infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @media (max-width: 1024px) {
          .hero-landing .container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-visual {
            display: none;
          }
          .hero-title {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
}
