import React from "react";
import "./Nav.css";


export default function HomePage() {
  return (
    <div className="cover">
      <h1>discover what's out there.</h1>
      <form className="flex-form">
        <label htmlFor="from">
        </label>
        <input type="search" placeholder="where do you want to go?" />
        <input type="submit" value="search" />
      </form>
      {/* <div id="madeby">
        <span>
          Photo by{" "}
          <a href="https://unsplash.com/@benblenner">
            Ben Blennerhassett
          </a>
        </span>
      </div> */}
    </div>
  );
}
