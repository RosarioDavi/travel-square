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
