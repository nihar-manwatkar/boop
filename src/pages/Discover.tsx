import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Heart, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DOG_PROFILES } from '../data/dogs';
import SwipeCard from '../components/SwipeCard';
import MatchModal from '../components/MatchModal';
import FilterModal from '../components/FilterModal';
import BottomNav from '../components/BottomNav';
import type { DogProfile } from '../types';

export default function Discover() {
  const navigate = useNavigate();
  const { filters, setFilters, swipedIds, swipeDog } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [matchedDog, setMatchedDog] = useState<DogProfile | null>(null);

  const availableDogs = useMemo(() => {
    return DOG_PROFILES.filter((dog) => {
      if (swipedIds.includes(dog.id)) return false;
      if (dog.distanceKm > filters.maxDistanceKm) return false;
      if (filters.purposes.length > 0 && !filters.purposes.some((p) => dog.purposes.includes(p))) return false;
      return true;
    });
  }, [swipedIds, filters]);

  const visibleCards = availableDogs.slice(0, 3);

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      const dog = availableDogs[0];
      if (!dog) return;

      const liked = direction === 'right';
      const isMatch = swipeDog(dog, liked);
      if (isMatch) {
        setMatchedDog(dog);
      }
    },
    [availableDogs, swipeDog]
  );

  const triggerSwipe = (direction: 'left' | 'right') => {
    if (!availableDogs[0]) return;
    handleSwipe(direction);
  };

  return (
    <div className="app-shell">
      <div className="page-full">
        <div className="discover-header">
          <div>
            <h2>BOOP</h2>
            <div className="city">📍 Mumbai · {filters.maxDistanceKm} km radius</div>
          </div>
          <button className="filter-btn" onClick={() => setShowFilters(true)}>
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="card-stack">
          {visibleCards.length === 0 ? (
            <div className="empty-state" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="emoji">🐕</div>
              <h3>No more pups nearby</h3>
              <p>Try expanding your distance or changing your filters</p>
              <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => setShowFilters(true)}>
                Adjust Filters
              </button>
            </div>
          ) : (
            <AnimatePresence>
              {visibleCards
                .slice()
                .reverse()
                .map((dog, i) => {
                  const index = visibleCards.length - 1 - i;
                  return (
                    <SwipeCard
                      key={dog.id}
                      dog={dog}
                      index={index}
                      isTop={index === 0}
                      onSwipe={handleSwipe}
                    />
                  );
                })}
            </AnimatePresence>
          )}
        </div>

        <div className="action-bar">
          <button className="btn-icon btn-pass" onClick={() => triggerSwipe('left')} aria-label="Pass">
            <X size={28} />
          </button>
          <button className="btn-icon btn-super" onClick={() => triggerSwipe('right')} aria-label="Super like">
            <Star size={24} />
          </button>
          <button className="btn-icon btn-like" onClick={() => triggerSwipe('right')} aria-label="Like">
            <Heart size={28} fill="currentColor" />
          </button>
        </div>
      </div>

      <BottomNav />

      {showFilters && (
        <FilterModal filters={filters} onApply={setFilters} onClose={() => setShowFilters(false)} />
      )}

      <AnimatePresence>
        {matchedDog && (
          <MatchModal
            dog={matchedDog}
            onChat={() => {
              navigate(`/chat/${matchedDog.id}`);
              setMatchedDog(null);
            }}
            onKeepSwiping={() => setMatchedDog(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
