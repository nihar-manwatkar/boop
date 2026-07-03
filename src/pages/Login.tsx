import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'demo@boop.app');
    const saved = localStorage.getItem('boop-state');
    const setupComplete = saved ? JSON.parse(saved).user?.setupComplete : false;
    navigate(setupComplete ? '/discover' : '/setup');
  };

  return (
    <motion.div
      className="auth-page"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="auth-logo">
        <span className="paw">🐾</span>
        <h1>BOOP</h1>
        <p>Welcome back, pet parent!</p>
      </div>

      <form className="auth-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
          Log In
        </button>
      </form>

      <div className="auth-footer">
        New here? <Link to="/signup">Create an account</Link>
      </div>
    </motion.div>
  );
}
