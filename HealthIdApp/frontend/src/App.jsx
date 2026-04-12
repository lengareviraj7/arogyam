import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useAuth, AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

// Layout
import Navbar from './components/Navbar';

// Public Pages
import Landing from './pages/Landing';

// Patient Pages
import PatientLogin from './pages/patient/PatientLogin';
import PatientRegister from './pages/patient/PatientRegister';
import PatientDashboard from './pages/patient/PatientDashboard';
import MyRecords from './pages/patient/MyRecords';
import MyConsents from './pages/patient/MyConsents';
import HealthCard from './pages/patient/HealthCard';

// Hospital Pages
import HospitalLogin from './pages/hospital/HospitalLogin';
import HospitalRegister from './pages/hospital/HospitalRegister';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import SearchPatient from './pages/hospital/SearchPatient';
import RequestConsent from './pages/hospital/RequestConsent';
import UploadRecord from './pages/hospital/UploadRecord';
import MyPatients from './pages/hospital/MyPatients';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected Routes wrappers
const ProtectedPatientRoute = ({ children }) => {
  const { user, role } = useAuth();
  if (!user || role !== 'patient') return <Navigate to="/patient/login" />;
  return children;
};

const ProtectedHospitalRoute = ({ children }) => {
  const { user, role } = useAuth();
  if (!user || role !== 'hospital') return <Navigate to="/hospital/login" />;
  return children;
};

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('adminAuth') === 'true';
  if (!isAdmin) return <Navigate to="/admin/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="bottom-right" richColors />
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                
                {/* Patient App Flow */}
                <Route path="/patient/login" element={<PatientLogin />} />
                <Route path="/patient/register" element={<PatientRegister />} />
                <Route path="/patient/dashboard" element={<ProtectedPatientRoute><PatientDashboard /></ProtectedPatientRoute>} />
                <Route path="/patient/records" element={<ProtectedPatientRoute><MyRecords /></ProtectedPatientRoute>} />
                <Route path="/patient/consents" element={<ProtectedPatientRoute><MyConsents /></ProtectedPatientRoute>} />
                <Route path="/patient/healthcard" element={<ProtectedPatientRoute><HealthCard /></ProtectedPatientRoute>} />

                {/* Hospital App Flow */}
                <Route path="/hospital/login" element={<HospitalLogin />} />
                <Route path="/hospital/register" element={<HospitalRegister />} />
                <Route path="/hospital/dashboard" element={<ProtectedHospitalRoute><HospitalDashboard /></ProtectedHospitalRoute>} />
                <Route path="/hospital/search" element={<ProtectedHospitalRoute><SearchPatient /></ProtectedHospitalRoute>} />
                <Route path="/hospital/consent" element={<ProtectedHospitalRoute><RequestConsent /></ProtectedHospitalRoute>} />
                <Route path="/hospital/upload" element={<ProtectedHospitalRoute><UploadRecord /></ProtectedHospitalRoute>} />
                <Route path="/hospital/patients" element={<ProtectedHospitalRoute><MyPatients /></ProtectedHospitalRoute>} />
                
                {/* Admin Flow */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
