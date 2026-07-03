import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup(email || 'demo@boop.app', name || 'Pet Parent');
    navigate('/setup');
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
        <h1>Join BOOP</h1>
        <p>Find play dates for your pup in Mumbai</p>
      </div>

      <form className="auth-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label className="form-label">Your Name</label>
          <input
            className="form-input"
            type="text"
            placeholder="What should we call you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
          Create Account
        </button>
      </form>

      <div className="auth-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </motion.div>
  );
}
