export type MeetPurpose =
  | 'playdate'
  | 'park-buddy'
  | 'breed-social'
  | 'owner-hangout'
  | 'training'
  | 'puppy-social';

export interface OwnerProfile {
  name: string;
  age: number;
  bio: string;
  photos: string[];
  neighborhood: string;
}

export interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: number;
  size: 'small' | 'medium' | 'large';
  energy: 'chill' | 'moderate' | 'high';
  bio: string;
  photos: string[];
  traits: string[];
  purposes: MeetPurpose[];
  distanceKm: number;
  owner: OwnerProfile;
}

export interface UserProfile {
  dog: Partial<DogProfile>;
  owner: Partial<OwnerProfile>;
  setupComplete: boolean;
}

export interface Match {
  id: string;
  dog: DogProfile;
  matchedAt: string;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  sender: 'me' | 'them';
  text: string;
  timestamp: string;
}

export interface Filters {
  maxDistanceKm: number;
  purposes: MeetPurpose[];
}
