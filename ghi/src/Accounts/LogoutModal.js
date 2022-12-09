import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useLogOutMutation, useGetTokenQuery } from '../store/authApi';
import "./Accounts.css";

export function LogoutModal() {
    const { data: tokenData } = useGetTokenQuery()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [logout, result] = useLogOutMutation();
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        handleClose();
        logout();
    }

    useEffect(() => {
        if (result.isSuccess) {
            setError("");
            navigate("/");
        } else if (result.isError) {
        setError(result.error.data.detail);
        }
    }, [result]);

    return (
        <>
            <Button className="login-btn-primary" onClick={handleShow}>
                logout
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ready to logout?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="columns is-centered">
                        <div className="column is-one-third">
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Logout
                            </button>
                        </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    )
}
