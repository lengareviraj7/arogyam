import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axios';

const AdminDashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = async () => {
    try {
      const res = await api.get('/admin/hospitals');
      // Backend wraps response as { total, hospitals }
      setHospitals(res.data.hospitals || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleAction = async (id, action) => {
    try {
      if (action === 'approve') await api.put(`/admin/approve/${id}`);
      else await api.put(`/admin/reject/${id}`);
      fetchHospitals(); // refresh
    } catch (err) {
      alert('Action failed');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="heading-gradient" style={{ marginBottom: '2rem' }}>Admin Control Panel</h2>
      
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--secondary-color)' }}>Loading requests...</div>
      ) : hospitals.length === 0 ? (
        <div className="glass-panel text-center" style={{ color: 'var(--text-secondary)', padding: '3rem' }}>
          No hospitals found.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {hospitals.map((hosp, i) => (
            <motion.div 
              key={hosp._id || i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel" 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
            >
              <div>
                <h3 style={{ color: hosp.status === 'approved' ? 'var(--success)' : hosp.status === 'rejected' ? 'var(--danger)' : 'var(--text-primary)' }}>
                  {hosp.hospitalName}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Reg: {hosp.regNumber} &nbsp;|&nbsp; Email: {hosp.email}
                </p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>
                  Status: <span style={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 600,
                    color: hosp.status === 'approved' ? 'var(--success)' : hosp.status === 'rejected' ? 'var(--danger)' : '#f1c40f'
                  }}>{hosp.status}</span>
                </p>
              </div>
              
              {hosp.status === 'pending' && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="primary-btn" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => handleAction(hosp._id, 'approve')}>
                    ✓ Approve
                  </button>
                  <button className="secondary-btn" style={{ padding: '8px 16px', fontSize: '0.9rem', borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={() => handleAction(hosp._id, 'reject')}>
                    ✕ Reject
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
