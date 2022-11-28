import React from "react";
import videoBg from './assets/videoBg.mp4'
import video from './index.css'

function MainPage() {
  return (
    <div className="">
      <video src={videoBg} autoPlay loop muted/>
        <div className="px-4 py-5 my-5 text-center bg-success rounded-pill text-white">
          <h1 className="display-5 fw-bold">Travel</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Time to travel
            </p>
          </div>
        </div>
    </div>
  );
}

export default MainPage;
