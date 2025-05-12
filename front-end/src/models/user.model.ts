export type UserRole = 'child' | 'ergo';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  role: UserRole;
}
