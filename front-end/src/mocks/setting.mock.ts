// setting.mock.ts
import { ChildSettings } from '../models/setting.model';

export const CHILD_SETTINGS: { [key: string]: ChildSettings } = {
  '1': {
    id: '1',
    showTimer: true,
    showRanking: true,
    enableLifeLoss: false,
    jumpDifficulty: true,
    clearWordAfterRecovery: true,
    wordWritingTime: 45,
    preferredWordLength: 6,
    wordDifficulty: 'Moyen'
  },
  '2': {
    id: '2',
    showTimer: false,
    showRanking: false,
    enableLifeLoss: true,
    jumpDifficulty: false,
    clearWordAfterRecovery: false,
    wordWritingTime: 60,
    minWordLength: 4,
    maxWordLength: 8,
    preferredWordLength: 10,
    wordDifficulty: 'Difficile'
  },
  '3': {
    id: '3',
    showTimer: true,
    showRanking: true,
    enableLifeLoss: false,
    jumpDifficulty: false,
    clearWordAfterRecovery: true,
    wordWritingTime: 30,
    preferredWordLength: 5,
    simplifyAfterMinutes: 15,
    wordDifficulty: 'Facile'
  },
  '4': {
    id: '4',
    showTimer: true,
    showRanking: true,
    enableLifeLoss: true,
    jumpDifficulty: true,
    clearWordAfterRecovery: false,
    wordWritingTime: 50,
    minWordLength: 5,
    maxWordLength: 10,
    preferredWordLength: 8,
    wordDifficulty: 'Moyen'
  }
};