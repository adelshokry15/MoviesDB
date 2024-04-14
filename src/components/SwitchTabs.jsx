import React, { useState } from "react";

const SwitchTabs = ({ data, setTrend, setMediaType }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);
  function changeTab(i) {
    if (i) {
      setTrend(data[1].toLowerCase());
      if (typeof setMediaType == "function") {
        setMediaType(data[1].toLowerCase());
      }
    } else {
      setTrend(data[0].toLowerCase());
      if (typeof setMediaType == "function") {
        setMediaType(data[0].toLowerCase());
      }
    }
    setLeft(i * 95);
    setTimeout(() => {
      setSelectedTab(i);
    }, 300);
  }
  return (
    <>
      <div className=" h-[40px] bg-white w-[210px] rounded-2xl p-1 ">
        <div className="flex relative w-full h-full">
          {data.map((d, i) => (
            <span
              key={i}
              onClick={() => {
                changeTab(i);
              }}
              className={`w-[105px] z-20 ${
                selectedTab == i ? "text-white" : "text-black"
              } flex justify-center items-center cursor-pointer`}
            >
              {d}
            </span>
          ))}
          <span
            style={{
              left,
              transitionTimingFunction: "cubic-bezier(0.88,-0.35,0.565,1.35)",
            }}
            className={`z-10 animate-wiggle flex justify-center items-center bg-gradient-to-r from-[#f89e00] to-[#da2f68] duration-500 w-[105px] absolute  top-0 bottom-0 rounded-2xl `}
          ></span>
        </div>
      </div>
    </>
  );
};

export default SwitchTabs;
