import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function CardUI({ data }) {
  console;
  return (
    <Card className="w-[320px]">
      <CardHeader>
        {!data.has_accepted_answer ? (
          <div className="flex justify-center">
            <Image src={"/icons/double_tick.svg"} width={30} height={30} />
            <Badge>Solved</Badge>
          </div>
        ) : (
          <></>
        )}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
