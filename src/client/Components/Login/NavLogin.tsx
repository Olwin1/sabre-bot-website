import React from "react";
import { getCookie } from "../../cookie-utils";
const NavLogin = () => {
  var divStyle = {
    borderRadius: "30px",
  };
  if (getCookie("token") != undefined) {
    return (
      <a className="navbar-item" href="/login">
        <button className="button is-info is-outlined" style={divStyle}>
          Go To Dashboard
        </button>
      </a>
    );
  }
  return (
    <a
      className="navbar-item"
      href="https://discord.com/api/oauth2/authorize?client_id=764794183083884546&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Fredirect&response_type=token&scope=identify%20guilds%20guilds.join"
    >
      <button className="button is-info is-outlined" style={divStyle}>
        Login
      </button>
    </a>
  );
};

export default NavLogin;
