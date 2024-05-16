import React from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import ExcaliCanvas from "@/components/excalidraw/ExcaliCanvas";
import KnowledgeSidebar from "@/components/KnowledgeSidebar";

export default function HomeInCall({ data }) {
  return (
    <>
      <div className="flex flex-col gap-7 fixed top-10 right-10">
        <Image
          src={`/icons/pause.svg`}
          width={25}
          height={25}
          alt="pause"
          priority
          className="cursor-pointer"
        />
        <Image
          src={`/icons/seek_back.svg`}
          width={30}
          height={30}
          alt="seek back"
          priority
          className="cursor-pointer"
        />
        <Sidebar />
        <KnowledgeSidebar data={data} />
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
