import React from "react";
import { useGetTokenQuery } from "../store/authApi";
import TextExample from '../Card';
import { Link } from 'react-router-dom';

function VenueColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const venue = data.venue.id;
        return (
          <div key={venue.id} className="card mb-3 shadow">
            <div className="card-body">
              <h5 className="card-title">{venue.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {venue.id}
              </h6>
              <p className="card-text">
                {venue.description}
              </p>
            </div>
            <div className="card-footer">
              <Link href="#">Write A Review</Link>
              <Link href="#">See All Reviews</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venueColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/venues/';

    try {
      const response = await fetch(url);
      if (response.ok) {

        const data = await response.json();

        // const responses = await Promise.all(requests);


        const venueColumns = [[], [], []];
        let i = 0;
        for (const venueResponse of response) {
          if (venueResponse.ok) {
            const details = await venueResponse.json();
            venueColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(venueResponse);
          }
        }

        this.setState({venueColumns: venueColumns});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
          <h1 className="display-5 fw-bold">Explore!</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Oh the places you'll go!.
            </p>
          </div>
        </div>
        <div className="container">
          <h1>Venues</h1>
          <div className="row">
            {this.state.venueColumns.map((venueList, index) => {
              return (
                <venueColumn key={index} list={venueList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default ExplorePage;
