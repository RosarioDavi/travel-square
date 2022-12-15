import React from "react";
import { useState } from "react";
import { useGetTokenQuery } from "../store/authApi";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

function BootstrapInputFields(props) {
  const { id, label, value, onChange, type, placeholder, maxLength } = props;
  return (
    <div className="mb-3 ">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
}

export default function CreateReview(props) {
  const { data: tokenData, isLoading } = useGetTokenQuery();
  const [review_description, setReview_description] = useState("");
  const [rating, setRating] = useState("");
  const [picture, setPicture] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const newCommentSubmitFn = props.setNewCommentSubmit;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ReviewUrl = `http://localhost:8000/api/reviews`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({
        review_description: review_description,
        rating: rating,
        picture: picture,
        venue_id: props.venue,
      }),
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(ReviewUrl, fetchConfig);
    if (response.ok) {
      newCommentSubmitFn(true);
      setShow(false);
      setReview_description("");
    }
  };

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (tokenData && tokenData.access_token) {
    return (
      <>
        <Button className="login-btn-primary" onClick={handleShow}>
          Make A Review
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add A Review!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={handleSubmit}>
                <BootstrapInputFields
                  id="review_description"
                  label="Write your review!"
                  value={review_description}
                  onChange={(e) => setReview_description(e.target.value)}
                  type="text"
                  placeholder="The vibes were immaculate!"
                />
                <BootstrapInputFields
                  id="rating"
                  label="Rate this place!"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  type="text"
                  placeholder="rate this place!"
                  maxLength="1"
                />
                <BootstrapInputFields
                  id="picture"
                  label="Add a picture!"
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                  type="text"
                  placeholder="Add a picture!"
                />
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  onClick={handleSubmit}
                >
                  Add!
                </button>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
}
