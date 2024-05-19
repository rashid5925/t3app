"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import ChatAsk from "@/components/ChatAsk";
import { useEffect, useState } from "react";
import ExcaliCanvas from "@/components/excalidraw/ExcaliCanvas";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { Rnd } from "react-rnd";
import ChatPopover from "@/components/ChatPopover";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "@/lib/auth";
import Spinner from "@/components/Spinner";

const Show = () => {
  const router = useSearchParams();
  const mode = router.get("threadid");
  const [volume, setVolume] = useState(true);
  const [video, setVideo] = useState(true);
  const [image, setImage] = useState(false);
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
  if (mode == "") {
    return <div>Pass valid as threadid=xxxxx</div>;
  }
  return (
    <div className="m-5 min-h-screen flex flex-col items-center">
      <div className="flex flex-col gap-7 fixed top-10 right-10 z-50">
        {video && volume ? (
          <Image
            src={"/icons/volume.svg"}
            width={35}
            height={35}
            alt="volume"
            className="cursor-pointer"
            onClick={() => setVolume(!volume)}
          />
        ) : video ? (
          <FontAwesomeIcon
            onClick={() => setVolume(!volume)}
            className="cursor-pointer"
            style={{ width: "35px", height: "30px" }}
            icon={faVolumeXmark}
          />
        ) : (
          <></>
        )}
        {video ? (
          <>
            <ChatAsk  postId={mode} />
            <ChatPopover>
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faReply}
                style={{ width: "35px", height: "30px" }}
              />
            </ChatPopover>
            <FontAwesomeIcon
              icon={faPhotoFilm}
              style={{ width: "35px", height: "30px" }}
              className="cursor-pointer"
              onClick={() => setVideo(false)}
            />
            <FontAwesomeIcon
              icon={faHeart}
              style={{ width: "35px", height: "30px" }}
              className="cursor-pointer"
            />
          </>
        ) : (
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
          </>
        )}
        {!video && status == 0 ? (
          <FontAwesomeIcon
            icon={faRecordVinyl}
            style={{ width: "35px", height: "30px" }}
            className="cursor-pointer"
            onClick={() => setStatus(1)}
          />
        ) : !video && status == 1 ? (
          <span className="countdown font-mono text-2xl">
            <span
              style={{
                "--value": ("0" + Math.floor(timer % 60)).slice(-2),
              }}
            ></span>
          </span>
        ) : !video ? (
          <>
            <Image
              src={"/icons/screen.svg"}
              width={30}
              height={30}
              alt="screen"
              className="cursor-pointer"
            />
            <Image
              src={"/icons/camera.svg"}
              width={35}
              height={35}
              alt="camera"
              className="cursor-pointer"
              onClick={() => {
                setImage(true);
                setVideo(true);
              }}
            />
            <Image
              src={"/icons/mic.svg"}
              width={35}
              height={35}
              alt="min"
              className="cursor-pointer"
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {image ? (
          <Image
            src={"/images/rocket.jpeg"}
            width={650}
            height={700}
            alt="rocket"
          />
        ) : video ? (
          <video autoPlay muted loop>
            <source src="/video.mp4" />
          </video>
        ) : (
          <ExcaliCanvas height="94vh" width="97vw" />
        )}
      </div>
      {!image ? (
        <div
          className={`flex w-full justify-center ${
            mode == "video" ? "" : "fixed"
          } w-screen h-screen bottom-0 z-30`}
        >
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
              y: window.innerHeight - 200,
              width: 320,
              height: 200,
            }}
          >
            <div className="flex flex-col justify-around items-center w-full h-full">
              <p>Draggable</p>
              <div className="flex flex-col justify-around items-center w-full">
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
                <div className="flex justify-around items-center py-3 w-full">
                  <Image
                    src={"/icons/left.svg"}
                    width={36}
                    height={36}
                    alt="left"
                    className="cursor-pointer"
                  />
                  <Image
                    src={"/icons/right.svg"}
                    width={36}
                    height={36}
                    alt="right"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </Rnd> : <></>}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Show;
