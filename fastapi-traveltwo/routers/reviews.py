from fastapi import APIRouter, Depends
from pydantic import BaseModel
from queries.reviews import ReviewQueries
from typing import List
from queries.reviews import ReviewIn, ReviewOut
from datetime import date


router = APIRouter()


@router.post("/api/reviews/", response_model=ReviewOut)
def create_review(
    review: ReviewIn,
    repo: ReviewQueries = Depends(),
):
    created_at = date.today()
    return repo.create_review(review, created_at)

@router.get("/api/venues/{venue_id}/reviews/", response_model=List[ReviewOut])
def get_all_reviews_for_venue(
    repo: ReviewQueries = Depends(),
):
    return repo.get_all_reviews_for_venue()

@router.get("/api/venues/{venue_id}/{review_id}/", response_model=ReviewOut)
def get_one_review_for_venue(
    repo: ReviewQueries = Depends(),
):
    return repo.get_one_review_for_venue()

# @router.delete("/api/venues/{venue_id}/{review_id}", response_model=ReviewOut)
# def delete_review(
#     review_id: int,
#     repo: ReviewQueries = Depends(),
# ) -> bool:
#     return repo.delete_review(review_id)
