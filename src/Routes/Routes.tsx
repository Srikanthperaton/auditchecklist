/* eslint eqeqeq: "off", curly: "error" -- Here's a description about why this configuration is necessary. */
/* eslint-disable react/no-direct-mutation-state */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Examinor from "../Pages/Examinor/Examinor";
import AdminLog from "../Pages/AdminLogs/AdminLogs";
import Cardlayout from "../components/CardLayout";
import CheckList from "../Pages/CheckList/CheckList";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Authentication/Login";
import Registration from "../Pages/Authentication/Registration";
// import Login from "../Pages/Authentication/Login";
// import Registration from "../Pages/Authentication/Registration";
const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
    ],
  },
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "home",
        element: getFromLocalStorage("token-info") ? <Cardlayout /> : <Login />,
      },
      {
        path: "checkList",
        element: getFromLocalStorage("token-info") ? <CheckList /> : <Login />,
        //element: <CheckList />,
      },
      {
        path: "examinor",
        element: getFromLocalStorage("token-info") ? <Examinor /> : <Login />,
      },
      {
        path: "adminlog",
        element: getFromLocalStorage("token-info") ? <AdminLog /> : <Login />,
      },
      {
        path: "resources",
        element: getFromLocalStorage("token-info") ? <AdminLog /> : <Login />,
      },
      {
        path: "dashboard",
        element: getFromLocalStorage("token-info") ? <Dashboard /> : <Login />,
      },
    ],
  },
]);
