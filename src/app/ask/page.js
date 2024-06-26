"use client";
import ChatAsk from "@/components/ChatAsk";
import AskVid from "@/components/AskVid";
import LocationMenu from "@/components/LocationMenu";
import CarouselAsk from "@/components/CarouselAsk";
import CarouselUsers from "@/components/CarouselUsers";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Avatar } from "@readyplayerme/visage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useUser } from "@/lib/auth";
import Spinner from "@/components/Spinner";
import { Separator } from "@/components/ui/separator";

const modelSrc = "https://readyplayerme.github.io/visage/male.glb";

const Ask = () => {
  const router = useSearchParams();
  const mode = router.get("mode");
  const [timer, setTimer] = useState(3);
  const [status, setStatus] = useState(0);
  const rout = useRouter();
  const user = useUser();
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
  if (user === false) {
    return <Spinner />;
  }
  if (!user) {
    rout.push("/");
  }

  if (mode == "vid") {
    return <AskVid />;
  }
  return (
    <div className="m-5 min-h-screen flex flex-col items-center">
      <div className="flex flex-col gap-7 fixed top-10 right-10 bg-white rounded-lg p-2">
        {mode == "mini" ? (
          <>
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
            {status == 2 ? (
              <>
              <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
              <Image
                src={"/icons/screen.svg"}
                width={35}
                height={35}
                alt="screen"
                className="cursor-pointer"
              />
              <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
              <Image
                src={"/icons/camera.svg"}
                width={35}
                height={35}
                alt="camera"
                className="cursor-pointer"
              />
              <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
              <Image
                src={"/icons/mic.svg"}
                width={35}
                height={35}
                alt="mic"
                className="cursor-pointer"
              />
              </>
            ) : status == 1 ? (
              <>
              <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
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
              <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
              <FontAwesomeIcon
                icon={faRecordVinyl}
                style={{ width: "35px", height: "30px" }}
                className="cursor-pointer"
                onClick={() => setStatus(1)}
              />
              </>
            )}
          </>
        ) : mode == "focus" ? (
          <Image
            src={"/icons/setting.svg"}
            width={40}
            height={40}
            alt="setting"
            className="cursor-pointer"
          />
        ) : (
          <></>
        )}
        {mode == "focus" || mode == "breakroom" ? 
        <>
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <ChatAsk />
        </>
         : <></>}
        
        {mode == "focus" ? <>
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <LocationMenu />
        </>
         : <></>}
      </div>
      <div>
        <Avatar modelSrc={modelSrc} style={{ width: "80vw", height: "75vh" }} />
      </div>
      {mode != "mini" ? (
        <div className="flex w-full justify-center opacity-90 fixed bottom-0">
          {mode == "focus" ? <CarouselAsk /> : <CarouselUsers />}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Ask;
