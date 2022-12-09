import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../store/authApi";
import "./Request.css";

export function CreateRequest() {
  const { data } = useGetTokenQuery();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [txt, setTxt] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const RequestUrl = "http://localhost:8000/api/requests/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({
        txt: txt,
      }),
      headers: {
        Authorization: `Bearer ${data.access_token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(RequestUrl, fetchConfig);
    if (response.ok) {
      setTxt("");
      handleClose();
    }
  };

  return (
    <>
    <Button variant='primary' onClick={handleShow}>
      Create a New Request
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Request</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <div>
            <Form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
              <Form.Group className="mb-3" id="request">
                <Form.Label></Form.Label>
                <Form.Control
                  value={txt}
                  onChange={(e) => setTxt(e.target.value)}
                  as="textarea"
                  placeholder="request a location"
                  rows={3}
                  required
                />
              </Form.Group>
              <button type="submit" className="btn-hue">
                Submit
              </button>
            </Form>
          </div>
      </Modal.Body>
    </Modal>
    </>
  )
}
