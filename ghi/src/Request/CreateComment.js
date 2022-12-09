import React from "react";
import { useState } from "react";
import { useGetTokenQuery } from "../store/authApi";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

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

export default function CreateComment(props) {
  const { data } = useGetTokenQuery();
  const [txt, setTxt] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const newCommentSubmitFn = props.setNewCommentSubmit;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const CommentUrl = `http://localhost:8000/api/comments`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({
        txt: txt,
        request_id: props.request,
      }),
      headers: {
        Authorization: `Bearer ${data.access_token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(CommentUrl, fetchConfig);
    if (response.ok) {
      newCommentSubmitFn(true);
      setShow(false);
      setTxt("");
    }
  };
  return (
    <>
      <Button className="login-btn-primary" onClick={handleShow}>
        Make A Comment
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Comment!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit}>
              <BootstrapInputFields
                id="txt"
                label="Write your comment!"
                value={txt}
                onChange={(e) => setTxt(e.target.value)}
                type="text"
                placeholder="suggest a place!"
              />
              <button
                type="submit"
                className="btn btn-outline-success"
                onClick={handleSubmit}
              >
                Add!
              </button>
              <div className="text-center mt-4" style={{ color: "red" }}></div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
