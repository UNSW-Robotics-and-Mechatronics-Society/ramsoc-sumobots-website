import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./Sheet";
import Logo from "../Logo";
import NavLinks from "./NavLinks";

const NavSheet = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="flex h-full items-center lg:hidden">
          <Logo logoName="arc" size={80} className="self-start" />
          <div className="p-[26px]">
            <Menu className="h-7 w-7" />
          </div>
        </SheetTrigger>
        <SheetContent className="bg-black">
          <SheetTitle />
          <SheetDescription />
          <SheetHeader>
            <NavLinks size="lg" orientation="vertical" className="gap-4" />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavSheet;
