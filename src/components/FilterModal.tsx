import { useState } from 'react';
import type { Filters, MeetPurpose } from '../types';
import { PURPOSES } from '../data/purposes';

interface FilterModalProps {
  filters: Filters;
  onApply: (filters: Filters) => void;
  onClose: () => void;
}

export default function FilterModal({ filters, onApply, onClose }: FilterModalProps) {
  const [local, setLocal] = useState<Filters>({ ...filters });

  const togglePurpose = (id: MeetPurpose) => {
    setLocal((f) => ({
      ...f,
      purposes: f.purposes.includes(id)
        ? f.purposes.filter((p) => p !== id)
        : [...f.purposes, id],
    }));
  };

  return (
    <div className="filter-modal" onClick={onClose}>
      <div className="filter-sheet" onClick={(e) => e.stopPropagation()}>
        <h3>Find your next boop</h3>

        <div className="form-group">
          <label className="form-label">Distance · {local.maxDistanceKm} km</label>
          <input
            type="range"
            className="distance-slider"
            min={1}
            max={25}
            value={local.maxDistanceKm}
            onChange={(e) => setLocal({ ...local, maxDistanceKm: Number(e.target.value) })}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
            <span>1 km</span>
            <span>25 km</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Looking for</label>
          <div className="purpose-grid">
            {PURPOSES.map((p) => (
              <div
                key={p.id}
                className={`purpose-chip ${local.purposes.includes(p.id) ? 'selected' : ''}`}
                onClick={() => togglePurpose(p.id)}
              >
                <span className="emoji">{p.emoji}</span>
                <span className="label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 16 }}
          onClick={() => {
            onApply(local);
            onClose();
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
