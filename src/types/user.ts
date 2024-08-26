export interface User {
  _id: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  pendingChanges: number;
  approvedChanges: number;
  rejectedChanges: number;
}

export enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
}
