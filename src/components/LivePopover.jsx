import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import MultiSelect from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LivePopover({ howToTag, tags, reply, setJoined, children }) {
  const [create, setCreate] = useState(false);
  if (howToTag) {
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <Card className="w-[280px]">
              <CardHeader className="pt-0">
                <div className="grid w-full items-start justify-center gap-4">
                  <div className="flex gap-2 items-center bg-red-500 rounded-b p-1">
                    <Image
                      src={"/icons/broadcast.svg"}
                      width={25}
                      height={25}
                      alt="broadcast"
                    />
                    <Label>Created By</Label>
                  </div>
                  <Label htmlFor="private">Live</Label>
                </div>
              </CardHeader>
              <Separator className="h-1 bg-black my-2" />
              <CardContent>
                <div className="flex w-full items-center justify-center gap-4">
                  {tags.map((tag, i) => (
                    <Badge key={i}>{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <Separator className="h-1 bg-black my-2" />
              <CardFooter className="flex justify-around items-center">
                <div className="flex gap-3">
                  <CardTitle htmlFor="like_count">{reply}</CardTitle>
                  <Image
                    src={"/icons/group.svg"}
                    width={30}
                    height={30}
                    alt="group"
                  />
                </div>
                <Separator
                  className="w-1 h-10 bg-black mx-2"
                  orientation="vertical"
                />
                <Button onClick={() => setJoined(true)}>Join</Button>
              </CardFooter>
            </Card>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <Card className="w-[280px]">
            <CardHeader>
              <div className="flex justify-center items-center space-x-2">
                <Label htmlFor="private">Private</Label>
                <Switch id="private" />
              </div>
            </CardHeader>
            <Separator className="h-1 bg-black my-2" />
            <CardContent>
              <div className="grid w-full items-center justify-center gap-4">
                <MultiSelect />
              </div>
            </CardContent>
            <Separator className="h-1 bg-black my-2" />
            <CardFooter className="flex justify-around items-center">
              {!create ? (
                <Button onClick={() => setCreate(true)}>Create</Button>
              ) : (
                <>
                  <Button onClick={() => setJoined(true)}>Join</Button>
                  <Separator
                    className="w-1 h-20 bg-black mx-2"
                    orientation="vertical"
                  />
                  <Image
                    src={"/icons/copy.svg"}
                    width={30}
                    height={30}
                    alt="copy"
                    className="cursor-pointer"
                  />
                  <Separator
                    className="w-1 h-20 bg-black mx-2"
                    orientation="vertical"
                  />
                  <Image
                    src={"/icons/share.svg"}
                    width={30}
                    height={30}
                    alt="share"
                    className="cursor-pointer"
                  />
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </PopoverContent>
    </Popover>
  );
}
