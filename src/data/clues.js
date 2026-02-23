// Clue tracking system
export const CLUE_TYPES = {
  RECORDING_3_OPENED: 'recording_3_opened',
  NOTES_UNLOCKED: 'notes_unlocked',
  GALLERY_OPENED: 'gallery_opened',
  MAPS_WEST_VIEWED: 'maps_west_viewed',
  FILES_OPENED: 'files_opened',
  VOICE_RECORDER_OPENED: 'voice_recorder_opened'
};

export const CLUE_REQUIREMENTS = [
  CLUE_TYPES.VOICE_RECORDER_OPENED,
  CLUE_TYPES.NOTES_UNLOCKED,
  CLUE_TYPES.GALLERY_OPENED,
  CLUE_TYPES.MAPS_WEST_VIEWED,
  CLUE_TYPES.FILES_OPENED,
  CLUE_TYPES.RECORDING_3_OPENED
];

export const SOLUTION_STEPS = [
  'Go to Lakeview Public Garden',
  'Find Bench #17 — West Side',
  'Take 4 steps left',
  'Count 11 pavement tiles',
  'Lift the 4th tile',
  'The pen drive is sealed in plastic underneath.'
];

export const SOLUTION_TWIST = 
  '"If you\'re watching this… you solved it. That means you\'re ready. Now decide — expose them, or join them."';

export const ENDINGS = {
  EXPOSED: {
    title: 'THE TRUTH EMERGED',
    text: 'Your evidence reached the authorities. The corruption network crumbled. Riya testified. The case made headlines.\n\nBut some files remain unexplained. Some contacts were never found.\n\nTo Be Continued…'
  },
  JOINED: {
    title: 'POWER CORRUPTS',
    text: 'You chose the other side. The network welcomed you. Your skills matched their hunger.\n\nYou now guard secrets instead of exposing them.\n\nTo Be Continued…'
  }
};
