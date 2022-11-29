from pydantic import BaseModel
from datetime import date
from queries.pool import pool


class ReviewIn(BaseModel):
    venue_id: int
    review_description: str
    rating: int
    picture: str
    added_by: int


class ReviewOut(BaseModel):
    id: int
    venue_id: int
    venue_name: str
    num_and_street: str
    city: str
    state: str
    zip: str
    description_text: str
    review_description: str
    rating: int
    picture: str
    created_at: date
    added_by: int
    username: str
    full_name: str
    email: str
    avatar: str
    is_admin: bool


class ReviewQueries:
    def get_all_reviews(self, state: str, city: str) -> list[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT rev.id,
                            v.id AS venue_id,
                            v.venue_name AS venue_name,
                            v.num_and_street AS num_and_street,
                            v.city AS city,
                            v.state AS state,
                            v.zip AS zip,
                            v.description_text AS description_text,
                            rev.review_description,
                            rev.rating,
                            rev.picture,
                            rev.created_at,
                            a.id AS added_by,
                            a.username AS username,
                            a.full_name AS full_name,
                            a.email AS email,
                            a.avatar AS avatar,
                            a.is_admin AS is_admin
                    FROM reviews rev
                    INNER JOIN venues v
                        ON (v.id = rev.venue_id)
                    INNER JOIN accounts a
                        ON (a.id = rev.added_by)
                    WHERE v.state = %s AND v.city = %s
                    ORDER BY rev.created_at;
                    """,
                    [state, city]
                )
                try:
                    results = []
                    for row in cur.fetchone():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results
                except Exception as e:
                    return {"message": "Could not get the review"}


    def get_all_reviews_for_venue(self, venue_id: int) -> list[ReviewOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT rev.id,
                                v.venue_id AS v.venue_name,
                                v.num_and_street,
                                v.city,
                                v.state,
                                v.zip,
                                rev.review_description,
                                rev.rating,
                                rev.picture,
                                rev.created_at
                                a.id AS added_by,
                                a.username,
                                a.full_name,
                                a.email,
                                a.avatar,
                                a.is_admin,
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

    def get_one_review_for_venue(self, venue_id: int, review_id: int) -> ReviewOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id, venue_id, review_description, rating, picture, added_by, created_at
                        FROM reviews
                        WHERE venue_id = %s AND review_id = %s
                        """,
                        [venue_id, review_id]
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
