from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.requests import (
    Error,
    RequestIn,
    RequestQueries,
    RequestOut,
)



router = APIRouter()



@router.post("/requests", response_model=Union[RequestOut, Error])
def create_requests(
    requests: RequestIn,
    response: Response,
    repo: RequestQueries = Depends(),
):
    response.status_code = 400
    return repo.create(requests)


@router.get("/requests", response_model=Union[List[RequestOut], Error])
def get_all(
    repo: RequestQueries = Depends(),
):
    return repo.get_all()


@router.put("/requests/{requests_id}", response_model=Union[RequestOut, Error])
def update_request(
    requests_id: int,
    vacation: RequestIn,
    repo: RequestQueries = Depends(),
) -> Union[Error, RequestOut]:
    return repo.update(requests_id, vacation)


@router.delete("/requests/{requests_id}", response_model=bool)
def delete_request(
    requests_id: int,
    repo: RequestQueries = Depends(),
) -> bool:
    return repo.delete(requests_id)


@router.get("/requests/{requests_id}", response_model=Optional[RequestOut])
def get_one_request(
    requests_id: int,
    response: Response,
    repo: RequestQueries = Depends(),
) -> RequestOut:
    requests = repo.get_one(requests_id)
    if requests is None:
        response.status_code = 404
    return requests
