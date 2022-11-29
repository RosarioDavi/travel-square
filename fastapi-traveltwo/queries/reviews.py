from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List


class ReviewIn(BaseModel):
    venue_id: int
    review_description: str
    rating: int
    picture: str
    added_by: int


class ReviewOut(BaseModel):
    id: int
    venue_id: int
    review_description: str
    rating: int
    picture: str
    added_by: int
    created_at: date


class ReviewQueries:
    def get_all_reviews(self) -> List[ReviewOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, review_description, rating, picture, added_by, created_at
                        FROM reviews
                        ORDER BY created_at;
                        """
                    )

                    results = []
                    for row in cur.fetchone():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results
        except Exception as e:
            print(e)
            return {"message": "Could not get the review"}


    def get_all_reviews_for_venue(self, venue_id: int) -> List[ReviewOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT rev.id,
                                v.venue_id,
                                v.num_and_street,
                                v.city,
                                v.state,
                                v.zip,
                                rev.review_description,
                                rev.rating,
                                rev.picture,
                                a.id AS added_by,
                                rev.created_at
                        FROM reviews rev
                        INNER JOIN venues v
                            ON (v.id = rev.venue_id)
                        INNER JOIN accounts a
                            ON (a.id = rev.added_by)
                        WHERE v.venue_id = %s
                        ORDER BY rev.created_at;
                        """,
                        [venue_id]
                    )

                    results = []
                    for row in cur.fetchone():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results
        except Exception as e:
            print(e)
            return {"message": "Could not get all reviews"}

    def get_one_review_for_venue(self, venue_id: int) -> ReviewOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id, venue_id, review_description, rating, picture, added_by, created_at
                        FROM reviews
                        WHERE venue_id = %s
                        """,
                        [venue_id]
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
            return {"message": "Could not get the review"}

    def create_review(self, review: ReviewIn, created_at) -> ReviewOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO reviews
                            (venue_id, review_description, rating, picture, added_by, created_at)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id, venue_id, review_description, rating, picture, added_by, created_at;
                        """,
                        [
                            review.venue_id,
                            review.review_description,
                            review.rating,
                            review.picture,
                            review.added_by,
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
            return {"message": "Could not create a new review"}

    # def delete_review(self, id: int) -> bool:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as cur:
    #                 cur.execute(
    #                     """
    #                     DELETE FROM reviews
    #                     WHERE id = %s
    #                     """,
    #                     [id]
    #                 )
    #                 return True
    #     except Exception as e:
    #         print(e)
    #         return False
