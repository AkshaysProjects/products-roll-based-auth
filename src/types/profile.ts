import { User } from "@/types/user";

export interface Profile extends User {
  pendingChanges: number;
  approvedChanges: number;
  rejectedChanges: number;
}
