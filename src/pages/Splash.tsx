import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 3200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-page" onClick={() => navigate('/login')}>
      <motion.div
        className="splash-bg-circle"
        style={{ width: 320, height: 320, background: '#ffd43b', top: -100, right: -100 }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="splash-bg-circle"
        style={{ width: 240, height: 240, background: '#ff8fab', bottom: 40, left: -80 }}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="splash-bg-circle"
        style={{ width: 160, height: 160, background: '#38d9c0', top: '40%', right: -40 }}
        animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, delay: 0.2 }}
        style={{ textAlign: 'center', zIndex: 1 }}
      >
        <motion.span
          style={{ fontSize: 80, display: 'block' }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🐾
        </motion.span>
        <motion.h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            letterSpacing: -2,
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ff9f43 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          BOOP
        </motion.h1>
        <motion.p
          style={{ color: '#5c5c5c', fontSize: 16, marginTop: 10, fontWeight: 500 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Play dates for pups in Mumbai
        </motion.p>
      </motion.div>

      <motion.p
        style={{ position: 'absolute', bottom: 40, color: '#9a9a9a', fontSize: 13 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Tap anywhere to continue
      </motion.p>
    </div>
  );
}
