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
            {data.tags.map((tag, i) => (
              <Badge key={i}>{tag}</Badge>
            ))}
          </div>
        </CardContent>
        <Separator className="h-1 bg-black my-2" />
        <CardFooter className="flex justify-around items-center">
          <div className="flex gap-3">
            <CardTitle htmlFor="like_count">{data.reply_count}</CardTitle>
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
    );
  }
  return (
    <Card className="w-[280px]">
      <CardHeader>
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
      <CardContent>
        <div className="grid w-full items-center justify-center gap-4">
          <div className="flex flex-col items-center space-y-1.5">
            <Image
              src={"/icons/video.svg"}
              width={80}
              height={80}
              alt="video icon"
              priority
            />
            <CardTitle htmlFor="name">{data.last_poster_username}</CardTitle>
            <Separator className="h-1 bg-black my-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-around items-center">
        <div className="flex gap-3">
          <Image
            src={"/icons/heart.svg"}
            width={30}
            height={30}
            alt="heart icon"
          />
          <CardTitle htmlFor="like_count">{data.like_count}</CardTitle>
        </div>
        <Separator className="w-1 h-20 bg-black mx-2" orientation="vertical" />
        <div className="flex gap-3">
          <Image
            src={"/icons/comment.svg"}
            width={30}
            height={30}
            alt="heart icon"
          />
          <CardTitle htmlFor="reply_count">{data.reply_count}</CardTitle>
        </div>
      </CardFooter>
    </Card>
  );
}
