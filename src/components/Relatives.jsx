import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../utilis/api";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import dayjs from "dayjs/esm";
import noPoster from "../assets/no-poster.png";
import { TfiFaceSad } from "react-icons/tfi";

const Similar = ({ mediaType, id, api, title }) => {
  const [relativeMov, setRelativeMov] = useState([]);
  const { url } = useSelector((store) => store.home);
  async function fetchRecom() {
    const data = await fetchDataFromAPI(api);
    setRelativeMov(data.results);
  }
  useEffect(() => {
    fetchRecom();
  }, [id]);
  return (
    <>
      <div className="container mx-auto mb-12">
        <h3 className=" text-2xl mb-4 ps-2">{title}</h3>
        <div
          className=" overflow-x-scroll overflow-y-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className=" flex flex-nowrap">
            {relativeMov.length > 0 ? (
              relativeMov?.map((s, i) => (
                <Link
                  to={`/${s.media_type || mediaType}/${s.id}`}
                  style={{ flex: "0 0 260px" }}
                  className=" mx-4 "
                  key={i}
                >
                  <div>
                    <div className=" h-[350px] mb-5">
                      <LazyLoadImage
                        src={
                          s.poster_path ? url.poster + s.poster_path : noPoster
                        }
                        alt={`Slide ${i + 1}`}
                        width="100%"
                        height="100%"
                        effect="blur"
                        className=" rounded-lg "
                      />
                    </div>
                    <h3 className=" text-lg mb-2">
                      {(LazyLoadImage.onLoad = s.original_title || s.name)}
                    </h3>
                    <p className=" text-gray-500">
                      {
                        (LazyLoadImage.onLoad = dayjs(s.release_date).format(
                          "MMM D, YYYY"
                        ))
                      }
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div>
                <h3 className=" text-2xl ps-2">
                  {" "}
                  There is no {title} for this {mediaType}{" "}
                  <TfiFaceSad className=" inline-block ms-1 text-[var(--orange)]" />
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Similar;
