from fastapi import APIRouter, Depends, Response, Request
from queries.reviews import ReviewQueries, ReviewIn, ReviewOut
from authenticator import authenticator
from datetime import date


router = APIRouter()


@router.get("/api/reviews/{state}/{city}", response_model=list[ReviewOut])
def get_all_reviews(
    state: str,
    city: str,
    repo: ReviewQueries = Depends(),
):
    return repo.get_all_reviews(state, city)


@router.post("/api/reviews/", response_model=ReviewOut)
def create_review(
    review: ReviewIn,
    request: Request,
    repo: ReviewQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    created_at = date.today()
    return repo.create_review(review, created_at)

@router.get("/api/venues/{venue_id}/reviews/", response_model=list[ReviewOut])
def get_all_reviews_for_venue(
    venue_id: int,
    repo: ReviewQueries = Depends(),
):
    return repo.get_all_reviews_for_venue(venue_id)

@router.get("/api/venues/{venue_id}/{review_id}/", response_model=ReviewOut)
def get_one_review_for_venue(
    venue_id: int,
    review_id: int,
    repo: ReviewQueries = Depends(),
):
    return repo.get_one_review_for_venue(venue_id, review_id)

# @router.delete("/api/venues/{venue_id}/{review_id}", response_model=ReviewOut)
# def delete_review(
#     review_id: int,
#     repo: ReviewQueries = Depends(),
# ) -> bool:
#     return repo.delete_review(review_id)
