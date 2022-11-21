
from fastapi import APIRouter
from models import AccountOut, ReviewIn, ReviewList, ReviewOut, LoanIn, LoanOut
from queries.reviews import ReviewQueries


router = APIRouter()


@router.post("/reviews")
def create_review(review: ReviewIn):
    print('review', review.name)
    return review


# not_authorized = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Invalid authentication credentials",
#     headers={"WWW-Authenticate": "Bearer"},
# )


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
