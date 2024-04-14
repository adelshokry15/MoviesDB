import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { fetchDataFromAPI } from "../../utilis/api";
import Card from "../../components/Card";
import InfiniteScroll from "./../../../node_modules/react-infinite-scroll-component/dist/index.es";
import { FallingLines } from "react-loader-spinner";

let filters = {};

const Movies = () => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "lightblue" : "white",
      width: window.innerWidth > "768" ? "19vw" : "100%",
      minWidth: "200px",
      borderRadius: "10px",
      // Add more custom styles as needed
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "blue" : "white",
      ":hover": { backgroundColor: "lightblue" },
      // Add more custom styles as needed
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: !state.isSelected ? "lightblue" : "white",
      borderRadius: "8px",

      // Add more custom styles as needed
    }),
    // You can define styles for other elements like singleValue, indicatorSeparator, etc.
  };

  const [isLoading, setIsLoading] = useState(false);
  const { mediaType } = useParams();
  const [genreID, setGenreID] = useState("");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [sortby, setSortby] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fecthShowed() {
    setIsLoading(true);
    const data = await fetchDataFromAPI(
      `/discover/${mediaType}?include_adult=false&page=${pageNum}&sort_by=${sortby}&with_genres=${genreID}`
    );
    setMovies(data.results);
    setTotalPages(data.total_pages);
    setIsLoading(false);
  }

  async function fetchNextPageData() {
    const data = await fetchDataFromAPI(
      `/discover/${mediaType}?include_adult=false&page=${pageNum}&sort_by=${sortby}&with_genres=${genreID}`
    );
    console.log(data);
    if (pageNum > 1) {
      console.log(pageNum);
      setMovies([...movies, ...data.results]);
    }
    setPageNum((prev) => prev + 1);
    console.log(totalPages);
  }

  async function fetchGenres() {
    const data = await fetchDataFromAPI(`/genre/${mediaType}/list`);
    setGenres(data?.genres);
  }

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby" && action.action !== "clear") {
      setSortby(selectedItems.value);

      setPageNum(1);
    } else if (action.name === "sortby" && action.action == "clear") {
      setSortby("popularity.desc");
      setPageNum(1);
    }

    if (action.name === "genres") {
      if (selectedItems.length == 1) {
        setGenreID(selectedItems[0].value);
      } else if (selectedItems.length == 0) {
        setGenreID("");
      } else {
        let IDs = selectedItems[0].value;
        for (let i = 1; i < selectedItems.length; i++) {
          IDs = IDs + "," + selectedItems[i].value;
        }
        setGenreID(IDs);
        console.log(IDs);
      }
      setPageNum(1);
    }
  };

  const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    {
      value: `${mediaType == "movie" ? "title" : "name"}.asc`,
      label: "Title (A-Z)",
    },
    {
      value: `${mediaType == "movie" ? "title" : "name"}.desc`,
      label: "Title (Z-A)",
    },
  ];

  const options = [
    { value: genres[0]?.id, label: genres[0]?.name },
    { value: genres[1]?.id, label: genres[1]?.name },
    { value: genres[2]?.id, label: genres[2]?.name },
    { value: genres[3]?.id, label: genres[3]?.name },
    { value: genres[4]?.id, label: genres[4]?.name },
    { value: genres[5]?.id, label: genres[5]?.name },
    { value: genres[6]?.id, label: genres[6]?.name },
    { value: genres[7]?.id, label: genres[7]?.name },
    { value: genres[8]?.id, label: genres[8]?.name },
    { value: genres[9]?.id, label: genres[9]?.name },
    { value: genres[10]?.id, label: genres[10]?.name },
    { value: genres[11]?.id, label: genres[11]?.name },
    { value: genres[12]?.id, label: genres[12]?.name },
    { value: genres[13]?.id, label: genres[13]?.name },
    { value: genres[14]?.id, label: genres[14]?.name },
    { value: genres[15]?.id, label: genres[15]?.name },
    { value: genres[16]?.id, label: genres[16]?.name },
    { value: genres[17]?.id, label: genres[17]?.name },
    { value: genres[18]?.id, label: genres[18]?.name },
  ];
  useEffect(() => {
    fecthShowed();
  }, [genreID, sortby, mediaType]);

  useEffect(() => {
    setPageNum(1);
    setSortby("popularity.desc");
    setGenreID("");
    fetchGenres();
  }, []);

  return (
    <>
      <div className="container pt-36 mx-auto">
        <div className=" flex md:flex-row flex-col gap-3 md:gap-0 md:items-center md:justify-between mb-10">
          <h2 className=" text-2xl">
            Explore{" "}
            {mediaType.charAt(0).toLocaleUpperCase() + mediaType.slice(1)}
          </h2>
          <div className=" md:grid-cols-2 gap-3 grid">
            <Select
              name="genres"
              closeMenuOnSelect={false}
              components={makeAnimated()}
              placeholder={"Select Genres"}
              isMulti
              options={options}
              styles={customStyles}
              onChange={onChange}
            />
            <Select
              name="sortby"
              closeMenuOnSelect={false}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              components={makeAnimated()}
              styles={customStyles}
              options={sortbyData}
            />
          </div>
        </div>

        {isLoading ? (
          <div className=" h-[80vh] w-full relative z-40 flex justify-center items-center">
            <FallingLines
              color="lightblue"
              width="100"
              visible={true}
              ariaLabel="falling-circles-loading"
            />
          </div>
        ) : movies.length > 0 ? (
          <InfiniteScroll
            className=" grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8 mb-6"
            dataLength={movies?.results?.length || []}
            next={fetchNextPageData}
            hasMore={pageNum <= totalPages}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {movies?.map((m, i) => (
              <Card m={m} i={i} mediaType={mediaType} key={i} />
            ))}
          </InfiniteScroll>
        ) : (
          <div className=" h-[60vh] text-blue-900 text-2xl">
            Sorry, Results not found!
          </div>
        )}
      </div>
    </>
  );
};

export default Movies;
