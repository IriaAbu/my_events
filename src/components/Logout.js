import React from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
  if (
    window.location.href.split("/")[
      window.location.href.split("/").length - 1
    ] === "logout"
  ) {
    document.cookie =
      "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return <Redirect to="/" />;
  }
};

export default Logout;
