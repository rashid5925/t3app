"use client";
import CardUI from "@/components/Card";
import CarouselBottom from "@/components/Carousel";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    const getCardData = async () => {
      const response = await fetch(
        "/documentation/devs/56/l/top.json", {
          mode: 'no-cors'
        });
      let data = await response.json();
      data = data["topic_list"]["topics"];
      setCardData(data);
    };
    getCardData();
  }, []);
  return (
    <div className="m-5 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cardData.length > 0 ? 
        cardData.map(
          (data) => <CardUI key={data.id} data={data} /> 
        )
        : <Spinner />}
      </div>
      <div className="flex w-full justify-center opacity-80 fixed bottom-0">
        <CarouselBottom />
      </div>
    </div>
  );
};

export default Home;
