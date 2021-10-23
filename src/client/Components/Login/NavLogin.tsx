import React from "react";
import { getCookie } from "../../cookie-utils";
const NavLogin = () => {
  var divStyle = {
    borderRadius: "30px",
  };
  if (getCookie("token") != undefined) {
    return (
		<button className="button is-info is-outlined" style={divStyle}>
        Go To Dashboard
      </button>
    );
  }
  return (
    <button className="button is-info is-outlined" style={divStyle}>
      Login
    </button>
  );
};

export default NavLogin;
