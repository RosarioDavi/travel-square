from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class RequestIn(BaseModel):
    requester: int
    txt: str


class RequestOut(BaseModel):
    id: int
    requester: int
    txt: str
    created_at: date

class CommentIn(BaseModel):
    request_id: int
    commenter: int
    txt: str
    created_at: date

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
                        SELECT r.id,
                                a.username,
                                r.txt,
                                r.created_at
                        FROM requests r
                        INNER JOIN accounts a
                            ON (a.id = r.requester)
                        ORDER BY r.created_at;
                        """
                    )
                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results
        except Exception as e:
            print(e)
            return {"message": "Could not get all Requests"}

    def get_one(self, requests_id: int) -> Optional[RequestOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
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
                    record = None
                    row = cur.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return record
        except Exception as e:
            print(e)
            return {"message": "Could not get that Request"}

    def create(self, requests: RequestIn, created_at) -> Union[RequestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO requests
                            (requester, txt, created_at)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id, requester, txt, created_at;
                        """,
                        [
                            requests.requester,
                            requests.txt,
                            created_at
                        ]
                    )
                    record = None
                    row = cur.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return record

        except Exception as e:
            print(e)
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
                          , created_at = %s
                        WHERE id = %s
                        """,
                        [
                            requests.requester,
                            requests.txt,
                            requests.created_at,
                            requests_id,
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
                        SELECT c.id, r.id, a.username, c.txt, c.created_at
                        FROM comments c
                        INNER JOIN requests r
                            ON (r.id = c.id)
                        INNER JOIN accounts a
                            ON (c.id = a.id)
                        ORDER BY created_at;
                        """
                    )

                    return [
                        CommentOut(
                            id=record[0],
                            request_id=record[1],
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
                        SELECT c.id
                             , r.id
                             , a.username
                             , c.txt
                             , c.created_at
                        FROM comments c
                        INNER JOIN requests r
                            ON (r.id = c.id)
                        INNER JOIN accounts a
                            ON (c.id = a.id)
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
                        INSERT INTO comments
                            (request_id, commenter, txt, created_at)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            comments.request_id,
                            comments.commenter,
                            comments.txt,
                            comments.created_at
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.comments_in_to_out(id, comments)
        except Exception as e:
            print(e)
            return {"message": "Could not create new comment"}

    def update(self, comment_id: int, comment: CommentIn) -> Union[CommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE comments
                        SET request_id = %s
                        , commenter = %s
                        , txt = %s
                        , created_at = %s
                        WHERE id = %s
                        """,
                        [
                            comment.request_id,
                            comment.commenter,
                            comment.txt,
                            comment.created_at,
                            comment_id

                        ]
                    )
                    return self.comments_in_to_out(comment_id, comment)
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
            request_id=record[1],
            commenter=record[2],
            txt=record[3],
            created_at=record[4],
        )
