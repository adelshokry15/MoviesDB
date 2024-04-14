import React, { useRef, useState } from "react";
import logo from "../assets/movix-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getResults } from "../store/SearchSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSearch() {
    if (query.length > 0) {
      navigate(`/search/${query}`);
      if (query) {
        dispatch(getResults({ s: query, pageNum: 1 }));
      }
    }
  }

  const controlNav = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScroll && window.innerWidth > 767) {
        if (
          !document
            .querySelector(".navBar")
            .classList.contains("-translate-y-[100%]")
        ) {
          document
            .querySelector(".navBar")
            .classList.add("-translate-y-[100%]");
        }
      } else {
        if (
          document
            .querySelector(".navBar")
            .classList.contains("-translate-y-[100%]")
        ) {
          document
            .querySelector(".navBar")
            .classList.remove("-translate-y-[100%]");
        }
      }
    }
    setLastScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNav);
    return () => {
      window.removeEventListener("scroll", controlNav);
    };
  }, [lastScroll]);

  return (
    <>
      <div className="navBar fixed bg-[#04152d] bg-opacity-60 top-0 z-10 left-0 right-0 duration-500">
        <div className=" container mx-auto flex justify-between items-center py-2">
          <div>
            <Link to={"/"}>
              <img src={logo} alt="" style={{ width: "180px" }} />
            </Link>
          </div>
          <div>
            <ul className=" flex items-center">
              <li className=" mx-2 hidden md:inline-block">
                <Link to={"/movie"} className="text-lg font-semibold">
                  Movies
                </Link>
              </li>
              <li className=" mx-2 hidden md:inline-block">
                <Link to={"/tv"} className="text-lg font-semibold">
                  TV Shows
                </Link>
              </li>
              <li className=" mx-2">
                <GoSearch
                  style={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    document
                      .querySelector(".searchNav")
                      .classList.add("translate-y-[100%]");
                    document
                      .querySelector(".searchNav")
                      .classList.remove("-translate-y-[100%]");
                  }}
                />
              </li>
              <li className=" mx-2 md:hidden">
                {isOpen ? (
                  <AiOutlineClose
                    style={{
                      fontWeight: "bold",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      document
                        .querySelector(".smallNav")
                        .classList.add("-translate-y-[100%]");
                      document
                        .querySelector(".smallNav")
                        .classList.remove("translate-y-[80%]");
                      setIsOpen(false);
                    }}
                  />
                ) : (
                  <AiOutlineMenu
                    style={{
                      fontWeight: "bold",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      document
                        .querySelector(".smallNav")
                        .classList.remove("-translate-y-[100%]");
                      document
                        .querySelector(".smallNav")
                        .classList.add("translate-y-[80%]");
                      setIsOpen(true);
                    }}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="smallNav bg-[var(--black)] -translate-y-[100%] z-20 absolute top-0 left-0 right-0 duration-500 md:hidden">
        <ul>
          <li>
            <Link
              to={"/movie"}
              className=" p-2 block text-lg font-semibold hover:text-[var(--pink)] transition-colors duration-300"
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              to={"/tv"}
              className=" p-2 block text-lg font-semibold hover:text-[var(--pink)] transition-colors duration-300"
            >
              TV Shows{" "}
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={`searchNav bg-white flex justify-center items-center -translate-y-[100%] z-20 absolute top-0 left-0 right-0 duration-500`}
      >
        <div className="w-[90%] md:w-[80%] mx-auto relative">
          <input
            type="text"
            placeholder="Search for a movie or tv show...."
            className="rounded-none z-10 relative w-full text-gray-900 py-6 focus-visible:outline-none caret-black placeholder:text-gray-900 text-lg"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                document
                  .querySelector(".searchNav")
                  .classList.add("-translate-y-[100%]");
                document
                  .querySelector(".searchNav")
                  .classList.remove("translate-y-[100%]");
                handleSearch();
                document.querySelector(".searchNav input").value = "";
              }
            }}
          />
          <AiOutlineClose
            style={{
              fontWeight: "bold",
              fontSize: "25px",
              cursor: "pointer",
              position: "absolute",
              right: "2px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "black",
              zIndex: "10",
            }}
            onClick={() => {
              document
                .querySelector(".searchNav")
                .classList.add("-translate-y-[100%]");
              document
                .querySelector(".searchNav")
                .classList.remove("translate-y-[100%]");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
