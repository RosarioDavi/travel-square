import { useState, useEffect } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ShowReview(props) {
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  // const venue = props.venue.id;

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
            <Modal.Body key={review.id}>
              {review.username} {""}
              {review.created_at} : {""}
              {review.review_description}
            </Modal.Body>
          );
        })}
        <Modal.Footer>
          <Button className="btn-hue" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
