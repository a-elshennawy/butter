import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shop from './Components/Shop/Shop';
import Reservations from './Components/Reservations/Reservations';
import Gallery from './Components/Gallery/Gallery';
import Blog from './Components/Blog/Blog';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Orders from './Components/Orders/Orders';
import Error_404 from './Components/Error_404/Error_404';
import CurrentReservations from './Components/CurrentReservations/CurrentReservations';


function App() {

  let routes = createBrowserRouter([{
    path: "/", element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "Reservations", element: <Reservations /> },
      { path: "Gallery", element: <Gallery /> },
      { path: "blog", element: <Blog /> },
      { path: "orders", element: <Orders /> },
      { path: "CurrentReservations", element: <CurrentReservations /> }
    ]
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "*", element: <Error_404 /> }
  ]);
  return <RouterProvider router={routes} />
}

export default App;
