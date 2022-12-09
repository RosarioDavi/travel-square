import ExplorePage from "./Explore/ExplorePage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Nav";
import HomePage from "./HomePage";
import { UnapprovedVenues } from "./Admin/UnapprovedVenues";
import { CategoriesList } from "./Admin/CategoriesList";
import RequestList from "./Request/RequestList";
import { useGetTokenQuery } from './store/authApi'

// import CreateReviewModal from "./ReviewForm";

function App() {
  const { data: tokenData, isLoading} = useGetTokenQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (tokenData && tokenData.account.is_admin === true) {
    return (
      <BrowserRouter>
        <div>
          {/* <ErrorNotification error={error} /> */}
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/request" element={<RequestList />} />
            <Route path="/unapproved" element={<UnapprovedVenues />} />
            <Route path="/categories" element={<CategoriesList />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <div>
          {/* <ErrorNotification error={error} /> */}
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/request" element={<RequestList />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
