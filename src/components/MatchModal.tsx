import { motion } from 'framer-motion';
import type { DogProfile } from '../types';

interface MatchModalProps {
  dog: DogProfile;
  onChat: () => void;
  onKeepSwiping: () => void;
}

export default function MatchModal({ dog, onChat, onKeepSwiping }: MatchModalProps) {
  return (
    <motion.div
      className="match-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="match-content"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <h2>It's a Match!</h2>
        <p>
          You and {dog.name} are ready to meet up!
          <br />
          Say hi to {dog.owner.name} and plan your play date.
        </p>

        <div className="match-photos">
          <motion.img
            src={dog.photos[0]}
            alt={dog.name}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.span
            className="match-heart"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            🐾
          </motion.span>
          <motion.img
            src={dog.owner.photos[0]}
            alt={dog.owner.name}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
        </div>

        <button className="btn btn-primary" style={{ width: '100%', marginBottom: 12 }} onClick={onChat}>
          Send a Message
        </button>
        <button className="btn btn-ghost" onClick={onKeepSwiping}>
          Keep Swiping
        </button>
      </motion.div>
    </motion.div>
  );
}
