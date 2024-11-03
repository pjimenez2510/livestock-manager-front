import Link from "next/link";

import { useSidebarToggle } from "@/core/hooks/use-sidebar-toggle";
import { useStore } from "@/core/hooks/use-store";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { Menu } from "./menu";
import { SidebarToggle } from "./sidebar-toggle";
import FarmList from "@/features/farms/presentation/components/farm-list";
import { PiFarm } from "react-icons/pi";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "mb-1 transition-transform duration-300 ease-in-out",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <PiFarm className="mr-1 h-6 w-6" />
            <h1
              className={cn(
                "whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
                sidebar?.isOpen === false
                  ? "hidden -translate-x-96 opacity-0"
                  : "translate-x-0 opacity-100"
              )}
            >
              RanchApp
            </h1>
          </Link>
        </Button>
        <FarmList></FarmList>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
