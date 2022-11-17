from fastapi import APIRouter, Depends, HTTPException, status
from models import VenueIn, Venue, VenueOut
from queries.venue import VenueQueries



router = APIRouter()

not_authorized = HTTPException(
    status_code = status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

@router.post("/venue", response_model= VenueOut)
async def creare_venue(
    venue: VenueIn,
    repo: VenueQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):



@router.get("/venue", response_model=Venue)
def get_venue(repo: VenueQueries = Depends()):
    return Venue(venue=repo.get_all())

@router.post("/venue/{venue.id}/new", response_model=Venue)
async def create_venue(
    venue_id: str,
    repo: VenueQueries
    account_data: dict = Depends(authenticator.get_current_account_data),
):


