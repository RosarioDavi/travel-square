from fastapi import APIRouter, Depends, HTTPException, status
from models import AccountOut, VenueIn, VenueList, VenueNew
from queries.venue import VenueQueries, VenueQueries



router = APIRouter()

not_authorized = HTTPException(
    status_code = status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

@router.post("/venue", response_model= VenueOut)
async def creare_venue(
    venue: VenueIN,
    repo: VenueQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):



@router.get("/venue", response_model=VenueList)
def get_venue(repo: VenueQueries = Depends()):
    return VenueList(venue=repo.get_all())

@router.post("/venue/{venue.id}/new", response_model=VenueNew)
async def create_venue(
    venue_id: str,
    repo: VenueQueries
    account_data: dict = Depends(authenticator.get_current_account_data),
):


