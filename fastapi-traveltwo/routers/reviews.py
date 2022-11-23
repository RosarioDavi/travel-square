
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from queries.reviews import ReviewQueries
from typing import List
from queries.reviews import ReviewIn, ReviewOut
from datetime import date


router = APIRouter()


class ReviewIn(BaseModel):
    venue_id: str
    review_description: str
    rating: str
    pictures: List[str]
    created_by: str


class ReviewOut(ReviewIn):
    id: int
    review_description: str
    rating: str
    pictures: List[str]
    added_by: str
    created_at: date


@router.post("/api/venues/{venue_id}/reviews", response_model=ReviewOut)
def create_review(
    reviews: ReviewIn,
    repo: ReviewQueries = Depends(),
):
    return repo.create_review(reviews)

@router.get("/api/venues/{venue_id}/reviews", response_model=List[ReviewOut])
def get_all_reviews_for_venue(
    repo: ReviewQueries = Depends(),
):
    return repo.get_all_reviews_for_venue()

@router.get("/api/venues/{venue_id}/{review_id}", response_model=ReviewOut)
def get_one_review_for_venue(
    repo: ReviewQueries = Depends(),
):
    return repo.get_one_review_for_venue()

@router.delete("/reviews/{review_id}", response_model=ReviewOut)
def delete_review(
    review_id: int,
    repo: ReviewQueries = Depends(),
) -> bool:
    return repo.delete_review(review_id)


# @router.post("/reviews", response_model=ReviewOut)
# async def create_review(
#     review: ReviewIn,
#     repo: ReviewQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     account = AccountOut(**account_data)
#     if "admin" not in account.roles:
#         raise not_authorized
#     review = repo.create(review)
#     await socket_manager.broadcast_refetch()
#     return review


# @router.get("/reviews", response_model=ReviewList)
# def get_reviews(repo: ReviewQueries = Depends()):
#     return ReviewList(reviews=repo.get_all())


# @router.post("/reviews/{review_id}/loans", response_model=LoanOut)
# async def create_loan(
#     review_id: str,
#     repo: LoanQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     account = AccountOut(**account_data)
#     if "general" not in account.roles:
#         raise not_authorized
#     await socket_manager.broadcast_refetch()
#     loan_request = LoanIn(review_id=review_id, account_id=account.id)
#     loan_request = repo.create(loan_request)
#     return loan_request


# @router.delete("/reviews/{review_id}/loans", response_model=bool)
# async def remove_load(
#     review_id: str,
#     repo: LoanQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     account = AccountOut(**account_data)
#     if "general" not in account.roles:
#         raise not_authorized
#     await socket_manager.broadcast_refetch()
#     repo.delete(review_id=review_id, account_id=account.id)
#     return True
