import React from "react";
import TextExample from './Card';

function ExplorePage() {
  return (
    <div className="">
        <div className="px-4 py-5 my-5 text-center bg-success rounded-pill text-white">
          <h1 className="display-5 fw-bold">Explore</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Time to travel
            </p>
          </div>
        </div>
        <div>
          <TextExample />
        </div>

    </div>
    
  );
}

export default ExplorePage;

