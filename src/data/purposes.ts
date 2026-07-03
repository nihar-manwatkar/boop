import type { MeetPurpose } from '../types';

export const PURPOSES: { id: MeetPurpose; label: string; emoji: string; desc: string }[] = [
  { id: 'playdate', label: 'Play Date', emoji: '🎾', desc: 'Let the pups run wild together' },
  { id: 'park-buddy', label: 'Park Buddy', emoji: '🌳', desc: 'Regular walks at the local park' },
  { id: 'breed-social', label: 'Breed Social', emoji: '🐕', desc: 'Meet dogs of the same breed' },
  { id: 'owner-hangout', label: 'Owner Hangout', emoji: '☕', desc: 'Coffee dates while pups play' },
  { id: 'training', label: 'Training Partner', emoji: '🎯', desc: 'Practice commands together' },
  { id: 'puppy-social', label: 'Puppy Social', emoji: '🐶', desc: 'Socialize young pups safely' },
];

export const PURPOSE_LABELS: Record<MeetPurpose, string> = Object.fromEntries(
  PURPOSES.map((p) => [p.id, p.label])
) as Record<MeetPurpose, string>;
