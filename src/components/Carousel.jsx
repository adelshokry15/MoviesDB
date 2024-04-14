import React, { useEffect, useRef, useState } from "react";
import { fetchDataFromAPI } from "../utilis/api";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Import CSS for blur effect

import dayjs from "./../../node_modules/dayjs/esm/index";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const Carousel = ({ trend, api, mediaType }) => {
  const carCont = useRef();
  const container = carCont.current;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { url } = useSelector((store) => store.home);
  async function fetchTrend() {
    setLoading(true);
    const mov = await fetchDataFromAPI(api);
    setData(mov);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  const navigation = (dir) => {
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    console.log(container.offsetWidth, "container.offsetWidth");
    console.log(container.scrollLeft, "container.scrollLeft");

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchTrend();
  }, [trend]);
  return (
    <>
      <div className=" relative">
        <div
          className="overflow-x-scroll overflow-y-hidden"
          ref={carCont}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <BsArrowLeftCircle
            className="hover:text-[#173d77] cursor-pointer text-2xl duration-300"
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              zIndex: "10",
            }}
            onClick={() => {
              navigation("left");
            }}
          />
          <BsArrowRightCircle
            className="hover:text-[#173d77] cursor-pointer text-2xl duration-300"
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
              zIndex: "10",
            }}
            onClick={() => {
              navigation("right");
            }}
          />
          {!loading ? (
            <div className="flex flex-no-wrap">
              {data?.results?.map((image, index) => (
                <Link
                  to={`/${image.media_type || mediaType}/${image.id}`}
                  style={{ flex: "0 0 260px" }}
                  className=" mx-4 "
                  key={index}
                >
                  <div>
                    <div className=" h-[350px] mb-5">
                      <LazyLoadImage
                        src={url.poster + image.poster_path}
                        alt={`Slide ${index + 1}`}
                        width="100%"
                        height="100%"
                        effect="blur"
                        className=" rounded-lg "
                      />
                    </div>
                    <h3 className=" text-lg mb-2">
                      {
                        (LazyLoadImage.onLoad =
                          image.original_title || image.name)
                      }
                    </h3>
                    <p className=" text-gray-500">
                      {
                        (LazyLoadImage.onLoad = dayjs(
                          image.release_date
                        ).format("MMM D, YYYY"))
                      }
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div
              className=" flex overflow-x-scroll"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {[...Array(5)].map((_, index) => (
                <div
                  className=" h-[350px] bg-[#020c1b] rounded-md mx-3 relative"
                  style={{ flex: "0 0 250px" }}
                  key={index}
                >
                  <div
                    className=" w-full absolute inset-0 animate-shadow"
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(25, 55, 99, 0), rgba(25, 55, 99, 0.2), rgba(25, 55, 99, 0.5), rgba(25, 55, 99, 0))`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Carousel;
