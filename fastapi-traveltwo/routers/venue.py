from fastapi import APIRouter, Depends, Response, Optional
from typing import Union
from queries.venue import VenueIn, VenueRepository, VenueOut, Error


router  = APIRouter()

@router.post("/venues", response_model=Union[VenueOut, Error])
def create_venues(
    venue: VenueIn, 
    repo: VenueRepository = Depends()
):   
    Response.status_code = 400
    return repo.create(venue)

@router.get("/venues", response_model=Union[VenueOut, Error])
def get_all(
    repo: VenueRepository = Depends(),
):
    return repo.get_all()

@router.put("/venues/{venue_id}", response_model=Union[VenueOut, Error])
def update_venue(
    venue_id: int,
    venue: VenueIn,
    repo: VenueRepository = Depends(),
) -> Union[Error, VenueOut]:
    return repo.update(venue_id, venue)

@router.delete("/venues/{venue_id}", response_model=bool)
def delete_venue(
    venue_id: int,
    repo: VenueRepository = Depends(),
) -> bool:
    return repo.delete(venue_id)

@router.get("/venues/{venue_id}", response_model=Optional[VenueOut])
def get_one_venue(
    venue_id: int,
    response: Response,
    repo: VenueRepository = Depends(),
) -> VenueOut:
    venue = repo.get_one(venue_id)
    if venue is None:
        response.status_code = 404
    return venue
