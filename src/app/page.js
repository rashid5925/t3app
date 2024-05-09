"use client";
import CardUI from "@/components/Card";
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
    <div className="m-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {cardData.length > 0 ? 
        cardData.map(
          (data) => <CardUI key={data.id} data={data} /> 
        )
        : <Spinner />}
      </div>
    </div>
  );
};

export default Home;
