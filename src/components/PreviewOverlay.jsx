"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ExcaliCanvas from "@/components/excalidraw/ExcaliCanvas";
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

const PerviewOverlay = () => {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  return (
    <div className="m-5 min-h-screen flex flex-col items-center">
      <div className="flex flex-col gap-7 fixed top-10 right-10 z-50">
        <Image
          src={"/icons/no.svg"}
          width={30}
          height={30}
          alt="no"
          className="cursor-pointer"
        />
        <Image
          src={"/icons/double_tick.svg"}
          width={30}
          height={30}
          alt="double_tick"
          className="cursor-pointer"
        />
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
              <Button variant="outline">Sending to</Button>
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
        <ExcaliCanvas height="94vh" width="97vw" />
      </div>
      <div className="flex w-full justify-center fixed w-screen h-screen bottom-0 z-10">
        {typeof window !== 'undefined' ?
        <Rnd
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0",
          }}
          default={{
            x: 0,
            y: size.height - 200,
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
                src={"/icons/pause.svg"}
                width={36}
                height={36}
                alt="camera"
                className="cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faRotateRight}
                style={{ width: "35px", height: "30px" }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </Rnd> : <></> }
      </div>
    </div>
  );
};

export default PerviewOverlay;
