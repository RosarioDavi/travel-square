import { useState, useEffect } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ViewComment(props) {
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = props.request.id;
    const commentUrl = `http://localhost:8000/api/requests/${data}/comments/`;
    const response = await fetch(commentUrl);
    const newData = await response.json();
    setComments(newData);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Comments
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        {comments.map((comment) => {
          return (
            <Modal.Body>
              {comment.username} {""}
              {comment.created_at} : {""}
              {comment.txt}
            </Modal.Body>
          );
        })}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
