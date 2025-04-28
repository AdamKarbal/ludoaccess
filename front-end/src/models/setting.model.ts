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
    displaymotsec: number;
    choosefont: 'Lucky Boy' | 'Nintendo' | 'Arial' | 'Comic Sans MS' | 'Courier New' | 'Georgia' | 'Times New Roman' | 'Verdana' | 'Calibri' | 'cursif ecriture A' | 'cursif ecriture B' | 'Minecraft';
    chooseBackGround : 'Forest' | 'Blue_earth' | 'Orange_earth' | 'Aléatoire';
    lettersize: number;
  }