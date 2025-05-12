import { User } from './user.model';

export interface Child extends User {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  level?: number;
  lastPlayed?: Date;
  playDuration?: number;
  frequency?: number;
  age?: number;
  role: 'child';
}
