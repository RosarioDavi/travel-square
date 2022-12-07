import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
        className="d-grid gap-2 d-sm-flex justify-content-sm-center"
        style={{ marginTop: "50px" }}
      >
        <Link to="/request/new">
          <Button className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            Create A New Request
          </Button>
        </Link>
      </div>
      <div className="container" style={{ mt: "5rem", overflow: "auto" }}>
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col">
              {requests.map((request) => {
                return (
                  <Card style={{ margin: "1rem" }} key={request.id}>
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-center">
                        {request.txt}
                      </Card.Title>
                      <Card.Text className="d-flex justify-content-center">
                        Made by: {request.username}
                      </Card.Text>
                      <div className="d-flex justify-content-center">
                        <Button>Make a Comment</Button>
                        {/* <Button>Delete</Button> */}
                      </div>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">{request.created_at}</small>
                    </Card.Footer>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
