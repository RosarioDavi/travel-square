import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useState, useEffect } from "react";
import "./Explore.css";
import ShowReview from "./ShowReviews";
import { CreateVenue } from "./CreateVenue";

export function Explore() {
  const [venues, setVenues] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const stateUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    const VenuesUrl = `http://localhost:8000/api/venues/${state}/${city}`;
    const responseVenues = await fetch(VenuesUrl);
    const venueData = await responseVenues.json();
    setVenues(venueData);
  }

  // useEffect(() => {
  //   async function getCategories() {
  //     const CategoriesUrl = "http://localhost:8000/api/categories/";
  //     const responseCategories = await fetch(CategoriesUrl);
  //     const categoriesData = await responseCategories.json();
  //     setCategories(categoriesData);
  //   }
  //   function filterVenues(category) {
  //     if (!category) {
  //       setVenues(venues);
  //     } else {
  //       let filteredVenues = [];
  //       for (const venue of venues) {
  //         if (venue.category_name === category) {
  //           filteredVenues.push(venue);
  //         }
  //       }
  //       setVenues(filterVenues);
  //     }
  //   }
  //   getCategories();
  //   filterVenues();
  // }, [venues, setVenues])

  return (
    <>
      <div className="container textbox-padding">
        <form onSubmit={handleSubmit} id="searchCity">
          <div className="d-flex justify-content-center">
            <input
              className="search-box"
              name="city"
              defaultValue={city}
              placeholder="Search by City"
              onChange={(e) => setCity(e.target.value)}
              type="text"
            />
            <input
              className="search-box"
              name="state"
              defaultValue={state}
              placeholder="Search by State"
              onChange={(e) => setState(e.target.value)}
              maxLength="2"
              type="text"
              onInput={stateUppercase}
            />
            <button className="btn-hue">Search</button>
          </div>
        </form>

        {/* <div className="mb-3">
          <label htmlFor="category" className="form-label">Choose a Category</label>
          <select required className="form-select" type="number" name="category" id="category" aria-label="Choose a Category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(category => (
                <option key={category.id} value={category.category_name}>
                    {category.category_name}
                </option>
            ))}
          </select>
          </div> */}

      </div>
      <CreateVenue />
      <div className="justify-content-center textbox-padding card-grid">
        {venues.map((venue) => {
          return (
            <Card style={{ margin: "1rem" }} key={venue.id} className="card">
              <Card.Body>
                <Card.Title className="d-flex justify-content-center">
                  {venue.venue_name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted d-flex justify-content-center">
                  {venue.category_name}
                </Card.Subtitle>
                <Card.Text className="d-flex justify-content-center">
                  {venue.num_and_street}, {venue.city}, {venue.state},{" "}
                  {venue.zip}
                </Card.Text>
                <Card.Text className="d-flex justify-content-center">
                  {venue.description_text}
                </Card.Text>
                <Card.Text className="d-flex justify-content-center">
                  by user: {venue.added_by_username}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <ShowReview venue={venue} />
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Explore;
