import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import { PURPOSE_LABELS } from '../data/purposes';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const dog = user.dog;
  const owner = user.owner;

  return (
    <div className="app-shell">
      <div className="page setup-page">
        <h2 className="page-title">My Profile</h2>

        <div className="setup-section dog-section">
          <h3>🐕 {dog.name || 'Your Pup'}</h3>
          <p className="section-sub">{dog.breed || 'Add your dog\'s details'}</p>
          {dog.photos?.[0] && (
            <img
              src={dog.photos[0]}
              alt={dog.name}
              style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }}
            />
          )}
          {dog.bio && <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{dog.bio}</p>}
          {dog.purposes && dog.purposes.length > 0 && (
            <div className="swipe-card-tags" style={{ marginTop: 12 }}>
              {dog.purposes.map((p) => (
                <span key={p} className="tag purpose">
                  {PURPOSE_LABELS[p]}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="setup-section">
          <h3>👤 {owner.name || 'You'}</h3>
          <p className="section-sub">{owner.neighborhood || 'Mumbai'}</p>
          {owner.photos?.[0] && (
            <img
              src={owner.photos[0]}
              alt={owner.name}
              style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%', marginBottom: 12 }}
            />
          )}
          {owner.bio && <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{owner.bio}</p>}
        </div>

        <button className="btn btn-outline" style={{ width: '100%', marginBottom: 12 }} onClick={() => navigate('/setup')}>
          Edit Profile
        </button>
        <button
          className="btn btn-ghost"
          style={{ width: '100%', marginBottom: 40, color: 'var(--pass)' }}
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Log Out
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
