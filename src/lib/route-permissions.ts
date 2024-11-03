import { UserRole } from "@/features/users/interfaces/user.interface";
import { pathToRegexp } from "path-to-regexp";

interface RoutesPrivate {
  path: string;
  roles: UserRole[];
}

const routes: RoutesPrivate[] = [
  {
    path: "/management/farm/list",
    roles: [UserRole.Admin, UserRole.User],
  },
  {
    path: "/management/farm/create",
    roles: [UserRole.Admin, UserRole.User],
  },
  {
    path: "/management/farm/edit/:id",
    roles: [UserRole.Admin, UserRole.User],
  },
  {
    path: "/management/farm/:id/lot/list",
    roles: [UserRole.Admin, UserRole.User],
  },
  {
    path: "/management/farm/:id/lot/create",
    roles: [UserRole.Admin, UserRole.User],
  },
  {
    path: "/management/farm/:id/lot/edit/:id",
    roles: [UserRole.Admin, UserRole.User],
  },
  {
    path: "/management/farm/:id/animal/list",
    roles: [UserRole.Admin, UserRole.User],
  },
  {
    path: "/management/farm/:id/animal/create",
    roles: [UserRole.Admin, UserRole.User],
  },
  {
    path: "/management/farm/:id/animal/edit/:id",
    roles: [UserRole.Admin, UserRole.User],
  },
];

interface RoleAllowed {
  path: boolean;
  role: boolean;
}

export function isRoleAllowed(path: string, role?: string): RoleAllowed {
  const route = routes.find((route) => {
    const regex = pathToRegexp(route.path);
    return regex.regexp.test(path);
  });

  if (!route) return { path: false, role: false };

  return { path: true, role: route.roles.includes(role as UserRole) };
}
