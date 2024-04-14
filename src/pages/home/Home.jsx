import React from "react";

import Hero from "../../components/Hero";
import Trending from "../../components/Trending";
import Popular from "../../components/Popular";
import TopRated from "../../components/TopRated";

const Home = () => {
  return (
    <>
      <Hero />
      <Trending title={"Trending"} />
      <Popular title={"What's Popular"} />
      <TopRated title={"Top Rated"} />
    </>
  );
};

export default Home;
