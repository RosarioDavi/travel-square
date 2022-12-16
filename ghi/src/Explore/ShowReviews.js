import { useState, useEffect } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import CreateReview from "./CreateReview";

export default function ShowReview(props) {
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newCommentSubmit, setNewCommentSubmit] = useState(false);

  useEffect(() => {
    fetchData();
    setNewCommentSubmit(false);
  }, [newCommentSubmit]);

  const venue = props.venue.id;

  const fetchData = async () => {
    const data = props.venue.id;
    const commentUrl = `http://localhost:8000/api/venues/${data}/reviews/`;
    const response = await fetch(commentUrl);
    const newData = await response.json();
    setReviews(newData);
  };

  return (
    <>
      <Button className="btn-hue me-3" onClick={handleShow}>
        Reviews!
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reviews</Modal.Title>
        </Modal.Header>
        {reviews.map((review) => {
          return (
            <Card
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                marginLeft: "15px",
                marginRight: "15px",
              }}
              key={review.id}
            >
              <Card.Img variant="top" src={review.picture} />
              <Card.Body>
                <Card.Title>
                  {review.username} rated {review.rating} / 5!
                </Card.Title>
                <Card.Text>{review.review_description}</Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
              <Card.Footer>Reviewed {review.created_at}</Card.Footer>
            </Card>
          );
        })}
        <Modal.Footer>
          <CreateReview
            venue={venue}
            setNewCommentSubmit={setNewCommentSubmit}
          />
          <Button className="btn-hue" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
