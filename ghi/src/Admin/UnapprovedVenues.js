import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../store/authApi";
import { useGetUnapprovedVenuesQuery } from '../store/adminApi';

export function UnapprovedVenues() {
    const { data: tokenData} = useGetTokenQuery();
    const { data: venuesData, isLoading } = useGetUnapprovedVenuesQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

    return (
        <>
        <div className='container' style={{mt:'5rem'}}>
        <div className='d-flex justify-content-center'>
            <div className='row'>
                <div className='col'>
                {venuesData.map(venue => {
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
                                <Button>Update</Button>
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
