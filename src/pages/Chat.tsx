import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

const QUICK_REPLIES = [
  'Saturday morning works!',
  'How about the park at 10am?',
  'Can we meet this weekend?',
  'What treats does your pup like?',
  "Let's exchange numbers!",
  'Juhu Beach this Sunday?',
];

export default function Chat() {
  const { dogId } = useParams();
  const navigate = useNavigate();
  const { matches, chats, sendMessage } = useApp();
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const match = matches.find((m) => m.dog.id === dogId);
  const messages = match ? chats[match.id] || [] : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!match) {
    return (
      <div className="app-shell">
        <div className="empty-state" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p>Match not found</p>
          <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => navigate('/matches')}>
            Back to Matches
          </button>
        </div>
      </div>
    );
  }

  const handleSend = (msg?: string) => {
    const toSend = msg || text;
    if (!toSend.trim()) return;
    sendMessage(match.id, toSend);
    setText('');
  };

  return (
    <div className="app-shell">
      <div className="chat-page">
        <div className="chat-header">
          <button className="back-btn" onClick={() => navigate('/matches')}>
            <ArrowLeft size={22} />
          </button>
          <img src={match.dog.photos[0]} alt={match.dog.name} />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)' }}>{match.dog.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {match.dog.owner.name} · {match.dog.owner.neighborhood}
            </div>
          </div>
        </div>

        <div className="chat-messages">
          <div style={{ textAlign: 'center', padding: '12px 0', fontSize: 12, color: 'var(--text-muted)' }}>
            You matched with {match.dog.name}! Plan your meetup below.
          </div>
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="chat-quick-replies">
          {QUICK_REPLIES.map((q) => (
            <button key={q} className="quick-reply" onClick={() => handleSend(q)}>
              {q}
            </button>
          ))}
        </div>

        <div className="chat-input-bar">
          <input
            placeholder="Plan your meetup..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="btn btn-primary" style={{ padding: '12px 16px', borderRadius: '50%' }} onClick={() => handleSend()}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
