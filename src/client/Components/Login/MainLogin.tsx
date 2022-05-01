import React from "react";
import { getCookie } from "../../cookie-utils";
const MainLogin = () => {
  let retval = <div></div>
  if (getCookie("token") != undefined) {
    retval = (
      <a href="/login">
        <button className="button button-login button-heading is-large">
          Go To Dashboard
        </button>
      </a>
    );
  } else {
    retval = (
      <a href="https://discord.com/api/oauth2/authorize?client_id=764794183083884546&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Fredirect&response_type=token&scope=identify%20guilds%20guilds.join">
        <button className="button button-login button-heading is-large">
          Login
        </button>
      </a>
    );
  }
  return <div>{retval}</div>
};

export default MainLogin;
