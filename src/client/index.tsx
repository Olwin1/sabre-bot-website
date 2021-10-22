import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import { MainLogin, NavLogin } from "./Components/Login";
import "./scss/app";

render(<App />, document.getElementById("app"));

render(<MainLogin />, document.getElementById("mainbutton"));
render(<NavLogin />, document.getElementById("navbutton"));
