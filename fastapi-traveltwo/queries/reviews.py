from pydantic import BaseModel
from datetime import date
from typing import List, Optional
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
    review_description: str
    rating: int
    picture: str
    added_by: int
    created_at: date


class ReviewQueries:
    def get_all_reviews_for_venue(self) -> List[ReviewOut]:
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
            return {"message": "Could not get all reviews"}

    def get_one_review_for_venue(self, id: int) -> ReviewOut:
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

    def delete_review(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM reviews
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False




    # def record_to_reviews_out(self, review):
    #     return ReviewOut(
    #         id=record[0],
    #         review_description=record[1],
    #         rating=record[2],
    #         pictures=record[3],
    #         created_by=record[4],
    #         created_date=record[5]
    #     )

    # def reviews_in_to_out(self, id: int: ReviewIn):
    #     old_data = review.dict()
    #     return ReviewOut(id=id, **old_data)


# class ReviewRepository:
#     def get_all(self):
#         try:
#             # connect the database
#             with pool.connection() as conn:
#                 # get a cursor (something to run SQL with)
#                 with conn.cursor() as db:
#                     # run our SELECT statement
#                     result = db.execute(
#                         """
#                         SELECT id, name
#                         FROM reviews
#                         ORDER BY
#                         """
#                     )
#         except Exception:
#             return {"message": "Could not get all reviews"}



# class ReviewQueries(Queries):
#     DB_NAME = "travelsquared"
#     COLLECTION = "reviews"

#     def get(self, review: str):
#         return self.collection.find_one({"review": review})

    # def create(self, review: str, account: Account) -> Optional[Account]:
    #     result = self.collection.insert_one(
    #         {
    #             "review": review,
    #             "account_id": ObjectId(account.id),
    #         }
    #     )
    #     if result and result.inserted_id:
    #         return SessionOut(review=review, account_id=account.id)
    #     return None

    # def delete(self, review: str):
    #     self.collection.delete_many({"review": review})

    # def create(self, review: ReviewIn) -> ReviewOut:
    #     props = review.dict()
    #     self.collection.insert_one(props)
    #     props["id"] = str(props["_id"])
    #     return ReviewOut(loans=[], **props)

    # def get_all(self) -> List[ReviewOut]:
    #     result = self.collection.aggregate(
    #         [
    #             {
    #                 "$lookup": {
    #                     "from": "loans",
    #                     "localField": "_id",
    #                     "foreignField": "book_id",
    #                     "as": "loans",
    #                 }
    #             },
    #             {"$sort": {"title": 1}},
    #         ]
    #     )
    #     reviewPropsList = list(result)
    #     for reviewProps in reviewPropsList:
    #         reviewProps["id"] = str(reviewProps["_id"])
    #         reviewProps["loans"] = [
    #             str(props["account_id"]) for props in reviewProps["loans"]
    #         ]
    #     return [ReviewOut(**review) for review in reviewPropsList]
