import dayjs from "dayjs/esm";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import noPoster from "../assets/no-poster.png";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";

const Card = ({ m, i, mediaType }) => {
  const { url } = useSelector((store) => store.home);

  return (
    <>
      <Link to={`/${m.media_type || mediaType}/${m.id}`} key={i}>
        <div>
          <div className=" mb-8 relative md:h-[440px]">
            <LazyLoadImage
              src={m.poster_path ? url.poster + m.poster_path : noPoster}
              alt={`Slide ${i + 1}`}
              width="100%"
              height="100%"
              effect="blur"
              className=" rounded-xl md:h-[440px]"
            />
            <div className=" bg-white w-fit rounded-full absolute bottom-0 left-6 translate-y-[50%]">
              <CircularProgressbar
                className=" w-[60px] h-[60px] p-1"
                value={m.vote_average}
                maxValue={10}
                text={m.vote_average?.toFixed(1)}
                styles={buildStyles({
                  pathColor:
                    m.vote_average < 5
                      ? "red"
                      : m.vote_average < 7
                      ? "orange"
                      : "green",
                  trailColor: "white",
                  backgroundColor: "red",
                  textSize: "24px",
                })}
              />
            </div>
          </div>
          <h3 className=" text-lg mb-2">
            {(LazyLoadImage.onLoad = m.original_title || m.original_name)}
          </h3>
          <p className=" text-gray-500">
            {
              (LazyLoadImage.onLoad = dayjs(m.release_date).format(
                "MMM D, YYYY"
              ))
            }
          </p>
        </div>
      </Link>
    </>
  );
};

export default Card;
