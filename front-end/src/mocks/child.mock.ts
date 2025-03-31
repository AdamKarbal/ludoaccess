import { Child } from '../models/child.model';

export const CHILD_LIST: Child[] = [
  {
    id: '1',
    firstName: 'Olivier',
    lastName: 'Boulet',
    imageUrl: '../assets/ressources/e4.jpg',
    level: 3,
    lastPlayed: new Date('2023-05-15')
  },
  {
    id: '2',
    firstName: 'Ali',
    lastName: 'Madandar Arari',
    imageUrl: '../assets/ressources/e2.jpg',
    level: 5,
    lastPlayed: new Date('2023-06-20')
  },
  {
    id: '3',
    firstName: 'Raphaël',
    lastName: 'Laborie',
    level: 2,
    lastPlayed: new Date('2023-04-10')
  },
  {
    id: '4',
    firstName: 'Clément',
    lastName: 'Menou',
    imageUrl: '../assets/ressources/e3.jpg',
    level: 7
  },
  {
    id: '5',
    firstName: 'azeaze',
    lastName: 'Madzkoa',
    level: 1,
    lastPlayed: new Date('2023-07-01')
  }
];