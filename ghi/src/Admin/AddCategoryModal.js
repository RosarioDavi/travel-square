import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal"
import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "../store/authApi"

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

export function AddCategoryModal() {
    const { data: tokenData } = useGetTokenQuery();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [category_name, setCategory_name] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()
    }

    useEffect(() => {
        console.log('hey')
    })
}
