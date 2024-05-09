"use client";
import CardUI from "@/components/Card";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    const getCardData = async () => {
      const response = await fetch(
        "https://meta.discourse.org/c/documentation/devs/56/l/top.json?ascending=false&page=1&per_page=8"
      );
      let data = await response.json();
      data = data["topic_list"]["topics"];
      setCardData(data);
    };
    getCardData();
  }, []);
  return (
    <div className="m-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {cardData.length > 0 ? 
        cardData.map(
          (data) => <CardUI data={data} /> 
        )
        : <Spinner />}
      </div>
    </div>
  );
};

export default Home;
