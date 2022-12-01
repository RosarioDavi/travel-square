import React from "react";

function HomePage() {
  return (
    <div className="cover">
      <h1>discover what's out there.</h1>
      <form className="flex-form">
        <label for="from">
          <i className="ion-location"></i>
        </label>
        <input type="search" placeholder="where do you want to go?" />
        <input type="submit" value="search" />
      </form>
      <div id="madeby">
        <span>
          Photo by{" "}
          <a href="https://unsplash.com/@benblenner" target="_blank">
            Ben Blennerhassett
          </a>
        </span>
      </div>
    </div>
  );
}
export default HomePage;
