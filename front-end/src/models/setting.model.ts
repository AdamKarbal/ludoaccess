export interface ChildSettings {
    id: string; // id enfant
    showTimer: boolean;
    showRanking: boolean;
    enableLifeLoss: boolean;
    jumpDifficulty: boolean;
    preferredWordLength: number;
    clearWordAfterRecovery: boolean;
    wordWritingTime: number;
    wordDifficulty: 'Facile' | 'Moyen' | 'Difficile';
    minWordLength?: number;
    maxWordLength?: number;
    simplifyAfterMinutes?: number;
  }