import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function CarouselBottom() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="mb-1">
        <CarouselItem className="basis-1/2 md:basis-1/3 ">
          <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
            <div className="flex justify-around items-center py-2">
              <Image
                src={"/icons/music_note.svg"}
                width={55}
                height={55}
                alt="music note"
              />
              <Image
                src={"/icons/stopwatch.svg"}
                width={55}
                height={55}
                alt="stopwatch"
              />
            </div>
            <div className="flex justify-center items-center py-3">
              <Image
                src={"/icons/speaker.svg"}
                width={60}
                height={60}
                alt="speaker"
              />
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 ">
          <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
            <div className="flex justify-around items-center py-2">
              <Image
                src={"/icons/todo.svg"}
                width={62}
                height={62}
                alt="to do list"
              />
              <Image
                src={"/icons/notes.svg"}
                width={62}
                height={62}
                alt="notes"
              />
            </div>
            <div className="flex justify-center items-center py-4">
              <Image
                src={"/icons/group.svg"}
                width={70}
                height={70}
                alt="group"
              />
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 ">
          <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
            <div className="flex justify-around items-center py-2">
              <Image
                src={"/icons/eye_open.svg"}
                width={60}
                height={60}
                alt="eye open"
              />
              <Image
                src={"/icons/setting.svg"}
                width={60}
                height={60}
                alt="setting"
              />
            </div>
            <div className="flex justify-center items-center py-3">
              <Image
                src={"/icons/broadcast.svg"}
                width={80}
                height={80}
                alt="broadcast"
              />
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
