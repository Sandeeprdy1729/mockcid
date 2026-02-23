// Password configuration - abstracted for security
export const PASSWORDS = {
  LOCK_SCREEN: '1028',
  NOTES_APP: '0411',
  GALLERY_APP: 'PLAIN',
  CHAT_APP: 'RailwayCafe',
  FILES_APP: '0028'
};

export const PASSWORD_HINTS = {
  LOCK_SCREEN: 'The bench remembers.',
  NOTES_APP: 'Our anniversary.',
  GALLERY_APP: 'Plain sight.',
  CHAT_APP: 'Where we first met.',
  FILES_APP: 'Battery low.'
};

export const PASSWORD_CONFIG = {
  notes: {
    password: PASSWORDS.NOTES_APP,
    hint: PASSWORD_HINTS.NOTES_APP,
    maxAttempts: 3,
    lockoutDuration: 20000
  },
  gallery: {
    password: PASSWORDS.GALLERY_APP,
    hint: PASSWORD_HINTS.GALLERY_APP,
    maxAttempts: 3,
    lockoutDuration: 20000
  },
  chat: {
    password: PASSWORDS.CHAT_APP,
    hint: PASSWORD_HINTS.CHAT_APP,
    maxAttempts: 3,
    lockoutDuration: 20000
  },
  files: {
    password: PASSWORDS.FILES_APP,
    hint: PASSWORD_HINTS.FILES_APP,
    maxAttempts: 3,
    lockoutDuration: 20000
  }
};
