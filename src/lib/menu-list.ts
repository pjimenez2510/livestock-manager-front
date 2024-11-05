import { Farm } from "@/features/farms/interfaces/farm.interface";
import { UserRole } from "@/features/users/interfaces/user.interface";
import { CiGrid42 } from "react-icons/ci";
import { GiCow } from "react-icons/gi";
import { IconType } from "react-icons/lib";
import { TbVaccine } from "react-icons/tb";
import { TbPaw } from "react-icons/tb";

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
  icon: IconType;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

const getAllMenuList = (pathname: string, farm?: Farm) => {
  const idFarm = farm?.id;
  const nameFarm = farm?.name;
  const allMenus: Group[] = [
    {
      groupLabel: `${nameFarm}`,
      menus: [
        {
          href: `/management/farm/${idFarm}/lot`,
          label: "Lotes",
          active: pathname.startsWith(`/management/farm/${idFarm}/lot`),
          roles: [UserRole.Admin, UserRole.User],
          icon: CiGrid42,
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
          href: `/management/farm/${idFarm}/animal`,
          label: "Animales",
          active: pathname.startsWith(`/management/farm/${idFarm}/animal`),
          roles: [UserRole.Admin, UserRole.User],
          icon: GiCow,
          submenus: [
            {
              href: `/management/farm/${idFarm}/animal/list`,
              label: "Listar",
              active: pathname.startsWith(
                `/management/farm/${idFarm}/animal/list`
              ),
              roles: [UserRole.Admin, UserRole.User],
            },
            {
              href: `/management/farm/${idFarm}/animal/create`,
              label: "Crear",
              active: pathname.startsWith(
                `/management/farm/${idFarm}/animal/create`
              ),
              roles: [UserRole.Admin, UserRole.User],
            },
          ],
        },
      ],
    },

    {
      groupLabel: "Administración",
      menus: [
        {
          href: "/management/vaccine",
          label: "Vacunas",
          active: pathname.startsWith("/management/vaccine"),
          roles: [UserRole.Admin, UserRole.User],
          icon: TbVaccine,
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
        {
          href: "/management/breed",
          label: "Razas",
          active: pathname.startsWith("/management/breed"),
          roles: [UserRole.Admin, UserRole.User],
          icon: TbPaw,
          submenus: [
            {
              href: "/management/breed/list",
              label: "Listar",
              active: pathname.startsWith("/management/breed/list"),
              roles: [UserRole.Admin, UserRole.User],
            },
            {
              href: "/management/breed/create",
              label: "Crear",
              active: pathname.startsWith("/management/breed/create"),
              roles: [UserRole.Admin, UserRole.User],
            },
          ],
        },
        {
          href: "/management/agenda",
          label: "Agenda",
          active: pathname.startsWith("/management/agenda"),
          roles: [UserRole.Admin, UserRole.User],
          icon: TbPaw,
          submenus: [],
        },
      ],
    },
  ];
  return allMenus;
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
