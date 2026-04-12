import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaLock, FaFileMedicalAlt, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

const Landing = () => {
  // Animation variants
  const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

  return (
    <div style={{ paddingBottom: '4rem', overflowX: 'hidden' }}>
      
      {/* ───── Hero Section (Conversational, Warm) ───── */}
      <section style={{ 
        minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        textAlign: 'center', padding: '2rem', position: 'relative'
      }}>
        {/* Soft, organic background blob shape */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '70vw', height: '60vw', background: 'radial-gradient(ellipse at center, rgba(255,117,140,0.08) 0%, rgba(250,249,246,0) 70%)',
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', zIndex: -1, pointerEvents: 'none'
        }} />

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '800px' }}>
          <motion.div variants={fadeIn} style={{ marginBottom: '1.5rem' }}>
            <span style={{ 
              background: 'rgba(255, 117, 140, 0.1)', color: '#e03a71', padding: '8px 20px', 
              borderRadius: '999px', fontSize: '0.9rem', fontWeight: 600
            }}>
              Welcome to better healthcare
            </span>
          </motion.div>
          <motion.h1 
            className="heading-gradient" variants={fadeIn}
            style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 1.05, marginBottom: '2rem' }}
          >
            Your medical history,<br/>
            <span className="warm-gradient">simplified.</span>
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '550px', margin: '0 auto 3.5rem auto' }}
          >
            Keep your prescriptions, reports, and doctor visits in one secure place. Share them easily, but only with the people you trust.
          </motion.p>
          <motion.div variants={fadeIn} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/patient/register" className="primary-btn" style={{ padding: '16px 36px', fontSize: '1.1rem', background: 'linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)' }}>
              Let's get started <FaArrowRight style={{ fontSize: '0.9rem' }} />
            </Link>
            <Link to="/hospital/register" className="secondary-btn" style={{ padding: '16px 36px', fontSize: '1.1rem', border: 'none', background: 'rgba(0,0,0,0.03)', boxShadow: 'none' }}>
              I'm a doctor
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── Organic Storytelling (Zig-Zag Layout) ───── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem 8rem 2rem' }}>
        
        {/* Story 1 */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem', marginBottom: '8rem' }}
        >
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ 
              background: '#f2f2f7', borderRadius: '32px 32px 32px 8px', padding: '1.5rem', width: 'fit-content', marginBottom: '1.5rem' 
            }}>
              <FaFileMedicalAlt style={{ fontSize: '2.5rem', color: '#ff758c' }} />
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>No more carrying bulky files.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6 }}>
              Whether it's an old x-ray or a new prescription, it all lives securely in your pocket. When you visit a new doctor, your entire medical timeline is ready in seconds, ensuring you get the best and most accurate care.
            </p>
          </div>
          <div className="glass-panel" style={{ flex: '1 1 400px', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255, 117, 140, 0.05)' }} />
            <div style={{ background: '#faf9f6', padding: '1.5rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', marginBottom: '1rem' }}>
              <div style={{ width: '40%', height: '12px', background: '#e5e5ea', borderRadius: '6px', marginBottom: '1rem' }} />
              <div style={{ width: '100%', height: '8px', background: '#f2f2f7', borderRadius: '4px', marginBottom: '0.5rem' }} />
              <div style={{ width: '80%', height: '8px', background: '#f2f2f7', borderRadius: '4px' }} />
            </div>
            <div style={{ background: '#faf9f6', padding: '1.5rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '30%', height: '12px', background: '#e5e5ea', borderRadius: '6px', marginBottom: '1rem' }} />
              <div style={{ width: '90%', height: '8px', background: '#f2f2f7', borderRadius: '4px', marginBottom: '0.5rem' }} />
              <div style={{ width: '70%', height: '8px', background: '#f2f2f7', borderRadius: '4px' }} />
            </div>
          </div>
        </motion.div>

        {/* Story 2 (Swapped Sides) */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
          style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '4rem', marginBottom: '8rem' }}
        >
          <div className="glass-panel" style={{ flex: '1 1 400px', padding: '4rem 3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1d1d1f' }}>
             <div style={{ textAlign: 'center', color: 'white' }}>
               <FaLock style={{ fontSize: '4rem', color: '#34c759', marginBottom: '1.5rem' }} />
               <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>Access Granted</div>
               <div style={{ opacity: 0.6, fontSize: '0.9rem', marginTop: '0.5rem' }}>via Secure OTP</div>
             </div>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ 
              background: '#e8f5e9', borderRadius: '32px 32px 8px 32px', padding: '1.5rem', width: 'fit-content', marginBottom: '1.5rem' 
            }}>
              <FaShieldAlt style={{ fontSize: '2.5rem', color: '#34c759' }} />
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Private by default.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6 }}>
              You hold the keys. Doctors can't peek at your records just by searching your name. You must grant them temporary access via a simple, secure One-Time Password sent directly to your phone.
            </p>
          </div>
        </motion.div>

        {/* Story 3 */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}
        >
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ 
              background: '#e3f2fd', borderRadius: '32px 8px 32px 32px', padding: '1.5rem', width: 'fit-content', marginBottom: '1.5rem' 
            }}>
              <FaHeart style={{ fontSize: '2.5rem', color: '#007aff' }} />
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>The doctors you trust.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6 }}>
              We ensure every hospital on the platform is legally vetted and registered with the government. Your health data is only ever shared with real, verified professionals working to keep you healthy.
            </p>
          </div>
          <div className="glass-panel" style={{ flex: '1 1 400px', padding: '3rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f2f2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aeaeb2', fontSize: '1.5rem' }}>🏥</div>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f2f2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aeaeb2', fontSize: '1.2rem', alignSelf: 'flex-end' }}>👨‍⚕️</div>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#f2f2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aeaeb2', fontSize: '2rem' }}>👩‍⚕️</div>
          </div>
        </motion.div>
      </section>

      {/* ───── Footer ───── */}
      <footer style={{
        maxWidth: '1200px', margin: '4rem auto 0 auto', padding: '2rem',
        borderTop: '1px solid var(--border-light)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem'
      }}>
        <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.2rem' }}>
          Health<span style={{ color: '#ff758c' }}>ID</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} HealthID India. Made with care.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/patient/register" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Join Now</Link>
          <Link to="/hospital/register" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Provider Partners</Link>
          <Link to="/admin/login" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Admin</Link>
        </div>
      </footer>

    </div>
  );
};

export default Landing;


