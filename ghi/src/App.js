import ExplorePage from "./Explore/ExplorePage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Nav";
import HomePage from "./HomePage";
import { UnapprovedVenues } from "./Admin/UnapprovedVenues";
import CreateRequest from "./Request/CreateRequest";
import RequestList from "./Request/RequestList";
import ViewComment from "./Request/ViewComment";
// import CreateReviewModal from "./ReviewForm";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <ErrorNotification error={error} /> */}
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          {/* <Route path="/review" element={<CreateReviewModal />} /> */}
          <Route path="/admin" element={<UnapprovedVenues />} />
          <Route path="/request" element={<RequestList />} />
          <Route path="/request/new" element={<CreateRequest />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
