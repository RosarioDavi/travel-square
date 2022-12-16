import ExplorePage from "./Explore/ExplorePage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Nav";
import { UnapprovedVenues } from "./Admin/UnapprovedVenues";
import { CategoriesList } from "./Admin/CategoriesList";
import { LocalReviews } from "./Explore/LocalReviews"
import RequestList from "./Request/RequestList";
import AdminDash from "./Admin/AdminDash";
import { useGetTokenQuery } from './store/authApi'

function App() {
  const { data: tokenData, isLoading} = useGetTokenQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (tokenData && tokenData.account.is_admin === true) {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/trending" element={<LocalReviews />} />
            <Route path="/request" element={<RequestList />} />
            <Route path="/unapproved" element={<UnapprovedVenues />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/dashboard" element={<AdminDash />} />
          </Routes>
        </div>
      </BrowserRouter>
    );

  } else {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/trending" element={<LocalReviews />} />
            <Route path="/request" element={<RequestList />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
