"use client";
import HomeInCall from "@/components/HomeInCall";
import CardUI from "@/components/Card";
import CarouselBottom from "@/components/Carousel";
import TextPopover from "@/components/TextPopover";
import Sidebar from "@/components/Sidebar";
import LocationMenu from "@/components/LocationMenu";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  QueryClient, 
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTextWidth } from "@fortawesome/free-solid-svg-icons";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/lib/auth";
import { getCardData } from "@/app/actions";

let howToTag = false;

const Home = () => {
  const [arrow, setArrow] = useState("top");
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [reply, setReply] = useState(0); 
  const [joined, setJoined] = useState(false);
  const [create, setCreate] = useState(false);
  const router = useSearchParams();
  const mode = router.get("mode");
  const contols = router.get("controls");
  const rout = useRouter();
  const user = useUser();


  const handleInfiniteScroll = async () => {
    try {
      const d = document.documentElement;
      const offset = d.scrollTop + window.innerHeight;
      const height = d.offsetHeight;
      if (offset === height) {
        fetchNextPage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  
  const { data, error, fetchNextPage, refetch, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["topics"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getCardData(arrow, pageParam);
        return response;
      },
      getNextPageParam: (_, pages) => {
        if (pages[[pages.length - 1]].offset > 1) {
          return pages[pages.length - 1].offset;
        }
      },
    });

  useEffect(() => {
    if (status === "success" && !isLoading) {
      howToTag = data.pages.some((page, i) =>
        page.data.some((d) => {
          setReply(d.reply_count);
          setTags(d.tags);
          return d.tags.includes("how-to");
        })
      );
    }
  }, [status]);

  if (user === false) {
    return <Spinner />;
  }
  if (!user) {
    rout.push("/");
  }

  const toggleArrow = async () => {
    await setArrow(arrow === "top" ? "latest" : "top");
    setIsLoading(true);
    refetch({ refetchPage: (page, index) => index === 0 });
    setIsLoading(false);
  };



  return (
    <div className="m-5 min-h-screen flex flex-col items-center">
      {joined ?
      <HomeInCall data={data} /> 
      :
      <>
      <div className="flex flex-col gap-4 fixed top-10 right-10 bg-white rounded-lg p-2">
        <Image
          src={`/icons/${arrow === "top" ? "up" : "down"}.svg`}
          width={40}
          height={40}
          alt="up"
          priority
          className="cursor-pointer"
          onClick={toggleArrow}
        />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        {mode == 'embed' && contols == 'true' ? 
        <>
        <LocationMenu />
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <Sidebar />
        </>
        :
        <>
        <TextPopover>
        <FontAwesomeIcon icon={faTextWidth} style={{width: "40px", height: "35px"}} className="cursor-pointer" />
        </TextPopover>
        <Separator className="h-1 border-dashed border-black border-2 bg-transparent" />
        <FontAwesomeIcon icon={faPhotoFilm} style={{width: "40px", height: "35px"}} className="cursor-pointer" />
        </>
        }
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
        {status === "success" && !isLoading ? (
          <>
            {data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.data.map((d, j) => (
                  <CardUI key={j+i} data={d} create={create} setJoined={setJoined} />
                ))}
              </React.Fragment>
            ))}
            {isFetching && data.pages[[data.pages.length - 1]].offset > 1 ? (
              <Spinner />
            ) : (
              ""
            )}
          </>
        ) : status === "error" ? (
          <p>Error: {error.message}</p>
        ) : (
          <Spinner />
        )}
      </div>
      </>
      }
      {mode == 'embed' && contols == 'true' ? 
      <div className="flex w-full justify-center opacity-100 fixed bottom-0">
        <CarouselBottom howToTag={howToTag} tags={tags} reply={reply} joined={joined} setJoined={setJoined} create={create} setCreate={setCreate} />
      </div>
      :<></>
      }
    </div>
  );
};


const queryClient = new QueryClient();

const HomePage = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default HomePage;
