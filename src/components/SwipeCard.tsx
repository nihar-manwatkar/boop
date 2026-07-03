import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import type { DogProfile } from '../types';
import { PURPOSE_LABELS } from '../data/purposes';

interface SwipeCardProps {
  dog: DogProfile;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
  index: number;
}

const SWIPE_THRESHOLD = 100;

export default function SwipeCard({ dog, onSwipe, isTop, index }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe('right');
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="swipe-card"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale: 1 - index * 0.04,
        top: index * 8,
        zIndex: 10 - index,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1 - index * 0.04, opacity: 1 }}
      exit={{ x: 300, opacity: 0, transition: { duration: 0.3 } }}
      whileDrag={{ cursor: 'grabbing' }}
    >
      <img src={dog.photos[0]} alt={dog.name} draggable={false} />

      {isTop && (
        <>
          <motion.div className="swipe-stamp like" style={{ opacity: likeOpacity }}>
            WOOF!
          </motion.div>
          <motion.div className="swipe-stamp nope" style={{ opacity: nopeOpacity }}>
            PASS
          </motion.div>
        </>
      )}

      <div className="swipe-card-overlay">
        <div className="swipe-card-info">
          <h3>
            {dog.name}, {dog.age}
          </h3>
          <div className="breed">
            {dog.breed} · {dog.distanceKm} km away
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', marginBottom: 4 }}>{dog.bio}</p>
          <div className="swipe-card-tags">
            {dog.purposes.slice(0, 3).map((p) => (
              <span key={p} className="tag purpose">
                {PURPOSE_LABELS[p]}
              </span>
            ))}
            {dog.traits.slice(0, 2).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div className="owner-peek">
            <img src={dog.owner.photos[0]} alt={dog.owner.name} />
            <span>
              {dog.owner.name}, {dog.owner.age} · {dog.owner.neighborhood}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
