import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../utilis/api";
import VideoPopup from "./VideoPopup";

const OfficialVids = ({ mediaType, id, show, setShow, video, setVideo }) => {
  const [vids, setVids] = useState([]);

  async function fetchVids() {
    const { results } = await fetchDataFromAPI(`/${mediaType}/${id}/videos`);
    setVids(results);
  }
  useEffect(() => {
    fetchVids();
  }, [id]);

  return (
    <>
      <div className="container mx-auto">
        <h2 className="ps-3 text-2xl mb-4">Official Videos</h2>
        {vids.length > 0 ? (
          <div
            className="overflow-x-scroll mb-16"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className=" flex flex-no-wrap">
              {vids?.map((v, i) => (
                <div
                  key={i}
                  className=" w-full mx-3 cursor-pointer"
                  style={{ flex: "0 0 350px" }}
                  onClick={() => {
                    setShow(true);
                    setVideo(v.key);
                  }}
                >
                  <div className="sv relative">
                    <img
                      src={`https://img.youtube.com/vi/${v.key}/mqdefault.jpg`}
                      alt=""
                      className=" w-full rounded-2xl mb-3 duration-500"
                    />
                    <svg
                      className="svg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="80px"
                      height="80px"
                      viewBox="0 0 213.7 213.7"
                      enableBackground="new 0 0 213.7 213.7"
                      xmlSpace="preserve"
                    >
                      <polygon
                        className="triangle"
                        fill="none"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        points="73.5,62.5 148.5,105.8 73.5,149.1 "
                      ></polygon>
                      <circle
                        className="circle"
                        fill="none"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        cx="106.8"
                        cy="106.8"
                        r="103.3"
                      ></circle>
                    </svg>
                  </div>
                  <h3 className=" text-xl">{v.name}</h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h3 className=" mb-12 text-2xl ps-2">
            No official videos for this movie
          </h3>
        )}
      </div>
      <VideoPopup
        show={show}
        setShow={setShow}
        video={video}
        setVideo={setVideo}
      />
    </>
  );
};

export default OfficialVids;
