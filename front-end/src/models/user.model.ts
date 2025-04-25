export type UserRole = 'child' | 'ergo';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  role: UserRole;
}
