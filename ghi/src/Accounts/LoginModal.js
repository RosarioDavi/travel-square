import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useLogInMutation, useGetTokenQuery } from '../store/authApi';

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

export function LoginModal() {
  const { data: tokenData } = useGetTokenQuery();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [login, result] = useLogInMutation();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    login({ username, password });
  }

  useEffect(() => {
    if (result.isSuccess) {
      setError("");
      setPassword("");
      setUsername("");
      handleClose();
      navigate("/")
    } else if (result.isError) {
      setError(result.error.data.detail);
    }
  }, [result]);

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Login
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome back!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit}>
                    <BootstrapInputFields
                        id="username"
                        label="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="RileyCodes"
                    />
                    <BootstrapInputFields
                        id="password"
                        label="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="**********"
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
