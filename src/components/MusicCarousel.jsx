import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";
import sounds from "@/components/sounds";
import CardMusic from "@/components/CardMusic";
import { useEffect } from "react";

export default function MusicCarousel() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const combinedData = {};
    for (const item of sounds) {
      const { sound, variantName, ...rest } = item; 
      if (!combinedData[sound]) {
        combinedData[sound] = { sound, variantNames: [], ...rest };
      }
      combinedData[sound].variantNames.push(variantName);
    }
    setData(Object.values(combinedData));
  }, []);
  if (!data) {
    return <></>
  }
  return (
    <div className="h-80 overflow-y-auto">
      <h3 className="mt-1 mb-0">Locations</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="mb-1">
          {data
            .filter((item) => item.group === "Locations")
            .map((item, i) => (
              <div className="p-1 flex flex-col">
                <div className="flex justify-around items-center">
                  <CarouselItem className="basis-1/2 md:basis-1/3 ">
                    <CardMusic key={i} data={item} />
                  </CarouselItem>
                </div>
              </div>
            ))}
        </CarouselContent>
      </Carousel>
      <h3 className="mt-1 mb-0">Background</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="mb-1">
          {data
            .filter((item) => item.group === "Background")
            .map((item, i) => (
              <div className="p-1 flex flex-col">
                <div className="flex justify-around items-center">
                  <CarouselItem className="basis-1/2 md:basis-1/3 ">
                    <CardMusic key={i} data={item} />
                  </CarouselItem>
                </div>
              </div>
            ))}
        </CarouselContent>
      </Carousel>
      <h3 className="mt-1 mb-0">Tweak</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="mb-1">
          {data
            .filter((item) => item.group === "Tweak")
            .map((item, i) => (
              <div className="p-1 flex flex-col">
                <div className="flex justify-around items-center">
                  <CarouselItem className="basis-1/2 md:basis-1/3 ">
                    <CardMusic key={i} data={item} />
                  </CarouselItem>
                </div>
              </div>
            ))}
        </CarouselContent>
      </Carousel>
      <h3 className="mt-1 mb-0">Color Noise</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="mb-1">
          {data
            .filter((item) => item.group.toLowerCase() === "color noise")
            .map((item, i) => (
              <div className="p-1 flex flex-col">
                <div className="flex justify-around items-center">
                  <CarouselItem className="basis-1/2 md:basis-1/3 ">
                    <CardMusic key={i} data={item} />
                  </CarouselItem>
                </div>
              </div>
            ))}
        </CarouselContent>
      </Carousel>
      <h3 className="mt-1 mb-0">Others</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="mb-1">
          {data
            .filter((item) => item.group === "Others")
            .map((item, i) => (
              <div className="p-1 flex flex-col">
                <div className="flex justify-around items-center">
                  <CarouselItem className="basis-1/2 md:basis-1/3 ">
                    <CardMusic key={i} data={item} />
                  </CarouselItem>
                </div>
              </div>
            ))}
        </CarouselContent>
      </Carousel>
      <h3 className="mt-1 mb-0">ASMR</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="mb-1">
          {data
            .filter((item) => item.group === "ASMR")
            .map((item, i) => (
              <div className="p-1 flex flex-col">
                <div className="flex justify-around items-center">
                  <CarouselItem className="basis-1/2 md:basis-1/3 ">
                    <CardMusic key={i} data={item} />
                  </CarouselItem>
                </div>
              </div>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
