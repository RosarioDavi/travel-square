from fastAPI import APIRouter, Depends, Response
from typing import Union, List
from queries.comments import CommentOut, CommentIn, CommentQueries

@router.get("/comments", response_model=List[CommentOut])
def get_all(
    repo: CommentQueries = Depends(),
);
    return repo.get_all()
