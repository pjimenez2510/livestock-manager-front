import { Farm } from "@/features/farms/interfaces/farm.interface";
import { UserRole } from "@/features/users/interfaces/user.interface";
import { CiGrid42 } from "react-icons/ci";
import { GiCow } from "react-icons/gi";
import { IconType } from "react-icons/lib";
import { LuCalendar } from "react-icons/lu";
import { TbVaccine, TbPaw } from "react-icons/tb";

interface Submenu {
  href: string;
  label: string;
  active: boolean;
  roles: Set<UserRole>;
}

interface Menu {
  href: string;
  label: string;
  active: boolean;
  roles: Set<UserRole>;
  icon: IconType;
  submenus: Submenu[];
}

interface Group {
  groupLabel: string;
  menus: Menu[];
}

const menuCache = new Map<string, Group[]>();

const createFarmUrl = (idFarm: number | undefined, path: string) =>
  `/management/farm/${idFarm}/${path}`;

const isPathActive = (pathname: string, path: string) =>
  pathname.startsWith(path);

const createSubmenu = (
  href: string,
  label: string,
  pathname: string,
  roles: UserRole[]
): Submenu => ({
  href,
  label,
  active: isPathActive(pathname, href),
  roles: new Set(roles),
});

const getAllMenuList = (pathname: string, farm?: Farm): Group[] => {
  const cacheKey = `${pathname}-${farm?.id}`;

  const cachedMenu = menuCache.get(cacheKey);
  if (cachedMenu) {
    return cachedMenu;
  }

  const idFarm = farm?.id;
  const defaultRoles = [UserRole.Admin, UserRole.User];

  if (!idFarm) {
    return createAdminMenu(pathname);
  }

  const allMenus: Group[] = [
    {
      groupLabel: farm.name ?? "",
      menus: [
        {
          href: createFarmUrl(idFarm, "lot"),
          label: "Lotes",
          active: isPathActive(pathname, createFarmUrl(idFarm, "lot")),
          roles: new Set(defaultRoles),
          icon: CiGrid42,
          submenus: [
            createSubmenu(
              createFarmUrl(idFarm, "lot/list"),
              "Listar",
              pathname,
              defaultRoles
            ),
            createSubmenu(
              createFarmUrl(idFarm, "lot/create"),
              "Crear",
              pathname,
              defaultRoles
            ),
          ],
        },
        {
          href: createFarmUrl(idFarm, "animal"),
          label: "Animales",
          active: isPathActive(pathname, createFarmUrl(idFarm, "animal")),
          roles: new Set(defaultRoles),
          icon: GiCow,
          submenus: [
            createSubmenu(
              createFarmUrl(idFarm, "animal/list"),
              "Listar",
              pathname,
              defaultRoles
            ),
            createSubmenu(
              createFarmUrl(idFarm, "animal/create"),
              "Crear",
              pathname,
              defaultRoles
            ),
          ],
        },
      ],
    },
    ...createAdminMenu(pathname),
  ];

  menuCache.set(cacheKey, allMenus);
  return allMenus;
};

const createAdminMenu = (pathname: string): Group[] => {
  const defaultRoles = [UserRole.Admin, UserRole.User];

  return [
    {
      groupLabel: "Administración",
      menus: [
        {
          href: "/management/vaccine",
          label: "Vacunas",
          active: isPathActive(pathname, "/management/vaccine"),
          roles: new Set(defaultRoles),
          icon: TbVaccine,
          submenus: [
            createSubmenu(
              "/management/vaccine/list",
              "Listar",
              pathname,
              defaultRoles
            ),
            createSubmenu(
              "/management/vaccine/create",
              "Crear",
              pathname,
              defaultRoles
            ),
          ],
        },
        {
          href: "/management/breed",
          label: "Razas",
          active: isPathActive(pathname, "/management/breed"),
          roles: new Set(defaultRoles),
          icon: TbPaw,
          submenus: [
            createSubmenu(
              "/management/breed/list",
              "Listar",
              pathname,
              defaultRoles
            ),
            createSubmenu(
              "/management/breed/create",
              "Crear",
              pathname,
              defaultRoles
            ),
          ],
        },
        {
          href: "/management/agenda",
          label: "Agenda",
          active: isPathActive(pathname, "/management/agenda"),
          roles: new Set(defaultRoles),
          icon: LuCalendar,
          submenus: [],
        },
      ],
    },
  ];
};

export const getMenuList = (
  pathname: string,
  role?: UserRole,
  farm?: Farm
): Group[] => {
  if (!role) return [];

  const allMenus = getAllMenuList(pathname, farm);

  return allMenus
    .map((group) => ({
      ...group,
      menus: group.menus
        .filter((menu) => menu.roles.has(role))
        .map((menu) => ({
          ...menu,
          submenus: menu.submenus.filter((submenu) => submenu.roles.has(role)),
        })),
    }))
    .filter((group) => group.menus.length > 0);
};
