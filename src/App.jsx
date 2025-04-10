import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Error_404 from "./Components/Error_404/Error_404";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";

const Home = lazy(() => import("./Components/Home/Home.jsx"));
const Shop = lazy(() => import("./Components/Shop/Shop.jsx"));
const Reservations = lazy(() =>
  import("./Components/Reservations/Reservations.jsx")
);
const Gallery = lazy(() => import("./Components/Gallery/Gallery.jsx"));
const Blog = lazy(() => import("./Components/Blog/Blog.jsx"));
const Login = lazy(() => import("./Components/Login/Login.jsx"));
const Register = lazy(() => import("./Components/Register/Register.jsx"));
const Orders = lazy(() => import("./Components/Orders/Orders.jsx"));
const CurrentReservations = lazy(() =>
  import("./Components/CurrentReservations/UserRes.jsx")
);

const createRoute = (path, element) => ({
  path,
  element: <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>,
});

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        createRoute("", <Home />),
        createRoute("shop", <Shop />),
        createRoute("reservations", <Reservations />),
        createRoute("gallery", <Gallery />),
        createRoute("blog", <Blog />),
        createRoute("orders", <Orders />),
        createRoute("UserRes", <CurrentReservations />),
      ],
    },
    createRoute("login", <Login />),
    createRoute("register", <Register />),
    {
      path: "*",
      element: <Error_404 />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
