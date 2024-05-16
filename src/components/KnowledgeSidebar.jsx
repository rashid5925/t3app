import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CardUI from "@/components/Card";

export default function KnowledgeSidebar({ data }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={`/icons/notes.svg`}
          width={40}
          height={40}
          alt="notes"
          priority
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Knowledge Base</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.map((d) => (
                <CardUI key={d.id} data={d} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
