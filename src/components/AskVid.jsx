"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ExcaliCanvas from "@/components/excalidraw/ExcaliCanvas";
import { Separator } from "@/components/ui/separator";
import { Rnd } from "react-rnd";
import Link from "next/link";

const AskVid = () => {
  const [timer, setTimer] = useState(3);
  const [status, setStatus] = useState(0);
  const [drag, setDrag] = useState(false);
  const [play, setPlay] = useState(false);
  const [yes, setYes] = useState(false);
  
  useEffect(() => {
    let interval = null;
    if (status == 1) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer((timer) => (timer <= 0 ? setStatus(2) : timer - 1));
        } else {
          setStatus(2);
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
    <div className="m-5 min-h-screen flex flex-col items-center">
      <div className="flex flex-col gap-7 fixed top-10 right-10 z-50 bg-white rounded-lg p-2">
        <Image
          src={`/icons/${play? "play": "pause"}.svg`}
          width={30}
          height={30}
          alt="pause"
          onClick={() => setPlay(!play)}
          className="cursor-pointer"
        />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <Image
          src={"/icons/seek_back.svg"}
          width={30}
          height={30}
          alt="seek_back"
          className="cursor-pointer"
        />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <Image
          src={`/icons/${yes? "yes": "no"}.svg`}
          width={30}
          height={30}
          alt="no"
          onClick={() => setYes(!yes)}
          className="cursor-pointer"
        />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        {status == 2 ? (
          <Link href={{ pathname: "/preview", query: { mode: "overlay" } }}>
          <Image
            src={"/icons/double_tick.svg"}
            width={35}
            height={35}
            alt="double tick"
            className="cursor-pointer"
          />
        </Link>
        ) : (
          <Link href={{ pathname: "/preview", query: { mode: "image" } }}>
                <FontAwesomeIcon
                  icon={faPhotoFilm}
                  style={{ width: "35px", height: "30px" }}
                  className="cursor-pointer"
                />
              </Link>
        )}
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        {status == 2 ? (
          <Image
            src={"/icons/screen.svg"}
            width={35}
            height={35}
            alt="screen"
            className="cursor-pointer"
          />
        ) : status == 1 ? (
          <span className="countdown font-mono text-2xl">
            <span
              style={{
                "--value": ("0" + Math.floor(timer % 60)).slice(-2),
              }}
            ></span>
          </span>
        ) : (
          <FontAwesomeIcon
            icon={faRecordVinyl}
            style={{ width: "35px", height: "30px" }}
            className="cursor-pointer"
            onClick={() => setStatus(1)}
          />
        )}
      </div>
      <div>
        <ExcaliCanvas height="94vh" width="97vw" />
      </div>
      <div className="flex w-full justify-center fixed w-screen h-screen bottom-0 z-30" style={{ pointerEvents: "none" }}>
        {typeof window !== 'undefined' ?
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
          onDragStop={() => setDrag(true)}
          default={{
            x: 0,
            y: window.innerHeight - 200,
            width: 320,
            height: 200,
          }}
        >
          <div className="flex flex-col justify-around items-center w-full h-full">
            <p>Draggable</p>
            {drag || status == 2 ? (
              <div className="flex justify-around items-center py-3 w-full">
                <Image
                  src={"/icons/camera.svg"}
                  width={36}
                  height={36}
                  alt="camera"
                  className="cursor-pointer"
                />
                <Image
                  src={"/icons/mic.svg"}
                  width={36}
                  height={36}
                  alt="mic"
                  className="cursor-pointer"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </Rnd> :<></>}
      </div>
    </div>
  );
};

export default AskVid;
