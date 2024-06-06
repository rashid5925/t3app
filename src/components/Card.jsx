import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function CardUI({ data, create, setJoined }) {
  if (create && data.tags.includes("how-to")) {
    return (
      <Card className="w-[320px] max-md:w-[180px] border-4 border-black rounded-[40px] max-md:h-[180px] max-sm:w-[120px] max-sm:h-[120px]">
        <CardHeader className="pt-0 max-sm:space-y-0.5 max-md:p-1 max-sm:p-0">
          <div className="grid w-full items-start justify-center gap-4 max-sm:gap-1">
            <div className="flex gap-2 items-center bg-red-500 rounded-b md:p-1">
              <Image
                src={"/icons/broadcast.svg"}
                width={25}
                height={25}
                alt="broadcast"
                className="max-md:w-[12%]"
              />
              <Label className="max-md:text-[10px]">Created By</Label>
            </div>
            <Label htmlFor="private" className="max-md:text-xs text-center">Live</Label>
          </div>
        </CardHeader>
        <Separator className="h-1 bg-black my-2" />
        <CardContent className="max-md:p-1 max-sm:p-0">
          <div className="flex w-full items-center justify-center md:gap-4">
            {data.tags.map((tag, i) => (
              <Badge key={i} className="max-md:text-[8px] max-sm:text-[4px] max-sm:p-0">{tag}</Badge>
            ))}
          </div>
        </CardContent>
        <Separator className="h-1 bg-black my-2" />
        <CardFooter className="flex justify-around items-center max-md:p-1 max-sm:p-0">
          <div className="flex md:gap-3">
            <CardTitle htmlFor="like_count" className="max-md:text-xs">{data.reply_count}</CardTitle>
            <Image
              src={"/icons/group.svg"}
              width={30}
              height={30}
              alt="group"
              className="max-md:w-[30%]"
            />
          </div>
          <Separator
            className="w-1 h-10 max-md:h-4 bg-black mx-2"
            orientation="vertical"
          />
          <Button onClick={() => setJoined(true)} className="max-md:p-3 max-md:text-xs max-sm:p-1 max-sm:h-[22px]">Join</Button>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card className="w-[320px] max-md:w-[180px] border-2 rounded-[40px] max-md:h-[180px] max-sm:w-[120px] max-sm:h-[120px]">
      <CardHeader className="max-sm:p-1">
        {data.has_accepted_answer ? (
          <div className="flex justify-center">
            <Image
              src={"/icons/double_tick.svg"}
              width={30}
              height={30}
              alt="double ticks"
            />
            <Badge>Solved</Badge>
          </div>
        ) : (
          <></>
        )}
      </CardHeader>
      <CardContent className="max-sm:p-1">
        <div className="grid w-full items-center justify-center gap-4">
          <div className="flex flex-col items-center space-y-1.5">
            <Image
              src={"/icons/video.svg"}
              width={80}
              height={80}
              alt="video icon"
              className="max-md:w-[30%]"
              priority
            />
            <CardTitle htmlFor="name" className="max-md:text-sm">{data.last_poster_username}</CardTitle>
            <Separator className="h-1 bg-black my-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-around items-center max-sm:p-1">
        <div className="flex md:gap-3">
          <Image
            src={"/icons/heart.svg"}
            width={30}
            height={30}
            alt="heart icon"
          />
          <CardTitle htmlFor="like_count" className="max-md:text-sm">{data.like_count}</CardTitle>
        </div>
        <Separator className="w-1 h-20 max-md:h-8 bg-black mx-2" orientation="vertical" />
        <div className="flex md:gap-3">
          <Image
            src={"/icons/comment.svg"}
            width={30}
            height={30}
            alt="heart icon"
          />
          <CardTitle htmlFor="reply_count" className="max-md:text-sm">{data.reply_count}</CardTitle>
        </div>
      </CardFooter>
    </Card>
  );
}
