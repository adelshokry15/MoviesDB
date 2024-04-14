import React, { useState } from "react";
import SwitchTabs from "./SwitchTabs";
import Carousel from "./Carousel";

const TopRated = ({ title }) => {
  const [trend, setTrend] = useState("movie");
  const [mediaType, setMediaType] = useState("movie");

  return (
    <>
      <div className=" container mx-auto mb-16">
        <div className=" ps-4 flex justify-between items-center mb-7">
          <h3 className="text-xl">{title}</h3>
          <SwitchTabs
            data={["Movie", "TV"]}
            setTrend={setTrend}
            setMediaType={setMediaType}
          />
        </div>
        <Carousel
          trend={trend}
          api={`/${trend}/top_rated`}
          mediaType={mediaType}
        />
      </div>
    </>
  );
};

export default TopRated;
