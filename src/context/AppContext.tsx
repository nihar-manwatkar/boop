import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserProfile, Match, ChatMessage, Filters, DogProfile } from '../types';

interface AppState {
  isLoggedIn: boolean;
  user: UserProfile;
  matches: Match[];
  chats: Record<string, ChatMessage[]>;
  filters: Filters;
  swipedIds: string[];
  login: (email: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
  updateUser: (user: Partial<UserProfile>) => void;
  skipSetup: () => void;
  setFilters: (filters: Filters) => void;
  swipeDog: (dog: DogProfile, liked: boolean) => boolean;
  sendMessage: (matchId: string, text: string) => void;
}

const defaultUser: UserProfile = {
  dog: {},
  owner: {},
  setupComplete: false,
};

const defaultFilters: Filters = {
  maxDistanceKm: 10,
  purposes: [],
};

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = 'boop-state';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

function saveState(state: Partial<{ isLoggedIn: boolean; user: UserProfile; matches: Match[]; chats: Record<string, ChatMessage[]>; filters: Filters; swipedIds: string[] }>) {
  const existing = loadState() || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...state }));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const saved = loadState();

  const [isLoggedIn, setIsLoggedIn] = useState(saved?.isLoggedIn ?? false);
  const [user, setUser] = useState<UserProfile>(saved?.user ?? defaultUser);
  const [matches, setMatches] = useState<Match[]>(saved?.matches ?? []);
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>(saved?.chats ?? {});
  const [filters, setFiltersState] = useState<Filters>(saved?.filters ?? defaultFilters);
  const [swipedIds, setSwipedIds] = useState<string[]>(saved?.swipedIds ?? []);

  useEffect(() => {
    saveState({ isLoggedIn, user, matches, chats, filters, swipedIds });
  }, [isLoggedIn, user, matches, chats, filters, swipedIds]);

  const login = (email: string) => {
    setIsLoggedIn(true);
    setUser((u) => ({ ...u, owner: { ...u.owner, name: u.owner.name || email.split('@')[0] } }));
  };

  const signup = (_email: string, name: string) => {
    setIsLoggedIn(true);
    setUser({ dog: {}, owner: { name }, setupComplete: false });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(defaultUser);
    setMatches([]);
    setChats({});
    setSwipedIds([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (partial: Partial<UserProfile>) => {
    setUser((u) => ({ ...u, ...partial, setupComplete: true }));
  };

  const skipSetup = () => {
    setUser((u) => ({ ...u, setupComplete: true }));
  };

  const setFilters = (f: Filters) => setFiltersState(f);

  const swipeDog = (dog: DogProfile, liked: boolean): boolean => {
    setSwipedIds((ids) => [...ids, dog.id]);

    // ~40% match rate for demo
    const isMatch = liked && Math.random() < 0.4;
    if (isMatch) {
      const match: Match = { id: `match-${dog.id}`, dog, matchedAt: new Date().toISOString() };
      setMatches((m) => [...m, match]);
      setChats((c) => ({
        ...c,
        [match.id]: [
          {
            id: 'welcome',
            matchId: match.id,
            sender: 'them',
            text: `Hey! ${dog.owner.name} here — ${dog.name} would love to meet up! When works for you? 🐾`,
            timestamp: new Date().toISOString(),
          },
        ],
      }));
    }
    return isMatch;
  };

  const sendMessage = (matchId: string, text: string) => {
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      matchId,
      sender: 'me',
      text,
      timestamp: new Date().toISOString(),
    };
    setChats((c) => ({ ...c, [matchId]: [...(c[matchId] || []), msg] }));

    // Simulated reply after 1.5s
    setTimeout(() => {
      const replies = [
        'Saturday morning at the park sounds perfect!',
        'How about 10am at Juhu Beach? Bruno loves it there.',
        'I can bring treats — what does your pup like?',
        'Let me check my calendar and get back to you!',
        'Sounds great! Should we exchange numbers?',
      ];
      const reply: ChatMessage = {
        id: `msg-${Date.now()}-reply`,
        matchId,
        sender: 'them',
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toISOString(),
      };
      setChats((c) => ({ ...c, [matchId]: [...(c[matchId] || []), reply] }));
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        matches,
        chats,
        filters,
        swipedIds,
        login,
        signup,
        logout,
        updateUser,
        skipSetup,
        setFilters,
        swipeDog,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
