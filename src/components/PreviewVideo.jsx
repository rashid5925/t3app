"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const PreviewVideo = () => {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [play, setPlay] = useState(false);
  const [yes, setYes] = useState(false);
  return (
    <div className="m-5 min-h-screen flex flex-col items-center">
      <div className="flex flex-col gap-7 fixed top-10 right-10 z-50 bg-white rounded-lg p-2">
        <Image
          src={`/icons/${yes? "yes": "no"}.svg`}
          width={30}
          height={30}
          alt="no"
          onClick={() => setYes(!yes)}
          className="cursor-pointer"
        />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <Image
          src={"/icons/double_tick.svg"}
          width={30}
          height={30}
          alt="double_tick"
          className="cursor-pointer"
        />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <Image
          src={"/icons/volume.svg"}
          width={30}
          height={30}
          alt="volume"
          className="cursor-pointer"
        />
      </div>
      <div className="flex justify-center w-full z-30">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sending to{" "}<pre>  </pre>
              <Image src={`/icons/down.svg`} width={20} height={20} alt="up" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sending to</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Recepients 1
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Recepients 1
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Recepients 3
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="z-0">
        <video autoPlay muted loop>
          <source src="/video.mp4" />
        </video>
      </div>
      <div className="flex w-full justify-center fixed w-screen h-screen bottom-0 z-10" style={{ pointerEvents: "none" }}>
        {typeof window !== "undefined" ? (
          <Rnd
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "solid 1px #ddd",
              background: "#f0f0f0",
              pointerEvents: "all",
              borderRadius: "30px"
            }}
            default={{
              x: 0,
              y: window.innerHeight - 200,
              width: 320,
              height: 200,
            }}
          >
            <div className="flex flex-col justify-around items-center w-full h-full">
              <p>Draggable</p>
              <div className="flex justify-around items-center py-3 w-full">
                <FontAwesomeIcon
                  icon={faRotateLeft}
                  style={{ width: "35px", height: "30px" }}
                  className="cursor-pointer"
                />
                <Image
                  src={`/icons/${play? "play": "pause"}.svg`}
                  width={36}
                  height={36}
                  alt="camera"
                  onClick={() => setPlay(!play)}
                  className="cursor-pointer"
                />
                <FontAwesomeIcon
                  icon={faRotateRight}
                  style={{ width: "35px", height: "30px" }}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </Rnd>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PreviewVideo;
