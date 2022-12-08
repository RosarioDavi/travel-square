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

function UpdateVenueModal() {

}
