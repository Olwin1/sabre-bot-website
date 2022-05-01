import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MainLogin, NavLogin } from "./Components/Login";
import "./scss/app";
import "../../node_modules/react-notifications-component/dist/theme.css";
import { ReactNotifications } from 'react-notifications-component'

console.log(window.location.href);
if (window.location.pathname.includes("/login")) {
  const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
  root.render(<React.StrictMode><div><ReactNotifications /><App /></div></React.StrictMode>);
} else {
  const MainLoginComponent = ReactDOM.createRoot(document.getElementById("mainbutton") as HTMLElement);
  MainLoginComponent.render(<React.StrictMode><MainLogin /></React.StrictMode>);
  const NavLoginComponent = ReactDOM.createRoot(document.getElementById("navbutton") as HTMLElement);
  NavLoginComponent.render(<React.StrictMode><NavLogin /></React.StrictMode>);
}
