export interface ChildSettings {
    id: string; 
    showTimer: boolean;
    showRanking: boolean;
    enableLifeLoss: boolean;
    jumpDifficulty: boolean;
    adaptDifficulty: boolean;
    preferredWordLength: number;
    clearWordAfterRecovery: boolean;
    wordWritingTime: number;
    wordDifficulty: 'Facile' | 'Moyen' | 'Difficile';
    minWordLength?: number;
    maxWordLength?: number;
    simplifyGameAfter?: number;
  }