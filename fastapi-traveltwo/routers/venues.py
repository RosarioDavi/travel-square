from fastapi import APIRouter, Depends, Response, Request
from typing import Optional
from typing import Union
from queries.venues import VenueIn, VenueOut, VenueCompleteOut, VenueRepository, Error, CategoryIn, CategoryOut, CategoryRepository


router  = APIRouter()

@router.post("/api/categories/", response_model=CategoryOut)
def create_category(
    category: CategoryIn,
    repo: CategoryRepository = Depends(),
):
    return repo.create(category)

@router.get("/api/categories/", response_model=list[CategoryOut])
def get_all_categories(
    repo: CategoryRepository = Depends()
):
    return repo.get_all_categories()


@router.post("/api/venues/", response_model=VenueOut)
def create_venues(
    venue: VenueIn,
    request: Request,
    response: Response,
    repo: VenueRepository = Depends(),
):
    approved = False
    return repo.create(venue, approved)

@router.get("/api/venues/", response_model=list[VenueCompleteOut])
def get_all_complete(
    repo: VenueRepository = Depends(),
):
    return repo.get_all_complete()

@router.put("/api/venues/{venue_id}", response_model=Union[VenueOut, Error])
def update_venue(
    venue_id: int,
    venue: VenueIn,
    repo: VenueRepository = Depends(),
) -> Union[Error, VenueOut]:
    return repo.update(venue_id, venue)

@router.delete("/api/venues/{venue_id}", response_model=bool)
def delete_venue(
    venue_id: int,
    repo: VenueRepository = Depends(),
) -> bool:
    return repo.delete(venue_id)

@router.get("/api/venues/{venue_id}", response_model=Optional[VenueOut])
def get_one_venue(
    venue_id: int,
    response: Response,
    repo: VenueRepository = Depends(),
) -> VenueOut:
    venue = repo.get_one_venue(venue_id)
    if venue is None:
        response.status_code = 404
    return venue

@router.get("api/venues/{state}/{city}/")
def get_all_venues_city_state(
    state: str,
    city: str,
    response: Response,
    repo: VenueRepository = Depends(),
):
    return repo.get_all_venues_city_state(state, city)
