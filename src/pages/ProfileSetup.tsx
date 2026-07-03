import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { PURPOSES } from '../data/purposes';
import type { MeetPurpose } from '../types';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { updateUser, skipSetup } = useApp();

  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [dogBio, setDogBio] = useState('');
  const [purposes, setPurposes] = useState<MeetPurpose[]>([]);
  const [ownerName, setOwnerName] = useState('');
  const [ownerAge, setOwnerAge] = useState('');
  const [ownerBio, setOwnerBio] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const togglePurpose = (id: MeetPurpose) => {
    setPurposes((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const handleSubmit = () => {
    updateUser({
      dog: {
        name: dogName || 'My Pup',
        breed: dogBreed || 'Mixed Breed',
        age: Number(dogAge) || 2,
        bio: dogBio,
        purposes,
        photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80'],
      },
      owner: {
        name: ownerName || 'Pet Parent',
        age: Number(ownerAge) || 28,
        bio: ownerBio,
        neighborhood: neighborhood || 'Mumbai',
        photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'],
      },
      setupComplete: true,
    });
    navigate('/discover');
  };

  const handleSkip = () => {
    skipSetup();
    navigate('/discover');
  };

  return (
    <div className="page setup-page">
      <div className="setup-header">
        <h2>Set up your profile</h2>
        <p>Tell other pet parents about your pup — and a bit about you too!</p>
      </div>

      <motion.div
        className="setup-section dog-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>🐕 Your Dog's Profile</h3>
        <p className="section-sub">Primary focus — this is what others see first</p>

        <div className="photo-upload" style={{ marginBottom: 16 }}>
          📷
        </div>

        <div className="form-group">
          <label className="form-label">Dog's Name</label>
          <input className="form-input" placeholder="e.g. Bruno" value={dogName} onChange={(e) => setDogName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Breed</label>
          <input className="form-input" placeholder="e.g. Labrador" value={dogBreed} onChange={(e) => setDogBreed(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Age (years)</label>
          <input className="form-input" type="number" placeholder="3" value={dogAge} onChange={(e) => setDogAge(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">About your pup</label>
          <textarea className="form-input" placeholder="What makes your dog special?" value={dogBio} onChange={(e) => setDogBio(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Looking for</label>
          <div className="purpose-grid">
            {PURPOSES.map((p) => (
              <div
                key={p.id}
                className={`purpose-chip ${purposes.includes(p.id) ? 'selected' : ''}`}
                onClick={() => togglePurpose(p.id)}
              >
                <span className="emoji">{p.emoji}</span>
                <span className="label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="setup-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h3>👤 About You</h3>
        <p className="section-sub">So other parents know who they're meeting</p>

        <div className="photo-upload" style={{ marginBottom: 16 }}>
          🤳
        </div>

        <div className="form-group">
          <label className="form-label">Your Name</label>
          <input className="form-input" placeholder="Your name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Age</label>
          <input className="form-input" type="number" placeholder="28" value={ownerAge} onChange={(e) => setOwnerAge(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Neighborhood</label>
          <input className="form-input" placeholder="e.g. Bandra West" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">A little about you</label>
          <textarea className="form-input" placeholder="Help others feel comfortable meeting you" value={ownerBio} onChange={(e) => setOwnerBio(e.target.value)} />
        </div>
      </motion.div>

      <button className="btn btn-primary" style={{ width: '100%', marginBottom: 12 }} onClick={handleSubmit}>
        Let's Go!
      </button>
      <button className="btn btn-ghost" style={{ width: '100%', marginBottom: 40 }} onClick={handleSkip}>
        Skip for now
      </button>
    </div>
  );
}
