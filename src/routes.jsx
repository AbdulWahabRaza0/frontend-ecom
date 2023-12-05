import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Cart from "./components/Cart";
const routes = [
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/product/:pid",
    element: (
      <>
        <Product />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Cart />
      </>
    ),
  },
];
export default routes;
