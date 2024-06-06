import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar } from "@readyplayerme/visage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@/components/ui/separator";
import { AvatarCreator } from "@readyplayerme/react-avatar-creator";
import { useState } from "react";
import { useMediaDevices } from "@livekit/components-react";
import { Label } from "@/components/ui/label";

export default function SettingSidebar() {
  const [edit, setEdit] = useState(false);
  const [modelSrc, setModelSrc] = useState(
    "https://readyplayerme.github.io/visage/male.glb"
  );
  const videoDevices = useMediaDevices({ kind: "videoinput" });
  const audioDevices = useMediaDevices({ kind: "audioinput" });
  const handleOnAvatarExported = (event) => {
    setModelSrc(event.data.url);
    setEdit(false);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"/icons/setting.svg"}
          width={47}
          height={47}
          alt="setting"
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader className="items-end">
          <FontAwesomeIcon
            icon={faPencil}
            className="cursor-pointer mr-3"
            onClick={() => setEdit(true)}
          />
        </SheetHeader>
        <div className="grid gap-1 py-2 h-1/2 overflow-y-auto">
          {edit ? (
            <AvatarCreator
              subdomain=""
              style={{ width: "100%", height: "100vh", border: "none" }}
              onAvatarExported={handleOnAvatarExported}
            />
          ) : (
            <Avatar modelSrc={modelSrc} />
          )}
        </div>
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <div className="flex justify-around py-2">
          <div className="grid gap-2 py-2">
          <Label>Video Input</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Video Inputs" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {videoDevices.map((item) => (
                  <SelectItem key={item.deviceId} value={item}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label>Audio Input</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Audio Inputs" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {audioDevices.map((item) => (
                  <SelectItem key={item.deviceId} value={item}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
          <Separator className="h-40 border-dashed border-black border-2 bg-transparent mx-2" orientation="vertical" />
          <div className="grid gap-2 py-2">
          <Label>Video Output</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Video Outputs" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {videoDevices.map((item) => (
                  <SelectItem key={item.deviceId} value={item}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label>Audio Output</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Audio Outputs" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {audioDevices.map((item) => (
                  <SelectItem key={item.deviceId} value={item}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
        </div>
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <SheetFooter className="justify-center" style={{justifyContent: 'center'}}>
          <SheetClose asChild>
            <Button type="submit" className="mt-4" variant="outline">
                <Image
                  src={"/icons/no.svg"}
                  width={20}
                  height={20}
                  alt="reset"
                />
                Cancel
            </Button>
          </SheetClose>
          <Button type="submit" className="mt-4" variant="outline">
                <Image
                  src={"/icons/double_tick.svg"}
                  width={30}
                  height={30}
                  alt="double tick"
                />
                Save
            </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
