import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function TimerPopover({ time, status, children }) {
  const [confirm, setConfirm] = useState(false);
  const resetTimer = () => {
    time.setTimer(1500);
    status.setStatus(false);
    setConfirm(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex gap-2 justify-around items-center my-2">
          {!status.status ? (
            <>
              <Image
                src={"/icons/up.svg"}
                width={25}
                height={25}
                alt="up"
                className="cursor-pointer"
                onClick={() =>
                  time.timer < 3000 ? time.setTimer(time.timer + 300) : ""
                }
              />
              <Separator className="w-1 h-20 bg-black mx-2" orientation="vertical" />
            </>
          ) : (
            ""
          )}
          
          <Label>
            <span className="countdown font-mono text-2xl">
              <span
                style={{
                  "--value": ("0" + Math.floor((time.timer / 60) % 60)).slice(
                    -2
                  ),
                }}
              ></span>
              m:
              <span
                style={{
                  "--value": ("0" + Math.floor(time.timer % 60)).slice(-2),
                }}
              ></span>
              s
            </span>
          </Label>
          <Separator className="w-1 h-20 bg-black mx-2" orientation="vertical" />
          {!status.status ? (
            <>
              <Image
                src={"/icons/down.svg"}
                width={25}
                height={25}
                alt="down"
                className="cursor-pointer"
                onClick={() =>
                  time.timer > 300 ? time.setTimer(time.timer - 300) : ""
                }
              />
              <Separator className="w-1 h-20 bg-black mx-2" orientation="vertical" />
              <Image
                src={"/icons/double_tick.svg"}
                width={35}
                height={35}
                alt="double tick"
                className="cursor-pointer"
                onClick={() =>
                  status.status
                    ? status.setStatus(false)
                    : status.setStatus(true)
                }
              />
            </>
          ) : (
            confirm
            ?
            <>
              <Image
                src={"/icons/yes.svg"}
                width={25}
                height={25}
                alt="reset"
                className="cursor-pointer"
                onClick={resetTimer}
              />
              <Image
                src={"/icons/no.svg"}
                width={25}
                height={25}
                alt="reset"
                className="cursor-pointer"
                onClick={() => setConfirm(false)}
              />
            </>
            :
            <Image
              src={"/icons/reset.svg"}
              width={25}
              height={25}
              alt="reset"
              className="cursor-pointer"
              onClick={() => setConfirm(true)}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
