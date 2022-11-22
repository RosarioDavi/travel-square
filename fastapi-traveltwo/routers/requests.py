from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.requests import (
    Error,
    RequestIn,
    RequestQueries,
    RequestOut,
    CommentIn,
    CommentOut,
    CommentQueries
)



router = APIRouter()



@router.post("/requests", response_model=Union[RequestOut, Error])
def create_requests(
    requests: RequestIn,
    # response: Response,
    repo: RequestQueries = Depends(),
):
    # response.status_code = 400
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
    repo: RequestQueries = Depends(),
) -> RequestOut:
    requests = repo.get_one(requests_id)
    # if requests is None:
    #     response.status_code = 404
    return requests


@router.post("/comments", response_model=Union[CommentOut, Error])
def create_comments(
    comments: CommentIn,
    repo: CommentQueries = Depends(),
):
    return repo.create(comments)


@router.get("/comments", response_model=Union[List[CommentOut], Error])
def get_all(
    repo: CommentQueries = Depends(),
):
    return repo.get_all()


@router.put("/comments/{comments_id}", response_model=Union[CommentOut, Error])
def update_comment(
    comments_id: int,
    comment: CommentIn,
    repo: CommentQueries = Depends(),
) -> Union[Error, CommentOut]:
    return repo.update(comments_id, comment)


@router.delete("/comments/{comments_id}", response_model=bool)
def delete_comment(
    comments_id: int,
    repo: CommentQueries = Depends(),
) -> bool:
    return repo.delete(comments_id)


@router.get("/comments/{comments_id}", response_model=Optional[CommentOut])
def get_one_comment(
    comments_id: int,
    response: Response,
    repo: CommentQueries = Depends(),
) -> CommentOut:
    comments = repo.get_one(comments_id)
    if comments is None:
        response.status_code = 404
    return comments
