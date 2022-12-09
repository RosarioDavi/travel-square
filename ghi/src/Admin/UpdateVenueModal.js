import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal"
import { useNavigate } from "react-router-dom";
import { useUpdateVenueMutation } from "../store/adminApi";

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

function UpdateVenueModal(id, name, street, city, state, zip, category_id, description_text) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updateVenue, result] = useUpdateVenueMutation;
    const [venue_id] = id;
    const [venue_name, setVenue_name] = useState("");
    const [num_and_street, setNum_and_street] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [description_text, setDescription_text] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        updateVenue({
            venue_id,
            venue_name,
            num_and_street,
            city,
            state,
            zip,
            category_id,
            description_text
        })
    }

    useEffect(() => {
        if (result.isSuccess) {
            setError("");
            setVenue_name("");
            setNum_and_street("");
            setCity("");
            setState("");
            setZip("");
            setCategory_id("");
            setDescription_text("");
            handleClose();
        } else if (result.isError) {
            setError(result.error.data.detail)
        }
    }, [result]);

    return (
        <>
        <Button variant='primary' onClick={handleShow}>
            Update and Approve
        </Button>
        <Modal>
            <Modal.Header closeButton>
                <Modal.Title>Review Submitted Venue</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <form onSubmit={handleSubmit}>

                    </form>
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}
