import Link from "next/link";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { MenuIcon, Vegan } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Menu } from "./menu";
import FarmList from "@/features/farms/presentation/components/farm-list";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <VisuallyHidden.Root>
        <SheetTitle>Menu</SheetTitle>
      </VisuallyHidden.Root>
      <SheetDescription className="hidden">Menu de navegación</SheetDescription>
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader>
          <Button
            className="flex items-center justify-center pt-1"
            variant="link"
            asChild
          >
            <Link href="/management/farm" className="flex items-center gap-2">
              <Vegan className="mr-1 h-6 w-6" />
              <h1 className="text-lg font-bold">RanchApp</h1>
            </Link>
          </Button>
        </SheetHeader>
        <FarmList />
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
