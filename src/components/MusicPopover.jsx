import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import MusicCarousel from "@/components/MusicCarousel";

export default function MusicPopover({ joined, children }) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className={joined ? "w-96" : "w-80"}>
        <div className={joined ? "" : "grid gap-4"}>
          {joined ? 
          <MusicCarousel />
          : <></>}
          <div className="flex gap-2 justify-around items-center">
            <Image
              src={"/icons/left.svg"} 
              width={25} 
              height={25} 
              alt="left" />
            <Image
              src={"/icons/pause.svg"}
              width={25}
              height={25}
              alt="pause"
            />
            <Image
              src={"/icons/right.svg"}
              width={25}
              height={25}
              alt="right"
            />
            <Image
              src={"/icons/gear.svg"}
              width={35}
              height={35}
              alt="settings"
            />
          </div>
          <div className="flex gap-2 justify-center items-center">
            <Image
              src={"/icons/volume.svg"}
              width={35}
              height={35}
              alt="settings"
            />
            <input type="range" min={0} max={100} step={2} name="" id="" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
