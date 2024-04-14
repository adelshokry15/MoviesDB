import React from "react";
import ReactPlayer from "react-player";
import { IoMdClose } from "react-icons/io";

const VideoPopup = ({ show, setShow, video, setVideo }) => {
  return (
    <>
      <div
        className={`${
          show ? "block" : "hidden"
        } fixed inset-0 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm`}
        onClick={(e) => {
          if (!e.target.classList.contains("animate-videoShow")) {
            setShow(false);
            setVideo(null);
          }
        }}
      >
        <div className="inline-block animate-videoShow relative">
          <ReactPlayer url={`https://www.youtube.com/watch?v=${video}`} />
          <IoMdClose
            className=" absolute right-1 translate-y-[-110%] top-0 text-2xl cursor-pointer"
            onClick={() => {
              setShow(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default VideoPopup;
