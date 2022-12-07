import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useGetTokenQuery } from "../store/authApi";

function CreateRequest() {
  const { data } = useGetTokenQuery();
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
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </Form>
  );
}

export default CreateRequest;