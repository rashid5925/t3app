import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
      <CardHeader>
        <CardTitle>{data.sound}</CardTitle>
      </CardHeader>
      <Separator className="h-1 bg-black my-2" />
      <CardContent>
        <div className="grid w-full items-center justify-center gap-4">
          <div className="flex flex-col items-center space-y-1.5">
            {data.variantNames.length > 1 ? (
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={data.variantNames[0]} />
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
              <Label>{data.variantNames[0]}</Label>
            )}
            {data.icon ? <FontAwesomeIcon icon={data.icon} /> : <></>}
          </div>
        </div>
      </CardContent>
      <Separator className="h-1 bg-black my-2" />
      <CardFooter className="flex justify-around items-center">
        {play ? (
            volume === 0 ?
            <FontAwesomeIcon onClick={() => setVolume(10)} className="cursor-pointer" icon="fa-solid fa-volume-xmark" />
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
          <FontAwesomeIcon onClick={() => setPlay(true)} className="cursor-pointer" icon="fa-solid fa-power-off" />
        )}
      </CardFooter>
    </Card>
  );
}
