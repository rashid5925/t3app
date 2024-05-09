import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
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
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
            <div className="flex justify-around items-center py-2">
              <Image
                src={"/icons/music_note.svg"}
                width={60}
                height={60}
                alt="music note"
              />
              <Image
                src={"/icons/stopwatch.svg"}
                width={60}
                height={60}
                alt="stopwatch"
              />
            </div>
            <div className="flex justify-center items-center py-2">
              <Image
                src={"/icons/speaker.svg"}
                width={60}
                height={60}
                alt="speaker"
              />
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
            <div className="flex justify-around items-center py-2">
              <Image
                src={"/icons/music_note.svg"}
                width={60}
                height={60}
                alt="music note"
              />
              <Image
                src={"/icons/stopwatch.svg"}
                width={60}
                height={60}
                alt="stopwatch"
              />
            </div>
            <div className="flex justify-center items-center py-2">
              <Image
                src={"/icons/speaker.svg"}
                width={60}
                height={60}
                alt="speaker"
              />
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
            <div className="flex justify-around items-center py-2">
              <Image
                src={"/icons/music_note.svg"}
                width={60}
                height={60}
                alt="music note"
              />
              <Image
                src={"/icons/stopwatch.svg"}
                width={60}
                height={60}
                alt="stopwatch"
              />
            </div>
            <div className="flex justify-center items-center py-2">
              <Image
                src={"/icons/speaker.svg"}
                width={60}
                height={60}
                alt="speaker"
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
