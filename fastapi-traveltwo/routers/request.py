from fastapi import APIRouter, Depends, HTTPException, status
from models import RequestIn, Request, RequestOut
from queries.request import RequestQueries

@router.post("/requests", response_model=RequestOut)
async def create_request(
    request: RequestIn,
    repo: RequestQueries = Depends(),

);

@router.get("/requests", response_model=Request)
def get_books(repo: RequestQueries = Depends()):
    return RequestList(requests=repo.get_all())
