import React, { useState } from "react";
import SwitchTabs from "./SwitchTabs";
import Carousel from "./Carousel";

const Trending = () => {
  const [trend, setTrend] = useState("day");
  return (
    <>
      <div className=" container mx-auto mb-16">
        <div className=" ps-4 flex justify-between items-center mb-7">
          <h3 className="text-xl">Trending</h3>
          <SwitchTabs data={["Day", "Week"]} setTrend={setTrend} />
        </div>
        <Carousel trend={trend} api={`/trending/all/${trend}`} />
      </div>
    </>
  );
};

export default Trending;
