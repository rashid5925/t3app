"use client";
import Image from "next/image";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChatInputActionBar, MobileChatInputArea, MobileChatSendButton, TokenTag, ChatList, useControls, useCreateStore } from "@lobehub/ui";

const data = [
  {
    content: "dummy text of the printing",
    createAt: 1_686_437_950_084,
    extra: {},
    id: "1",
    meta: {
      avatar: "https://avatars.githubusercontent.com/u/17870709?v=4",
      title: "CanisMinor",
    },
    role: "user",
    updateAt: 1_686_437_950_084,
  },
  {
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text",
    createAt: 1_686_538_950_084,
    extra: {},
    id: "2",
    meta: {
      avatar: "😎",
      backgroundColor: "#E8DA5A",
      title: "Advertiser",
    },
    role: "assistant",
    updateAt: 1_686_538_950_084,
  },
];

export default function Sidebar() {
  const store = useCreateStore();
  const control = useControls(
    {
      showTitle: true,
    },
    { store }
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"/icons/chat.svg"}
          width={40}
          height={40}
          alt="chat"
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <ChatList
            data={data}
            renderMessages={{
              default: ({ id, editableContent }) => (
                <div id={id}>{editableContent}</div>
              ),
            }}
            style={{ width: "100%" }}
            {...control}
          />
        </div>
        <SheetFooter>
          <div className="h-[100px] relative">
            <div style={{ flex: 1 }}></div>
            <MobileChatInputArea
              textAreaRightAddons={<MobileChatSendButton />}
              topAddons={
                <ChatInputActionBar
                  leftAddons={<TokenTag maxValue={5000} value={1000} />}
                />
              }
            />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
