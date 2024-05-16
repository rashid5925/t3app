"use client";
import Image from "next/image";
import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetHeader
} from "@/components/ui/sheet";
import { ChatList, useControls, useCreateStore } from "@lobehub/ui";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import ChatPopover from "@/components/ChatPopover";

export default function ChatAsk({ postId = "15772" }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        `/t/${postId}.json?filter_top_level_replies=true`
      );
      const chats = await response.json();
      const cleanData = [];
      let i = 0;
      for (const chat of chats.post_stream.posts) {
        cleanData.push({
          content: chat.cooked,
          createAt: chat.created_at,
          extra: {},
          id: chat.id,
          meta: {
            avatar: "😎",
            backgroundColor: "#E8DA5A",
            title: chat.username,
          },
          role: i % 2 === 0 ? "assistant" : "user",
          updateAt: chat.updated_at,
        });
        i++;
      }
      setData(cleanData);
    };
    getUsers();
  }, []);
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
          {data.length > 0 ? (
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
          ) : (
            <Spinner />
          )}
        </div>
        <SheetFooter>
          <div className="flex justify-around">
            <ChatPopover>
              <Button>Reply</Button>
            </ChatPopover>
            <Button>
              <div className="flex gap-2">
                <Image
                  src={"/icons/volume.svg"}
                  width={20}
                  height={20}
                  alt="volume"
                  className="cursor-pointer"
                />
                <p>Join</p>
              </div>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
