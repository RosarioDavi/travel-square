import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container'
import { useState, useEffect } from "react";
import { useGetAccountsQuery } from "../store/accountsApi";

export function UnapprovedVenues() {
    // const { data: tokenData} = useGetAccountsQuery();
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        fetchData()

        }, []);

        // console.log(venues)
    const fetchData = async () => {
            const UnapprovedVenuesUrl = 'http://localhost:8000/api/venues/unapproved/'
            const response = await fetch(UnapprovedVenuesUrl);
            const newData = await response.json();
            setVenues(newData);
    }

    return (
        <>
        {/* <Container style={{padding: '15rem'}}>
            <Col>
                {venues.map(venue => {
                    return (
                        <Card style={{margin:'1rem'}} key={venue.id}>
                            <Card.Body>
                                <Card.Title>{venue.venue_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Category: {venue.category_id}</Card.Subtitle>
                                <Card.Text>
                                    {venue.num_and_street}, {venue.city}, {venue.state}, {venue.zip}
                                </Card.Text>
                                <Card.Text>
                                    {venue.description_text}
                                </Card.Text>
                                <Button>Review</Button>
                                <Button>Delete</Button>
                            </Card.Body>
                        </Card>
                        )
                    })}
            </Col>
        </Container> */}
        <div className='container' style={{mt:'5rem'}}>
        <div className='d-flex justify-content-center'>
            <div className='row'>
                <div className='col'>
                {venues.map(venue => {
                    return (
                        <Card style={{margin:'1rem'}} key={venue.id}>
                            <Card.Body>
                                <Card.Title className='d-flex justify-content-center'>{venue.venue_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted d-flex justify-content-center">Category: {venue.category_id}</Card.Subtitle>
                                <Card.Text className='d-flex justify-content-center'>
                                    {venue.num_and_street}, {venue.city}, {venue.state}, {venue.zip}
                                </Card.Text>
                                <Card.Text className='d-flex justify-content-center'>
                                    {venue.description_text}
                                </Card.Text>
                                <Card.Text className='d-flex justify-content-center'>
                                    by user: {venue.added_by}
                                </Card.Text>
                                <div className='d-flex justify-content-center'>
                                <Button>Review</Button>
                                <Button>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        )
                    })}
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
