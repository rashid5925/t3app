"use client";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import CardUI from "@/components/Card";
import CarouselBottom from "@/components/Carousel";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LocationMenu from "@/components/LocationMenu";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  const [arrow, setArrow] = useState("top");
  const [isLoading, setIsLoading] = useState(false);

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

  const getCardData = async (page) => {
    console.log(arrow);
    const url = `/c/documentation/devs/56/l/${arrow}.json?ascending=false&page=${page}&per_page=8`;
    const response = await fetch(url, {
      mode: "no-cors",
    });
    let data = await response.json();
    const offset = data["topic_list"]["more_topics_url"]
      ? parseInt(data["topic_list"]["more_topics_url"].split("=")[2])
      : 1;
    data = data["topic_list"]["topics"];
    setIsLoading(false);
    return { data, offset };
  };
  const { data, error, fetchNextPage, refetch, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["topics"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getCardData(pageParam);
        return response;
      },
      getNextPageParam: (_, pages) => {
        if (pages[[pages.length - 1]].offset > 1) {
          return pages[pages.length - 1].offset;
        }
      },
    });

  const toggleArrow = async () => {
    await setArrow(arrow === "top" ? "latest" : "top");
    setIsLoading(true);
    refetch({ refetchPage: (page, index) => index === 0 });
  };

  return (
    <div className="m-5 flex flex-col items-center">
      <div className="flex flex-col gap-7 fixed top-10 right-10">
        <Image
          src={`/icons/${arrow === "top" ? "up" : "down"}.svg`}
          width={40}
          height={40}
          alt="up"
          priority
          className="cursor-pointer"
          onClick={toggleArrow}
        />
        <LocationMenu />
        <Sidebar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {status === "success" && !isLoading ? (
          <>
            {data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.data.map((d) => (
                  <CardUI key={d.id} data={d} />
                ))}
              </React.Fragment>
            ))}
            {isFetching && data.pages[[data.pages.length - 1]].offset > 1 ? (
              <Spinner />
            ) : (
              <></>
            )}
          </>
        ) : status === "error" ? (
          <p>Error: {error.message}</p>
        ) : (
          <Spinner />
        )}
      </div>
      <div className="flex w-full justify-center opacity-50 fixed bottom-0">
        <CarouselBottom />
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default Page;

// export default Home;
