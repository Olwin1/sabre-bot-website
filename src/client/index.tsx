import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import { MainLogin, NavLogin } from "./Components/Login";
import "./scss/app";

console.log(window.location.href);
if (window.location.pathname.includes("/login")) {
  render(<App />, document.getElementById("app"));
} else {
  render(<MainLogin />, document.getElementById("mainbutton"));
  render(<NavLogin />, document.getElementById("navbutton"));
}
