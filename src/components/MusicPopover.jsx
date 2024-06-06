"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import MusicCarousel from "@/components/MusicCarousel";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MusicPopover({ joined, children }) {
  const [volume, setVolume] = useState(50);
  const [play, setPlay] = useState(false);
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className={joined ? "w-96 rounded-[40px]" : "w-80 rounded-[40px]"}
      >
        <div className={joined ? "" : "grid gap-4"}>
          {joined ? <MusicCarousel /> : <></>}
          <div className="flex gap-2 justify-around items-center">
            <Image src={"/icons/left.svg"} width={25} height={25} alt="left" />
            <Separator
              className="h-20 border-dashed border-black border-2 bg-transparent mx-2"
              orientation="vertical"
            />
            <Image
              src={`/icons/${play? "play": "pause"}.svg`}
              width={25}
              height={25}
              alt="pause"
              onClick={() => setPlay(!play)}
            />
            <Separator
              className="h-20 border-dashed border-black border-2 bg-transparent mx-2"
              orientation="vertical"
            />
            <Image
              src={"/icons/right.svg"}
              width={25}
              height={25}
              alt="right"
            />
            <Separator
              className="h-20 border-dashed border-black border-2 bg-transparent mx-2"
              orientation="vertical"
            />
            <Image
              src={"/icons/gear.svg"}
              width={35}
              height={35}
              alt="settings"
            />
          </div>
          <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
          <div className="flex gap-2 justify-center items-center">
            {volume === 0 ? (
              <FontAwesomeIcon
                onClick={() => setVolume(10)}
                size="xl"
                className="cursor-pointer"
                icon="fa-solid fa-volume-xmark"
              />
            ) : (
              <>
              <Image
                src={"/icons/volume.svg"}
                width={35}
                height={35}
                alt="volume"
              />
              <input
              type="range"
              min={0}
              max={100}
              step={2}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              name=""
              id=""
            /></>
            )}
            
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
