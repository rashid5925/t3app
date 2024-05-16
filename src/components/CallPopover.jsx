import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function CallPopover({ children }) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex gap-4 justify-center items-center">
          <Image
            src={"/icons/camera.svg"}
            width={30}
            height={30}
            alt="camera"
            className="cursor-pointer"
          />
          <Separator
            className="w-1 h-16 bg-black mx-2"
            orientation="vertical"
          />
          <Image
            src={"/icons/mic.svg"}
            width={30}
            height={30}
            alt="mic"
            className="cursor-pointer"
          />
          <Separator
            className="w-1 h-16 bg-black mx-2"
            orientation="vertical"
          />
          <Image
            src={"/icons/screen.svg"}
            width={30}
            height={30}
            alt="screen"
            className="cursor-pointer"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
