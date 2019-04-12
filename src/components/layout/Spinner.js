import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={spinner} alt="Loading..." />
    </div>
  );
}
