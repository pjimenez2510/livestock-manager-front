import { UserRole } from "@/features/users/interfaces/user.interface";

export const routesRedirectAuth: Record<UserRole, string> = {
  ADMIN: "/management/farm",
  USER: "/management/farm",
};
