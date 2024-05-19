"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ExcaliCanvas from "@/components/excalidraw/ExcaliCanvas";
import { Rnd } from "react-rnd";
import PerviewOverlay from "@/components/PreviewOverlay";
import PreviewVideo from "@/components/PreviewVideo";
import { useUser } from "@/lib/auth";
import Spinner from "@/components/Spinner";

const Preview = () => {
  const router = useSearchParams();
  const mode = router.get("mode");
  const [timer, setTimer] = useState(3);
  const [status, setStatus] = useState(0);
  const rout = useRouter();
  const user = useUser();

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
  if (user === false) {
    return <Spinner />;
  }
  if (!user) {
    rout.push("/");
  }
  if (mode == "overlay") {
    return <PerviewOverlay />;
  } else if (mode == "video") {
    return <PreviewVideo />;
  }
  return (
    <div className="m-5 min-h-screen flex flex-col items-center">
      <div className="flex flex-col gap-7 fixed top-10 right-10 z-50">
        {status == 0 ? (
          <>
            <Image
              src={"/icons/double_tick.svg"}
              width={35}
              height={35}
              alt="double tick"
              className="cursor-pointer"
            />
            <Image
              src={"/icons/no.svg"}
              width={30}
              height={30}
              alt="no"
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faRecordVinyl}
              style={{ width: "35px", height: "30px" }}
              className="cursor-pointer"
              onClick={() => setStatus(1)}
            />
          </>
        ) : status == 1 ? (
          <>
            <Image
              src={"/icons/no.svg"}
              width={30}
              height={30}
              alt="no"
              className="cursor-pointer"
            />
            <Image
              src={"/icons/double_tick.svg"}
              width={35}
              height={35}
              alt="double tick"
              className="cursor-pointer"
            />
            <span className="countdown font-mono text-2xl">
              <span
                style={{
                  "--value": ("0" + Math.floor(timer % 60)).slice(-2),
                }}
              ></span>
            </span>
          </>
        ) : (
          <>
            <Image
              src={"/icons/no.svg"}
              width={30}
              height={30}
              alt="no"
              className="cursor-pointer"
            />
            <Image
              src={"/icons/double_tick.svg"}
              width={35}
              height={35}
              alt="double tick"
              className="cursor-pointer"
            />
            <Image
              src={"/icons/screen.svg"}
              width={35}
              height={35}
              alt="screen"
              className="cursor-pointer"
            />
          </>
        )}
      </div>
      <div>
        {status == 2 ? (
          <ExcaliCanvas height="94vh" width="97vw" />
        ) : (
          <Image
            src={"/images/rocket.jpeg"}
            width={650}
            height={700}
            alt="rocket"
          />
        )}
      </div>
      {status == 2 ? (
      <div className="flex w-full justify-center fixed w-screen h-screen bottom-0 z-30">
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
            y: 700 - 200,
            width: 320,
            height: 200,
          }}
        >
          <div className="flex flex-col justify-around items-center w-full h-full">
            <p>Draggable</p>
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
          </div>
        </Rnd> : <></>}
      </div>
      ) : (<></>)}
    </div>
  );
};

export default Preview;
