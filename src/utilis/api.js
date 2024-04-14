import axios from "axios";
const baseURL = "https://api.themoviedb.org/3";
const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmFjNjE1OTRlMDA2NjIyYzFiMTNjOGYyNmMyOWIwMCIsInN1YiI6IjY2MDMzNWM2Yjg0Y2RkMDE3ZGY3YTMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yrI-XA-OKBDxZ1GFTP_uQuyExmcPObxC6VmGJvjz4hU";
export const fetchDataFromAPI = async (url) => {
  try {
    const { data } = await axios.get(`${baseURL}${url}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
