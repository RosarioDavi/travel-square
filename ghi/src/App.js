import ExplorePage from "./Explore/ExplorePage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Nav";
import HomePage from "./HomePage";
import { UnapprovedVenues } from "./Admin/UnapprovedVenues";
import { CategoriesList } from "./Admin/CategoriesList";
import CreateRequest from "./Request/CreateRequest";
import RequestList from "./Request/RequestList";

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
          <Route path="/request" element={<RequestList />} />
          <Route path="/request/new" element={<CreateRequest />} />
          <Route path="/unapproved" element={<UnapprovedVenues />} />
          <Route path="/categories" element={<CategoriesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
