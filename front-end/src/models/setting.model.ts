export interface ChildSettings {
    id: number; 
    showTimer: boolean;
    showRanking: boolean;
    enableLifeLoss: boolean;
    jumpDifficulty: boolean;
    adaptDifficulty: boolean;
    clearWordAfterRecovery: boolean;
    displaymotsec:number;
    wordWritingTime: number;
    wordDifficulty: 'Facile' | 'Moyen' | 'Difficile';
    simplifyGameAfter?: number;
    choosefont: 'Lucky Boy' | 'Nintendo' | 'Arial' | 'Comic Sans MS' | 'Courier New' | 'Georgia' | 'Times New Roman' | 'Verdana' | 'Calibri' | 'cursif ecriture A' | 'cursif ecriture B' | 'Minecraft';
    chooseBackGround : 'Forest' | 'Blue_earth' | 'Orange_earth' | 'Aléatoire';
    lettersize: 'Petit' | 'Moyen' | 'Grand';
    numberOfWords: number;
  }