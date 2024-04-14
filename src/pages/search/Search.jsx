import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component/dist/index.es";
import { FallingLines } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/Card";
import { useParams } from "react-router-dom";
import { getResults } from "../../store/SearchSlice";
import { fetchDataFromAPI } from "../../utilis/api";

const Search = () => {
  const { searchResults, loading } = useSelector((store) => store.search);
  const [pageNum, setPageNum] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(2);

  const { query } = useParams();

  const dispatch = useDispatch();

  async function getSearchResults() {
    const data = await dispatch(getResults({ s: query, pageNum }));
    setMovies(data?.payload?.data?.results);
    setTotalPages(data?.payload?.data?.total_pages);
  }
  async function getNextSearchResults() {
    if (pageNum > 1) {
      const data = await dispatch(getResults({ s: query, pageNum }));
      setMovies([...movies, ...data?.payload?.data?.results]);
    }
    setPageNum((prev) => prev + 1);
  }

  useEffect(() => {
    getSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto pt-28 ">
      {loading ? (
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
          className=" grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8 mb-6 h-full overflow-hidden"
          dataLength={searchResults?.length || []}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          next={getNextSearchResults}
          hasMore={pageNum <= totalPages}
        >
          {movies?.map((m, i) => {
            if (m.media_type === "person") return;
            return <Card m={m} i={i} mediaType={m.media_type} key={i} />;
          })}
        </InfiniteScroll>
      ) : (
        <div className=" text-2xl h-[60vh]">
          Sorry, Search Results not found!
        </div>
      )}
    </div>
  );
};

export default Search;
