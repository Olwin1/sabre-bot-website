import React from "react";
import { getCookie } from "../../cookie-utils";
const MainLogin = () => {
  if (getCookie("token") != undefined) {
    return (
      <button className="button button-login button-heading is-large">
        Go To Dashboard
      </button>
    );
  }
  else {
  return (
    <button className="button button-login button-heading is-large">
      Login
    </button>
  );
}
};

export default MainLogin;
