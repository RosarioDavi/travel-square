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
            required
            placeholder="Search by City"
            onChange={(e) => setCity(e.target.value)}
            type="text"
          />
          <input
            className="search-box"
            name="state"
            defaultValue={state}
            required
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
                                    <Card.Subtitle className="mb-2 text-muted d-flex justify-content-center">
                                        on {review.created_at}
                                    </Card.Subtitle>
                                    <Card.Text className="d-flex justify-content-center">
                                        {review.review_description}
                                    </Card.Text>
                                    <Card.Text className="d-flex justify-content-center">
                                        I rate it {review.rating}/5!
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    {review.venue_name} is located at {review.num_and_street}, {review.city}, {review.state} {review.zip}
                                </Card.Footer>
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
