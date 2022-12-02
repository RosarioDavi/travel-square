import { useEffect, useState } from "react";
import ExplorePage from "./ExplorePage";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Nav";
import HomePage from "./HomePage";
// import CreateRequest from "./Request/CreateRequest";
// import RequestList from "./Request/RequestList";

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <div>
        <ErrorNotification error={error} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          {/* <Route path="/request" element={<RequestList />} />
          <Route path="/request/new" element={<CreateRequest />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
