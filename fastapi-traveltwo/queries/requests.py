from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class RequestIn(BaseModel):
    requester: str
    txt: str


class RequestOut(BaseModel):
    id: int
    requester: str
    txt: str
    created_at: date

class CommentIn(BaseModel):
    request_id: int
    commenter: int
    txt: str

class CommentOut(BaseModel):
    id: int
    request_id: int
    commenter: int
    txt: str
    created_at: date

class RequestQueries:
    def get_all(self) -> Union[Error, List[RequestOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, requester, txt, created_at
                        FROM requests
                        ORDER BY created_at;
                        """
                    )

                    return [
                        RequestOut(
                            id=record[0],
                            requester=record[1],
                            txt=record[2],
                            created_at = record[3]
                        )
                        for record in cur
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all requests"}

    def get_one(self, requests_id: int) -> Optional[RequestOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id
                             , requester
                             , txt
                             , created_at
                        FROM requests
                        WHERE id = %s
                        """,
                        [requests_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_requests_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that Request"}

    def create(self, requests: RequestIn) -> Union[RequestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO requests
                            (requester, txt)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            requests.requester,
                            requests.txt
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.requests_in_to_out(id, requests)
        except Exception:
            return {"message": "Could not create new requests"}



    def update(self, requests_id: int, requests: RequestIn) -> Union[RequestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE requests
                        SET requester = %s
                          , txt = %s
                        WHERE id = %s
                        """,
                        [
                            requests.requester,
                            requests.txt,
                        ]
                    )
                    return self.requests_in_to_out(requests_id, requests)
        except Exception as e:
            print(e)
            return {"message": "Could not update that request"}

    def delete(self, requests_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM requests
                        WHERE id = %s
                        """,
                        [requests_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def requests_in_to_out(self, id: int, request: RequestIn):
            old_data = request.dict()
            return RequestOut(id=id, **old_data)

    def record_to_requests_out(self, record):
        return RequestOut(
            id=record[0],
            requester=record[1],
            txt=record[2],
            created_at=record[3],
        )


class CommentQueries:
    def get_all(self) -> Union[Error, List[CommentOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, requester_id, commenter, txt, created_at
                        FROM comments
                        ORDER BY created_at;
                        """
                    )

                    return [
                        CommentOut(
                            id=record[0],
                            requester_id=record[1],
                            commenter=record[2],
                            txt = record[3],
                            created_at = record[4]
                        )
                        for record in cur
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all comments"}

    def get_one(self, comments_id: int) -> Optional[CommentOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id
                             , requester_id
                             , commenter
                             , txt
                             , created_at
                        FROM requests
                        WHERE id = %s
                        """,
                        [comments_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_comments_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that Comment"}

    def create(self, comments: CommentIn) -> Union[CommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO requests
                            (requester_id, commenter, txt)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            comments.requester,
                            comments.commenter,
                            comments.txt
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.comments_in_to_out(id, comments)
        except Exception:
            return {"message": "Could not create new comment"}

    def update(self, comments_id: int, comments: CommentIn) -> Union[CommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE comments
                        SET txt = %s
                        , created_at = %s
                        WHERE id = %s
                        """,
                        [
                            comments.id,
                            comments.request_id,
                            comments.commenter,
                            comments.txt,
                            comments.created_at

                        ]
                    )
                    return self.comments_in_to_out(comments_id, comments)
        except Exception as e:
            print(e)
            return {"message": "Could not update that request"}

    def delete(self, comments_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM comments
                        WHERE id = %s
                        """,
                        [comments_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False



    def comments_in_to_out(self, id: int, comment: CommentIn):
            old_data = comment.dict()
            return CommentOut(id=id, **old_data)

    def record_to_comments_out(self, record):
        return CommentOut(
            id=record[0],
            requester_id=record[1],
            commenter=record[2],
            txt=record[3],
            created_at=record[4],
        )
