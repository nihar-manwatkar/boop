import { useNavigate, useLocation } from 'react-router-dom';
import { Flame, MessageCircle, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { matches } = useApp();

  const tabs = [
    { path: '/discover', icon: Flame, label: 'Discover' },
    { path: '/matches', icon: MessageCircle, label: 'Matches', badge: matches.length },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(({ path, icon: Icon, label, badge }) => {
        const active = location.pathname === path;
        return (
          <button
            key={path}
            className={`nav-item ${active ? 'active' : ''}`}
            onClick={() => navigate(path)}
            style={{ position: 'relative' }}
          >
            <Icon size={22} />
            {label}
            {badge ? <span className="nav-badge">{badge}</span> : null}
          </button>
        );
      })}
    </nav>
  );
}
