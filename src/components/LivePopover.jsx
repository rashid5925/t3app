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
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import MultiSelect from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";

export default function LivePopover({ setJoined, create, setCreate, children }) {
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
