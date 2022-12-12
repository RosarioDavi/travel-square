import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import ViewComment from "./ViewComment";
import { CreateRequest } from "./CreateRequest";

export default function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const requestUrl = "http://localhost:8000/api/requests/";
    const response = await fetch(requestUrl);
    const newData = await response.json();
    setRequests(newData);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <CreateRequest />
      </div>
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <div>
          {requests.map((request) => {
            return (
              <Card
                key={request.id}
                style={{ marginBottom: "50px", width: "500px" }}
              >
                <Card.Header as="h5">
                  Request by: {request.username} @ {request.created_at}
                </Card.Header>
                <Card.Body>
                  <Card.Title>Looking for: {request.txt}</Card.Title>
                  <ViewComment request={request} />
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
