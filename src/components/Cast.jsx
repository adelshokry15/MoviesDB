import dayjs from "dayjs/esm";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profile from "../assets/avatar.png";

const Cast = ({ loading, cast }) => {
  const { url } = useSelector((store) => store.home);

  return (
    <>
      <div className="container mx-auto">
        <h3 className=" text-2xl ps-2 mb-4">Top Cast</h3>
        {cast.length > 0 ? (
          <div
            className="overflow-x-scroll mb-14"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {!loading ? (
              <div className="flex flex-no-wrap">
                {cast?.map((c, index) => (
                  <Link
                    style={{ flex: "0 0 180px" }}
                    className=" mx-4 "
                    key={index}
                  >
                    <div className=" text-center">
                      <div className=" h-[180px] mb-5">
                        <LazyLoadImage
                          src={
                            c.profile_path
                              ? url.profile + c.profile_path
                              : profile
                          }
                          alt={`Profile ${index + 1}`}
                          width="100%"
                          height="100%"
                          effect="blur"
                          className=" rounded-full object-cover object-top"
                        />
                      </div>
                      <h3 className=" mb-2 text-lg">{c?.name}</h3>
                      <span className=" text-gray-400">{c.character}</span>
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
                    className=" h-[180px] bg-[#020c1b] mx-3 relative mb-14 rounded-full overflow-hidden"
                    style={{ flex: "0 0 180px" }}
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
        ) : (
          <h3 className=" ps-2 text-2xl mb-12">Unknown Cast</h3>
        )}
      </div>
    </>
  );
};

export default Cast;
