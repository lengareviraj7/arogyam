import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaEnvelope, FaLock } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Hardcoded admin credentials check (matches .env)
    if (email === 'admin@healthid.com' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ maxWidth: '400px', margin: '4rem auto' }}
    >
      <div className="glass-panel">
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <FaShieldAlt style={{ fontSize: '3rem', color: 'var(--danger)', marginBottom: '1rem' }} />
          <h2 className="heading-gradient">Admin Access</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Restricted area. Authorized personnel only.
          </p>
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="input-group">
            <label>Admin Email</label>
            <div style={{ position: 'relative', marginTop: '0.5rem' }}>
              <FaEnvelope style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type="email" 
                className="glass-input" 
                style={{ paddingLeft: '45px' }} 
                placeholder="admin@healthid.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <div style={{ position: 'relative', marginTop: '0.5rem' }}>
              <FaLock style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type="password" 
                className="glass-input" 
                style={{ paddingLeft: '45px' }} 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>

          <button type="submit" className="primary-btn" disabled={loading} style={{ width: '100%', marginTop: '0.5rem' }}>
            {loading ? 'Authenticating...' : 'Login to Admin Panel'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
