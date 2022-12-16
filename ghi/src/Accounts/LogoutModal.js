import { useState, useEffect } from "react";
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
        logout();
    }

    useEffect(() => {
        if (result.isSuccess) {
            setError("");
            handleClose();
            navigate("/");
        } else if (result.isError) {
        setError(result.error.data.detail);
        }
    }, [result]);

    return (
        <>
            <Button className="btn-hue" onClick={handleShow}>
                Log Out
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>Ready to log out?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="columns is-centered">
                        <div className="column is-one-third">
                            <button className="btn-hue" onClick={handleSubmit}>
                                Log Out
                            </button>
                        </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer"></Modal.Footer>
            </Modal>
        </>
    )
}
