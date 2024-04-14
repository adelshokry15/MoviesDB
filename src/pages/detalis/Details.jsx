import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromAPI } from "../../utilis/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dayjs from "dayjs/esm";
import Cast from "../../components/Cast";
import OfficialVids from "../../components/OfficialVids";
import Relatives from "../../components/Relatives";
import noPoster from "../../assets/no-poster.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlayBtn from "../../components/PlayBtn";
import { FallingLines } from "react-loader-spinner";
import { is } from "./../../../node_modules/react-loader-spinner/dist/main";

const Details = () => {
  const { mediaType, id } = useParams();
  const [details, setDetails] = useState([]);
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [video, setVideo] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { url } = useSelector((store) => store.home);

  function runtimeFormat(runtime) {
    const h = Math.floor(runtime / 60);
    const m = Math.round(runtime % 60);
    return `${h}h ${m}m`;
  }

  async function fetchOffTrailer() {
    const data = await fetchDataFromAPI(`/${mediaType}/${id}/videos`);
    setTrailer(data?.results[0] ? data?.results[0]?.key : undefined);
  }

  async function getDetails() {
    setIsLoading(true);
    const data = await fetchDataFromAPI(`/${mediaType}/${id}`);
    const credits = await fetchDataFromAPI(`/${mediaType}/${id}/credits`);

    setDetails(data);
    setCrew(credits.crew);
    setCast(credits.cast);
    setIsLoading(false);
  }
  const Writers = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );
  const director = crew?.filter((f) => f.job === "Director");

  useEffect(() => {
    getDetails();
    fetchOffTrailer();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className=" h-[100vh] w-full relative z-40 flex justify-center items-center">
          <FallingLines
            color="lightblue"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      ) : (
        <div>
          <div className="relative">
            <div className=" w-full">
              <img
                src={
                  details.backdrop_path
                    ? url.backdrop + details.backdrop_path
                    : noPoster
                }
                alt=""
                className="object-cover w-full h-full absolute inset-0 -z-10"
              />
            </div>
            <div
              className=""
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(4,21,45,0.7) 0%, #04152d 79.17%)",
              }}
            >
              <div className="container mx-auto pt-36 lg:px-8">
                <div className=" grid md:grid-cols-2 lg:grid-cols-6 gap-10 mb-20">
                  <div className=" lg:col-span-2">
                    <LazyLoadImage
                      src={
                        details?.poster_path
                          ? url.poster + details.poster_path
                          : noPoster
                      }
                      alt=""
                      className=" rounded-lg h-[525px] max-w-[350px]"
                      effect="blur"
                    />
                  </div>
                  <div className=" lg:col-span-4">
                    <div className=" mb-2">
                      <h2 className=" text-4xl tracking-normal inline-block mr-2">
                        {details?.original_title || details?.original_name}
                      </h2>
                      <span className="text-3xl tracking-normal">
                        (
                        {details?.release_date
                          ? details?.release_date?.slice(0, 4)
                          : details?.first_air_date
                          ? details?.first_air_date?.slice(0, 4)
                          : "Unknown"}
                        )
                      </span>
                    </div>
                    <h4 className=" text-gray-400 text-2xl opacity-90 mb-4">
                      {details.tagline}
                    </h4>
                    <div className=" mb-7">
                      {details?.genres?.map((g, i) => (
                        <span
                          key={i}
                          className=" text-sm bg-pink-600 p-2 mx-1 rounded-md"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                    <div className=" flex items-center mb-8 ">
                      <div>
                        <CircularProgressbar
                          className=" w-[90px] h-[90px]"
                          value={details.vote_average}
                          maxValue={10}
                          text={details.vote_average?.toFixed(1)}
                          styles={buildStyles({
                            pathColor:
                              details.vote_average < 5
                                ? "red"
                                : details.vote_average < 7
                                ? "orange"
                                : "green",
                          })}
                        />
                      </div>
                      <div
                        className="sv ms-8 flex items-center gap-4 cursor-pointer hover:text-[var(--pink)] duration-500"
                        onClick={() => {
                          setVideo(trailer);
                          setShow(true);
                        }}
                      >
                        <PlayBtn /> Watch Trailer
                      </div>
                    </div>
                    <h4 className=" text-3xl mb-2">Overview</h4>
                    <p className=" leading-7 max-w-[610px] mb-5">
                      {details.overview}
                    </p>
                    <div className=" py-5 border-b-2 border-gray-600">
                      <ul className=" flex gap-7">
                        <li>
                          Status:{" "}
                          <span className=" text-gray-400">
                            {details.status}
                          </span>
                        </li>
                        <li>
                          Release Date:{" "}
                          <span className=" text-gray-400">
                            {details?.release_date
                              ? dayjs(details.release_date).format(
                                  "MMM D, YYYY"
                                )
                              : details.first_air_date
                              ? dayjs(details.first_air_date).format(
                                  "MMM D, YYYY"
                                )
                              : "Unknown"}
                          </span>
                        </li>
                        {mediaType == "movie" && (
                          <li>
                            Runtime:{" "}
                            <span className=" text-gray-400">
                              {details?.runtime
                                ? runtimeFormat(details?.runtime)
                                : "Unknown"}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div>
                      {director?.length > 0 && (
                        <div className=" py-5 border-b-2 border-gray-600">
                          <span>Director: </span>
                          <span className="text-gray-400">
                            {director?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {director.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      {Writers?.length > 0 && (
                        <div className=" py-5 border-b-2 border-gray-600">
                          <span>Writer: </span>
                          <span className="text-gray-400">
                            {Writers?.map((r, i) => (
                              <span key={i}>
                                {r.name}
                                {Writers.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      {details?.created_by?.length > 0 && (
                        <div className=" py-5 border-b-2 border-gray-600">
                          <span>Creator: </span>
                          <span className="text-gray-400">
                            {details?.created_by?.map((r, i) => (
                              <span key={i}>
                                {r.name}
                                {details?.created_by.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Cast loading={loading} cast={cast} />
          <OfficialVids
            mediaType={mediaType}
            id={id}
            show={show}
            setShow={setShow}
            video={video}
            setVideo={setVideo}
          />
          <Relatives
            mediaType={mediaType}
            id={id}
            api={`/${mediaType}/${id}/similar`}
            title={"Similar"}
          />
          <Relatives
            mediaType={mediaType}
            id={id}
            api={`/${mediaType}/${id}/recommendations`}
            title={"Recommendations"}
          />
        </div>
      )}
    </>
  );
};

export default Details;
