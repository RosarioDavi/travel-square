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



@router.post("/api/requests", response_model=Union[RequestOut, Error])
def create_requests(
    requests: RequestIn,
    repo: RequestQueries = Depends(),
):
    return repo.create(requests)


@router.get("/requests", response_model=Union[List[RequestOut], Error])
def get_all(
    repo: RequestQueries = Depends(),
):
    return repo.get_all()


@router.put("/api/requests/{request_id}", response_model=Union[RequestOut, Error])
def update_request(
    request_id: int,
    vacation: RequestIn,
    repo: RequestQueries = Depends(),
) -> Union[Error, RequestOut]:
    return repo.update(request_id, vacation)


@router.delete("/api/requests/{request_id}", response_model=bool)
def delete_request(
    request_id: int,
    repo: RequestQueries = Depends(),
) -> bool:
    return repo.delete(request_id)


@router.get("/api/requests/{request_id}", response_model=Optional[RequestOut])
def get_one_request(
    request_id: int,
    repo: RequestQueries = Depends(),
) -> RequestOut:
    requests = repo.get_one(request_id)
    return requests


@router.post("/api/comments", response_model=Union[CommentOut, Error])
def create_comments(
    comments: CommentIn,
    repo: CommentQueries = Depends(),
):
    return repo.create(comments)


@router.get("/api/requests/{request_id}/comments", response_model=Union[List[CommentOut], Error])
def get_all(
    repo: CommentQueries = Depends(),
):
    return repo.get_all()


@router.put("/api/comments/{comment_id}", response_model=Union[CommentOut, Error])
def update_comment(
    comment_id: int,
    comment: CommentIn,
    repo: CommentQueries = Depends(),
) -> Union[Error, CommentOut]:
    return repo.update(comment_id, comment)


@router.delete("/api/comments/{comment_id}", response_model=bool)
def delete_comment(
    comment_id: int,
    repo: CommentQueries = Depends(),
) -> bool:
    return repo.delete(comment_id)


@router.get("/api/comments/{comment_id}", response_model=Optional[CommentOut])
def get_one_comment(
    comment_id: int,
    response: Response,
    repo: CommentQueries = Depends(),
) -> CommentOut:
    comments = repo.get_one(comment_id)
    if comments is None:
        response.status_code = 404
    return comments