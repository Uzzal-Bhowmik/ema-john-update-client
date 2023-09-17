import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Shop from './components/Shop/Shop';
import Main from './layout/Main';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import { productAndCartLoader } from './loaders/productsAndCartLoader';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ErrorPage from './components/ErrorPage/ErrorPage';
import About from './components/About/About';
import PrivateRoute from './routes/PrivateRoute';

function App() {


  const router = createBrowserRouter([

    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          loader: () => fetch("/products.json"),
          element: <Shop />
        },
        {
          path: "/orders",
          loader: productAndCartLoader,
          element: <Orders />
        },
        {
          path: "/inventory",
          element: <Inventory />
        },
        {
          path: "/place-order",
          element: <PrivateRoute><PlaceOrder></PlaceOrder></PrivateRoute>
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }
      ]

    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
