import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export default function TodoPopover({ children }) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-8 items-center gap-2">
              <Checkbox id="completed" checked />
              <Input
                id="task_compeleted"
                defaultValue="Take 3 deep breaths"
                className="col-span-6 h-8 line-through"
                disabled
              />
              <Image
                src={"/icons/no.svg"}
                width={15}
                height={15}
                alt="cross"
                className="cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-8 items-center gap-2">
              <Checkbox id="uncompleted" />
              <Input
                id="task_uncompeleted"
                defaultValue="Test"
                className="col-span-6 h-8"
              />
              <Image
                src={"/icons/no.svg"}
                width={15}
                height={15}
                alt="cross"
                className="cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-8 items-center gap-2">
              <Input
                id="new"
                placeholder="Clear your workspace"
                className="col-start-2 col-span-6 h-8"
              />
              <Image
                src={"/icons/no.svg"}
                width={15}
                height={15}
                alt="cross"
                className="cursor-pointer"
              />
            </div>
            <div className="grid items-center gap-4">
              <Button variant="outline">ADD GOAL</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
