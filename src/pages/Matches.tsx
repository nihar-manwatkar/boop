import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

export default function Matches() {
  const navigate = useNavigate();
  const { matches } = useApp();

  return (
    <div className="app-shell">
      <div className="page matches-page">
        <h2 className="page-title">Matches</h2>
        <p className="page-subtitle">
          {matches.length} boop{matches.length !== 1 ? 's' : ''} so far
        </p>

        {matches.length === 0 ? (
          <div className="empty-state">
            <div className="emoji">💛</div>
            <h3>No matches yet</h3>
            <p>Keep swiping to find play dates for your pup!</p>
          </div>
        ) : (
          matches.map((match) => (
            <div
              key={match.id}
              className="match-item"
              onClick={() => navigate(`/chat/${match.dog.id}`)}
            >
              <img src={match.dog.photos[0]} alt={match.dog.name} />
              <div className="match-item-info">
                <h4>{match.dog.name}</h4>
                <p>
                  {match.dog.owner.name} · {match.dog.owner.neighborhood}
                </p>
              </div>
              <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: 20 }}>💬</span>
            </div>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}
