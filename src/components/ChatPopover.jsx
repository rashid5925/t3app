import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { Textarea } from "@/components/ui/textarea";
  
  import { Button } from "@/components/ui/button";
  
  export default function ChatPopover({ children }) {
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-col gap-4 justify-center items-end">
            <Textarea className="h-32" placeholder="Type your message here." />
            <div className="flex gap-2 justify-between">
              <Button>Send</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  