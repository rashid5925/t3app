import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import ChatPopover from "@/components/ChatPopover";

export default function CarouselUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        "/c/documentation/devs/56/l/top.json?ascending=false&page=1&per_page=8"
      );
      const data = await response.json();
      setUsers(data.users);
    };
    getUsers();
  }, []);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[90%]"
    >
      <CarouselContent className="mb-1">
        {users.length > 0 ? (
          users.map((user, i) => (
            <CarouselItem className="basis-1/2 md:basis-1/3" key={i}>
              <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
                <div className="flex justify-around items-center py-2">
                  <p>{user.username}</p>
                  <p>{user.name}</p>
                  <ChatPopover>
                    <Image
                      src={"/icons/chat.svg"}
                      width={30}
                      height={30}
                      alt="chat"
                      className="cursor-pointer"
                    />
                  </ChatPopover>
                </div>
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem className="basis-1/2 md:basis-1/3 ">
            <div className="p-1 flex flex-col pt-8 bg-gradient-to-r from-cyan-500 to-blue-500 ms-2 rounded-md">
              <div className="flex justify-around items-center py-2">
                <Spinner />
              </div>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
