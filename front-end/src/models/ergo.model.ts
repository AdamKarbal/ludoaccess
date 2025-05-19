import { User } from './user.model';

export interface Ergo extends User {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  age?: number;
  role: 'ergo';
}
