import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Paths } from "./constants/paths";
import { Home } from "./pages/home";
import { Favorites } from "./pages/favorites";

import "./index.css";
import { ArtworkDetails } from "./pages/artwork";
import { ErrorPage } from "./pages/errorPage";

const router = createBrowserRouter(
  [
    {
      path: Paths.home,
      element: <Home></Home>,
    },
    {
      path: Paths.favorites,
      element: <Favorites></Favorites>,
    },
    {
      path: `${Paths.artwork}/:id`,
      element: <ArtworkDetails></ArtworkDetails>,
    },
    {
      path: Paths.notFound,
      element: <ErrorPage></ErrorPage>,
    },
  ],
  { basename: "/Museum-of-art/" },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);

