import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ViewComment from "./ViewComment";
// import * as bootstrap from "bootstrap";
// import ViewComment from "./ViewComment";

export default function RequestList() {
  const [requests, setRequests] = useState([]);
  const cssClass = "d-grid gap-2 d-sm-flex justify-content-sm-center";

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
      {/* <div
        className="d-grid gap-2 d-sm-flex justify-content-sm-center"
        style={{ marginTop: "50px" }}
      ></div>
      <Link to="/request/new">
        <Button className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          Create A New Request
        </Button>
      </Link>
      <div class="card text-center">
        {requests.map((request) => {
          return (
            <>
              <div class="card-body">
                <h5 class="card-title">Request by: {request.username}</h5>
                <p class="card-text">{request.txt}</p>
                <ViewComment request={request} />
              </div>
              <div class="card-footer text-muted">
                Created date: {request.created_at}
              </div>
            </>
          );
        })}
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
          // flexDirection: "row",
        }}
      >
        <Link to="/request/new">
          <Button className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            Create A New Request
          </Button>
        </Link>
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
