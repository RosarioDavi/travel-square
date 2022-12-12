import Card from "react-bootstrap/Card";
import { useState } from "react";

export function LocalReviews() {
    const [reviews, setReviews] = useState([]);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const stateUppercase = e => {
        e.target.value = ("" + e.target.value).toUpperCase();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData();
    };

    const fetchData = async () => {
        const ReviewsUrl = `http://localhost:8000/api/reviews/${state}/${city}`;
        const responseReviews = await fetch(ReviewsUrl);
        const reviewData = await responseReviews.json();
        setReviews(reviewData);
    }

    return (
        <>
        <div className='container textbox-padding'>
        <form onSubmit={handleSubmit}>
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

        <div className="d-flex justify-content-center textbox-padding">
            <div className="row">
                <div className="col">
                    {reviews.map((review) => {
                        return (
                            <Card
                                style={{ margin: "1rem"}}
                                key={review.id}
                                className="card"
                            >
                                <Card.Body>
                                    <Card.Title>
                                        {review.username}'s experience at {review.venue_name}!
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
        </div>
        </>
    )

}
