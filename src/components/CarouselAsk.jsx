import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import MusicPopover from "@/components/MusicPopover";
import TimerPopover from "@/components/TimerPopover";
import { useEffect, useState } from "react";
import TodoPopover from "@/components/TodoPopover";
import NotesSidebar from "@/components/NotesSidebar";

export default function CarouselAsk() {
  const [timer, setTimer] = useState(1500);
  const [status, setStatus] = useState(false);
  const [camera, setCamera] = useState(false);
  const [eyeClosed, setEyeClosed] = useState(false);

  useEffect(() => {
    let interval = null;
    if (status) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer((timer) => timer - 1);
        } else {
          clearInterval(interval);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [status]);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[90%]"
    >
      <CarouselContent className="mb-1">
        <CarouselItem className="basis-1/2 md:basis-1/3 ">
          <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
            <div className="flex justify-around items-center py-2">
              <MusicPopover joined={false}>
                <Image
                  src={"/icons/music_note.svg"}
                  width={35}
                  height={35}
                  alt="music note"
                  className="cursor-pointer"
                />
              </MusicPopover>
              <TimerPopover
                time={{ timer, setTimer }}
                status={{ status, setStatus }}
              >
                {!status ? (
                  <Image
                    src={"/icons/stopwatch.svg"}
                    width={35}
                    height={35}
                    alt="stopwatch"
                    className="cursor-pointer"
                  />
                ) : (
                  <span className="countdown font-mono text-2xl">
                    <span
                      style={{
                        "--value": ("0" + Math.floor((timer / 60) % 60)).slice(
                          -2
                        ),
                      }}
                    ></span>
                  </span>
                )}
              </TimerPopover>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 ">
          <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
            <div className="flex justify-around items-center py-2">
              <TodoPopover>
                <Image
                  src={"/icons/todo.svg"}
                  width={48}
                  height={48}
                  alt="to do list"
                  className="cursor-pointer"
                />
              </TodoPopover>
              <NotesSidebar />
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 ">
          <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
            <div className="flex justify-around items-center py-2">
              <Image
                src={`/icons/eye_${eyeClosed ? "close" : "open"}.svg`}
                width={47}
                height={47}
                alt="eye open"
                className="cursor-pointer"
                onClick={() => setEyeClosed(!eyeClosed)}
              />
              <div>
                {camera ? <Separator className="h-1 bg-black" /> : ""}
                <Image
                  src={"/icons/group.svg"}
                  width={!camera ? 36 : 32}
                  height={!camera ? 36 : 32}
                  alt="group"
                  className="cursor-pointer"
                  onClick={() => setCamera(!camera)}
                />
              </div>
              {camera ? (
                <Image
                  src={"/icons/camera.svg"}
                  width={36}
                  height={36}
                  alt="camera"
                  className="cursor-pointer"
                  onClick={() => setCamera(!camera)}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </CarouselItem>
        {camera
          ? Array.from(Array(7).keys()).map((i) => (
              <CarouselItem key={i} className="basis-1/2 md:basis-1/3 ">
                <div
                  style={{ backgroundImage: `url(/images/slide-${i + 1}.jpg)` }}
                  className="p-1 pt-8 bg-no-repeat bg-center bg-cover h-[6.3rem] rounded-md"
                ></div>
              </CarouselItem>
            ))
          : ""}
      </CarouselContent>
      {camera ? (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      ) : (
        ""
      )}
    </Carousel>
  );
}
