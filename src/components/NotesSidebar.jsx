import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Editor from "@/components/editor/advanced-editor";
import { useState } from "react";

const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is an example for the editor",
        },
      ],
    },
  ],
};

export default function NotesSidebar() {
  const [value, setValue] = useState(defaultValue);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"/icons/notes.svg"}
          width={46}
          height={46}
          alt="notes"
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Notes</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
            <Editor initialValue={value} onChange={setValue} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
