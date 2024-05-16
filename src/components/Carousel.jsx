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
import Link from "next/link";
import TodoPopover from "@/components/TodoPopover";
import NotesSidebar from "@/components/NotesSidebar";
import LivePopover from "@/components/LivePopover";
import CallPopover from "@/components/CallPopover";
import SettingSidebar from "@/components/SettingSidebar";

export default function CarouselBottom({ howToTag, joined, setJoined, tags, reply }) {
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
            {joined ? <h3>Name</h3> : ""}
            <div className="flex justify-around items-center py-2">
              <MusicPopover joined={joined}>
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
            <Separator className="h-1 bg-black" />
            <div className="flex justify-center items-center py-3">
              <Link href={{pathname: "/ask", query: {mode: 'focus'} }}>
                <Image
                  src={"/icons/speaker.svg"}
                  width={40}
                  height={40}
                  alt="speaker"
                />
              </Link>
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
            <Separator className="h-1 bg-black" />
            <div className="flex justify-around items-center py-4">
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
              <SettingSidebar />
            </div>
            <Separator className="h-1 bg-black" />
            <div className="flex justify-center items-center py-3">
              {joined ? (
                <CallPopover>
                <div className="flex gap-1">
                  <Image
                    src={"/icons/phone.svg"}
                    width={45}
                    height={45}
                    alt="phone"
                    className="cursor-pointer"
                  />
                  <Image
                    src={"/icons/up.svg"}
                    width={45}
                    height={45}
                    alt="up"
                    className="cursor-pointer"
                  />
                </div>
                </CallPopover>
              ) : (
                <LivePopover
                  howToTag={howToTag}
                  tags={tags}
                  reply={reply}
                  setJoined={setJoined}
                >
                  <Image
                    src={"/icons/broadcast.svg"}
                    width={50}
                    height={50}
                    alt="broadcast"
                    className="cursor-pointer"
                  />
                </LivePopover>
              )}
            </div>
          </div>
        </CarouselItem>
        {camera
          ? Array.from(Array(7).keys()).map((i) => (
              <CarouselItem key={i} className="basis-1/2 md:basis-1/3 ">
                <div
                  style={{ backgroundImage: `url(/images/slide-${i + 1}.jpg)` }}
                  className="p-1 pt-8 bg-no-repeat bg-center bg-cover h-[10.6rem] rounded-md"
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
