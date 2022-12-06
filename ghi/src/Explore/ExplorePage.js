import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from "react";
import { useGetAccountsQuery } from "../store/accountsApi";

export function Explore() {
    // const { data: tokenData} = useGetAccountsQuery();
    const [venues, setVenues] = useState([]);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    useEffect(() => {
        fetchData()

        }, []);


    const fetchData = async () => {
            const VenuesUrl = `http://localhost:8000/api/venues/`
            const response = await fetch(VenuesUrl);
            const newData = await response.json();
            setVenues(newData);
    }

    // handleSubmit(e){
    //   e.preventDefault();
    //   city({city})
    // }



    return (
        <>
        {/* <form onSubmit={handleSubmit}>
          <input type="text" label="Enter City" value={city} id="city" onChange={(e) => setCity(e.target.value)}/>
          <input type="text" label="Enter State" value={state} id="state" onChange={(e) => setState(e.target.value)}/>
          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>


        </form> */}
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
export default Explore