export interface User {
  _id: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;

  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
}
