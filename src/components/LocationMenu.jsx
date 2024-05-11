import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LocationMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={"/icons/location.svg"}
          width={40}
          height={40}
          alt="location"
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Workspace</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <span>Forest</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Cafe</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Beach</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <span>Wellness room</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Breakroom</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocationMenu;
