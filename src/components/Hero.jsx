import React, { useState } from "react";
import { fetchDataFromAPI } from "../utilis/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getResults } from "../store/SearchSlice";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  const [bg, setBg] = useState("");
  const [mov, setMov] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { url } = useSelector((store) => store.home);
  function handleSearch() {
    if (query.length > 0) {
      navigate(`/search/${query}`);
      if (query) {
        dispatch(getResults({ s: query, pageNum: 1 }));
      }
    }
  }
  async function fetchBGHero() {
    setLoading(true);
    const data = await fetchDataFromAPI("/movie/upcoming");

    setBg(
      url.backdrop +
        data?.results?.[Math.floor(Math.random() * data?.results?.length)]
          ?.backdrop_path
    );
    setLoading(false);
  }
  useEffect(() => {
    fetchBGHero();
  }, [url]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResults({ s: "batman", pageNum: 1 }));
  }, []);

  return (
    <>
      <div className=" h-[500px] w-full flex items-center justify-center relative">
        <div style={{ width: "100%", height: "100%" }} className=" opacity-50">
          <LazyLoadImage
            src={bg}
            className=" object-cover object-center block"
            effect="blur"
            height={450}
            width={`100%`}
          />
        </div>
        <div
          className=" absolute w-full left-0 bottom-0 h-[250px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(4,21,45,0) 0%, #04152d 79.17%)",
          }}
        ></div>
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center w-full">
          <h2 className=" font-normal text-5xl ">Welcome</h2>
          <span className="font-thin md:text-xl text-base md:w-[650px] max-w-full inline-block p-1">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className=" flex items-center mx-auto w-[80%] justify-center relative">
            <input
              type="text"
              placeholder="Search for a movie or tv"
              className=" rounded-tl-lg rounded-bl-lg p-2 w-[60%] focus-visible:outline-none caret-black text-black"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              className=" bg-gradient-to-r from-[#f89e00] to-[#da2f68] px-2 h-[36px] rounded-tr-lg rounded-br-lg"
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
