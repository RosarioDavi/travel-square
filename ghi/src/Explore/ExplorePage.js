import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useState, useEffect } from "react";
import { useGetAccountsQuery } from "../store/accountsApi";
import "./Explore.css";
import ShowReview from "./ShowReviews";

export function Explore() {
  // const { data: tokenData} = useGetAccountsQuery();
  const [venues, setVenues] = useState([]);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const filteredVenues = "";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const VenuesUrl = `http://localhost:8000/api/venues/`;
    const response = await fetch(VenuesUrl);
    const newData = await response.json();
    setVenues(newData);
  };

  // handleSubmit(e){
  //   e.preventDefault();
  //   city({city})
  // }

  const filterCards = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredVenues = venues.filter((venue) =>
      `${venue.city} ${venue.state}`.toLowerCase().includes(value)
    );
    //   setCity(filteredVenues)
  };

  //     const handleOptionChange = event =>
  //   {
  //     const value = event.target.value.toLowerCase();
  //     setOptions(value)
  //     console.log(options)
  //   }
  console.log(city);
  const handleOnCityChange = (event) => {
    // event.preventDefault()
    var value = event.target.value.toLowerCase();
    filteredVenues = venues.filter(venues.city == value);
    console.log("TEST", value, filteredVenues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setVenues(filteredVenues);
    const filter = city.filter;
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
          <input type="text" label="Enter City" value={city} id="city" onChange={(e) => setCity(e.target.value)}/>
          <input type="text" label="Enter State" value={state} id="state" onChange={(e) => setState(e.target.value)}/>
          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>


        </form> */}

      <div className="container textbox-padding">
        <form onSubmit={handleSubmit} id="searchCity"></form>
        <div className="d-flex justify-content-center">
          {/* {options.map(option => {
                return (
                <nav>
                <input className= "search-box" placeholder='Search by' onChange={e=>handleOptionChange(e.target.value)}/>
                </nav>
                )
              })} */}
          <input
            className="search-box"
            name="city"
            defaultValue={city}
            placeholder="Search by City"
            onChange={(e) => ({ handleOnCityChange })}
          />
          <input
            className="search-box"
            placeholder="Search by State"
            onInput={filterCards}
          />
          <input
            className="search-box"
            placeholder="Search by Category"
            onInput={filterCards}
          />
          <button className="btn-hue">Search</button>
        </div>
        <div className="justify-content-center textbox-padding card-grid">
          {/* <div className="row">
            <div className="col"> */}
              {venues.map((venue) => {
                return (
                  <Card
                    style={{ margin: "1rem" }}
                    key={venue.id}
                    className="card"
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-center">
                        {venue.venue_name}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted d-flex justify-content-center">
                        Category: {venue.category_id}
                      </Card.Subtitle>
                      <Card.Text className="d-flex justify-content-center">
                        {venue.num_and_street}, {venue.city}, {venue.state},{" "}
                        {venue.zip}
                      </Card.Text>
                      <Card.Text className="d-flex justify-content-center">
                        {venue.description_text}
                      </Card.Text>
                      <Card.Text className="d-flex justify-content-center">
                        by user: {venue.added_by}
                      </Card.Text>
                      <div className="d-flex justify-content-center">
                        <ShowReview venue={venue} />
                        {/* <Button className="btn-hue">Create Review</Button> */}
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
export default Explore;

// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/esm/Button';
// import { useState, useEffect } from "react";
// import { useGetAccountsQuery } from "../store/accountsApi";

// export function Explore() {
//     // const { data: tokenData} = useGetAccountsQuery();
//     const [venues, setVenues] = useState([])
//     const [options, setOptions] = useState({city:"" , state:"" , category:""});
//     const [city, setCity] = useState('');
//     const [state, setState] = useState('');

//     useEffect(() => {
//         fetchData()

//         }, []);

//     const fetchData = async () => {
//             const VenuesUrl = `http://localhost:8000/api/venues/`
//             const response = await fetch(VenuesUrl);
//             const newData = await response.json();
//             setVenues(newData);
//     }

//     // handleSubmit(e){
//     //   e.preventDefault();
//     //   city({city})
//     // }

//     const filterCards = event => {
//       const value = event.target.value.toLowerCase();
//       const filteredVenues = venues.filter(
//         venue => (`${venue.city} ${venue.state}`
//         .toLowerCase())
//         .includes(value)
//       )
//       setCity(filteredVenues)

//     };

//     const handleOptionChange = event =>
//   {
//     const value = event.target.value.toLowerCase();
//     setOptions(value)
//     console.log(options)
//   }
//     return (
//         <>
//         {/* <form onSubmit={handleSubmit}>
//           <input type="text" label="Enter City" value={city} id="city" onChange={(e) => setCity(e.target.value)}/>
//           <input type="text" label="Enter State" value={state} id="state" onChange={(e) => setState(e.target.value)}/>
//           <button type="submit" className="btn btn-outline-success">
//             Submit
//           </button>

//         </form> */}

//         <div className='container' style={{mt:'5rem'}}>
//         <div className='d-flex justify-content-center'>
//             <div className='row'>
//                 <div className='col'>
//                 {venues.map(venue => {
//                     return (
//                           <Card style={{margin:'1rem'}} key={venue.id}>
//                             <Card.Body>
//                                 <Card.Title className='d-flex justify-content-center'>{venue.venue_name}</Card.Title>
//                                 <Card.Subtitle className="mb-2 text-muted d-flex justify-content-center">Category: {venue.category_id}</Card.Subtitle>
//                                 <Card.Text className='d-flex justify-content-center'>
//                                     {venue.num_and_street}, {venue.city}, {venue.state}, {venue.zip}
//                                 </Card.Text>
//                                 <Card.Text className='d-flex justify-content-center'>
//                                     {venue.description_text}
//                                 </Card.Text>
//                                 <Card.Text className='d-flex justify-content-center'>
//                                     by user: {venue.added_by}
//                                 </Card.Text>
//                                 <div className='d-flex justify-content-center'>
//                                 <Button>See Reviews</Button>
//                                 <Button>Create Review</Button>
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                         )
//                     })}
//                 </div>
//           <div>
//               <input className= "search-box" placeholder='Search by City' onChange={e=>()} />
//               <input className= "search-box" placeholder='Search by State' onInput={(filterCards)} />
//               <input className= "search-box" placeholder='Search by Category' onInput={(filterCards)} />
//           </div>
//             </div>
//         </div>
//         </div>
//         </>
//     )
// }
// export default Explore
