import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
library.add(fas, far);

export default function CardMusic({ data }) {
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(50);
  return (
    <Card className="w-[180px]">
      <div className="m-4">
        <p className="text-center">{data.sound}</p>
      </div>
      <Separator className="h-1 bg-black my-2" />
      <CardContent className="min-h-[118px]">
        <div className="grid w-full items-center justify-center gap-4">
          <div className="flex flex-col items-center space-y-1.5">
            {data.variantNames.length > 1 ? (
              <Select>
                <SelectTrigger className="w-[180px] text-[10px] mx-auto">
                  <SelectValue className="mx-auto" placeholder={data.variantNames[0]} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {data.variantNames.map((item, i) => (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Label className="mt-4 mb-2">{data.variantNames[0]}</Label>
            )}
            {data.icon ? <FontAwesomeIcon icon={data.icon} size="3x" /> : <></>}
          </div>
        </div>
      </CardContent>
      <Separator className="h-1 bg-black my-2" />
      <div className="flex justify-around items-center m-4">
        {play ? (
            volume === 0 ?
            <FontAwesomeIcon onClick={() => setVolume(10)} size="xl" className="cursor-pointer" icon="fa-solid fa-volume-xmark" />
            :
          <div className="flex gap-2 justify-center items-center">
            <Image
              src={"/icons/volume.svg"}
              width={25}
              height={25}
              alt="settings"
              onClick={() => setVolume(0)}
              className="cursor-pointer"
            />
            <input type="range" className="w-3/4" min={0} max={100} step={2} defaultValue={volume} onChange={(e) => setVolume(e.target.value)} />
          </div>
            
        ) : (
          <FontAwesomeIcon onClick={() => setPlay(true)} size="xl" className="cursor-pointer" icon="fa-solid fa-power-off" />
        )}
      </div>
    </Card>
  );
}
