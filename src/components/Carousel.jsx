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

export default function CarouselBottom({
  howToTag,
  joined,
  setJoined,
  tags,
  reply,
  create,
  setCreate,
}) {
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
        <CarouselItem className="basis-1/3 " key={555555}>
          <div
            className={`p-1 flex flex-col md:gap-${
              joined ? "6" : "8"
            } pt-8 bg-gradient-to-r from-[#ffe259] to-[#ffa751] ms-2 rounded-[40px]`}
          >
            {joined ? <h3 className="text-center">Name</h3> : ""}
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
              <Separator
                className="h-20 border-dashed border-black border-2 bg-transparent mx-2"
                orientation="vertical"
              />
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
                  <span className="countdown font-mono text-4xl">
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
            <Separator className="h-0 border-dashed border-black border-2 bg-transparent" />
            <div className="flex justify-center items-center py-4">
              <Link href={{ pathname: "/ask", query: { mode: "focus" } }}>
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
        <CarouselItem className="basis-1/3" key={5555551}>
          <div
            className={`p-1 flex flex-col md:gap-${
              joined ? "6" : "8"
            } pt-8 bg-gradient-to-r from-[#00467F] to-[#A5CC82] ms-2 rounded-[40px]`}
          >
            {joined ? <h3 className="h-6"></h3> : ""}
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
              <Separator
                className="h-20 border-dashed border-black border-2 bg-transparent mx-2"
                orientation="vertical"
              />
              <NotesSidebar />
            </div>
            <Separator className="h-0 border-dashed border-black border-2 bg-transparent" />
            <div className="flex justify-around items-center py-4 pb-[1.25rem]">
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
                <>
                  <Separator
                    className="h-8 border-dashed border-black border-2 bg-transparent mx-2"
                    orientation="vertical"
                  />
                  <Image
                    src={"/icons/camera.svg"}
                    width={36}
                    height={36}
                    alt="camera"
                    className="cursor-pointer"
                    onClick={() => setCamera(!camera)}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/3" key={555553}>
          <div
            className={`p-1 flex flex-col md:gap-${
              joined ? "6" : "8"
            } pt-8 bg-gradient-to-r from-[#799F0C] to-[#ACBB78] ms-2 rounded-[40px]`}
          >
            {joined ? <h3 className="h-7"></h3> : ""}
            <div className="flex justify-around items-center py-2">
              <Image
                src={`/icons/eye_${eyeClosed ? "close" : "open"}.svg`}
                width={47}
                height={47}
                alt="eye open"
                className="cursor-pointer"
                onClick={() => setEyeClosed(!eyeClosed)}
              />
              <Separator
                className="h-20 border-dashed border-black border-2 bg-transparent mx-2"
                orientation="vertical"
              />
              <SettingSidebar />
            </div>
            <Separator className="h-0 border-dashed border-black border-2 bg-transparent" />
            <div className="flex justify-center items-center py-3 pb-[0.6rem]">
              {joined ? (
                <div className="flex gap-1">
                  <div className="border-2 border-red-900 border-dashed rounded-full bg-red-300 p-2">
                  <Image
                    src={"/icons/disconnect.svg"}
                    width={50}
                    height={50}
                    alt="phone"
                    className="cursor-pointer"
                  />
                  </div>
                  <CallPopover>
                    <Image
                      src={"/icons/up.svg"}
                      width={35}
                      height={35}
                      alt="up"
                      className="cursor-pointer"
                    />
                  </CallPopover>
                </div>
              ) : (
                <LivePopover
                  howToTag={howToTag}
                  tags={tags}
                  reply={reply}
                  setJoined={setJoined}
                  create={create}
                  setCreate={setCreate}
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
              <CarouselItem key={i} className="basis-1/3 ">
                <div
                  style={{ backgroundImage: `url(/images/slide-${i + 1}.jpg)` }}
                  className="p-1 pt-8 bg-no-repeat bg-center bg-cover h-[17.2rem] max-md:h-[13.2rem] rounded-[40px]"
                ></div>
              </CarouselItem>
            ))
          : ""}
      </CarouselContent>
      {camera || joined ? (
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
