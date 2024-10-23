import { UserRole } from "@/features/users/interfaces/user.interface";
import { Grid2X2, LucideIcon, Syringe } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  roles: UserRole[];
};

type Menu = {
  href: string;
  label: string;

  active: boolean;
  roles: UserRole[];
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

const getAllMenuList = (pathname: string, idFarm?: number) => {
  const allMenus: Group[] = [
    {
      groupLabel: "Módulos",
      menus: [
        {
          href: `/management/farm/${idFarm}/lot`,
          label: "Lotes",
          active: pathname.startsWith(`/management/farm/${idFarm}/lot`),
          roles: [UserRole.Admin, UserRole.User],
          icon: Grid2X2,
          submenus: [
            {
              href: `/management/farm/${idFarm}/lot/list`,
              label: "Listar",
              active: pathname.startsWith(
                `/management/farm/${idFarm}/lot/list`
              ),
              roles: [UserRole.Admin, UserRole.User],
            },
            {
              href: `/management/farm/${idFarm}/lot/create`,
              label: "Crear",
              active: pathname.startsWith(
                `/management/farm/${idFarm}/lot/create`
              ),
              roles: [UserRole.Admin, UserRole.User],
            },
          ],
        },
        {
          href: "/management/vaccine",
          label: "Vacunas",
          active: pathname.startsWith("/management/vaccine"),
          roles: [UserRole.Admin, UserRole.User],
          icon: Syringe,
          submenus: [
            {
              href: "/management/vaccine/list",
              label: "Listar",
              active: pathname.startsWith("/management/vaccine/list"),
              roles: [UserRole.Admin, UserRole.User],
            },
            {
              href: "/management/vaccine/create",
              label: "Crear",
              active: pathname.startsWith("/management/vaccine/create"),
              roles: [UserRole.Admin, UserRole.User],
            },
          ],
        },
      ],
    },
  ];
  return allMenus;
};

export const getMenuList = (
  pathname: string,
  role?: UserRole,
  farmId?: number
): Group[] => {
  if (!role) return [];

  const allMenus = getAllMenuList(pathname, farmId);

  return allMenus
    .map((group) => ({
      ...group,
      menus: group.menus
        .filter((menu) => menu.roles.includes(role))
        .map((menu) => ({
          ...menu,
          submenus: menu.submenus.filter((submenu) =>
            submenu.roles.includes(role)
          ),
        })),
    }))
    .filter((group) => group.menus.length > 0);
};
