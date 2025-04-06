import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Error_404 from "./Components/Error_404/Error_404";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";

const lazyLoad = (path, namedExport = null) =>
  lazy(() =>
    import(`./Components/${path}.jsx`).then((module) => ({
      default: namedExport ? module[namedExport] : module.default,
    }))
  );

const Home = lazyLoad("Home/Home");
const Shop = lazyLoad("Shop/Shop");
const Reservations = lazyLoad("Reservations/Reservations");
const Gallery = lazyLoad("Gallery/Gallery");
const Blog = lazyLoad("Blog/Blog");
const Login = lazyLoad("Login/Login");
const Register = lazyLoad("Register/Register");
const Orders = lazyLoad("Orders/Orders");
const CurrentReservations = lazyLoad("CurrentReservations/CurrentReservations");

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
        createRoute("current-reservations", <CurrentReservations />),
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
