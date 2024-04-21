import React, { useEffect, useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Cardlayout from "./components/CardLayout";
import { config } from "./config";
import {
  EventType,
  PublicClientApplication,
  InteractionType,
} from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import { create } from "domain";
import { loginRequest } from "./auth-config";
import { isInterfaceDeclaration } from "typescript";
import { Console } from "console";
import List from "./components/List";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";

function App({ instance }: any) {
  // useMsalAuthentication(InteractionType.Redirect);
  // const [m_struser, setm_struser] = useState<string>("");
  // console.log(m_struser);
  // const Render = () => {
  //   const { accounts } = useMsal();
  //   try {
  //     console.log(m_struser);
  //     const username = accounts[0].username;
  //     setm_struser(username);
  //   } catch (e) {}
  // };

  // if (m_struser != "") {
  return (
    // <MsalProvider instance={instance}>
    <div className="App">
      {/* <Navbar /> */}
      {/* <Cardlayout /> */}
      <Navbar />
      <Outlet />
    </div>
    // </MsalProvider>
  );
  // } else {
  //   return (
  //     <>
  //       {Render()}
  //       <div>Please Wait...</div>
  //     </>
  //   );
  // }
}

export default App;
