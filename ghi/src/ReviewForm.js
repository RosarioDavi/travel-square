import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from '../store/authApi';

function BootstrapInputFields(props) {
  const { id, label, value, onChange, type, placeholder } = props;
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
      />
    </div>
  );
}

function CreateReviewModal() {
  const { data: tokenData } = useGetTokenQuery();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [venue_id, setVenueId] = useState("");
  const [review_description, setReviewDescription] = useState("");
  const [rating, setRating] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    createReview({ username, password });
  }

  useEffect(() => {
    if (result.isSuccess) {
      setError("");
      setVenueId("");
      setReviewDescription("");
      setRating("");
      setPicture("");
      handleClose();
      navigate("/")
    } else if (result.isError) {
      setError(result.error.data.detail);
    }
  }, [result]);

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        login
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>create a review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit}>
                    <BootstrapInputFields
                        id="venue_id"
                        label="Enter Venue Name"
                        value={venue_id}
                        onChange={(e) => setVenueId(e.target.value)}
                        type="text"
                        placeholder="Enter Venue Name"
                    />
                    <BootstrapInputFields
                        id="review_description"
                        label="Enter Review"
                        value={password}
                        onChange={(e) => setReviewDescription(e.target.value)}
                        type="text"
                        placeholder="Review goes here"
                    />
                    <BootstrapInputFields
                        id="rating"
                        label="Enter Rating"
                        value={password}
                        onChange={(e) => setRating(e.target.value)}
                        type="number"
                        placeholder="5"
                    />
                    <BootstrapInputFields
                        id="picture"
                        label="Enter Picture URL"
                        value={password}
                        onChange={(e) => setPicture(e.target.value)}
                        type="text"
                        placeholder="Photo goes here"
                    />
                    <button type="submit" className="btn btn-outline-success">
                        Login
                    </button>
                    <div className="text-center mt-4" style={{ color: "red" }}>
                    </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateReviewModal;
