"use client";
import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import ExcaliCanvas from "@/components/excalidraw/ExcaliCanvas";
import KnowledgeSidebar from "@/components/KnowledgeSidebar";
import { Separator } from "@/components/ui/separator";

export default function HomeInCall({ data }) {
  const [play, setPlay] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-4 fixed top-10 right-10 ">
        <Image
          src={`/icons/${play? "play": "pause"}.svg`}
          width={25}
          height={25}
          alt="pause"
          priority
          onClick={() => setPlay(!play)}
          className="cursor-pointer"
        />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <Image
          src={`/icons/seek_back.svg`}
          width={30}
          height={30}
          alt="seek back"
          priority
          className="cursor-pointer"
        />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <Sidebar />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <KnowledgeSidebar data={data} />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <div className="flex">
        <Image
          src={`/icons/cursor.svg`}
          width={15}
          height={15}
          alt="cursor"
          priority
          className="cursor-pointer"
        />
        <Image
          src={`/icons/hand_pointer.svg`}
          width={25}
          height={25}
          alt="hand pointer"
          priority
          className="cursor-pointer"
        />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <ExcaliCanvas />
      </div>
    </>
  );
};
