import { User } from './user.model';

export interface Ergo extends User {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  age?: number;
  role: 'ergo';
}
