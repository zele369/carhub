import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import NavItems from "./NavItems";
import { Separator } from "@radix-ui/react-separator";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <Image src="/assets/icons/menu.svg" alt="menu icon" width={24} height={24} className="cursor-pointer"/>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
            <Image 
                src="/logo.svg"
                alt="logo"
                width={138}
                height={38}
            />
            <Separator className="border border-gray-50"/>

            <NavItems/>
          </SheetContent>
        </Sheet>
    </nav>
  );
};

export default MobileNav;
