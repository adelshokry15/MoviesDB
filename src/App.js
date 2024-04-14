import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./pages/layout/Layout";
import { Provider, useDispatch, useSelector } from "react-redux";
import myStore from "./store/store";
import Details from "./pages/detalis/Details";
import { fetchDataFromAPI } from "./utilis/api";
import { getApiConfig } from "./store/HomeSlice";
import Movies from "./pages/movies/Movies";
import Search from "./pages/search/Search";
function App() {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home);
  const { url } = useSelector((state) => state.home);

  const fetchApiConfig = () => {
    fetchDataFromAPI("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfig(url));
    });
  };

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/:mediaType/:id",
          element: <Details />,
        },
        {
          path: "/:mediaType",
          element: <Movies />,
        },
        {
          path: "/search/:query",
          element: <Search />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
