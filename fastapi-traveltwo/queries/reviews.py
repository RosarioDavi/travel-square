from .client import Queries
from typing import List
from bson.objectid import ObjectId
from models import Venue, Account


class ReviewQueries(Queries):
    DB_NAME = "travelsquared"
    COLLECTION = "reviews"

    def get(self, review: str):
        return self.collection.find_one({"review": review})

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

    def create(self, review: ReviewIn) -> ReviewOut:
        props = review.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return ReviewOut(loans=[], **props)

    def get_all(self) -> List[ReviewOut]:
        result = self.collection.aggregate(
            [
                {
                    "$lookup": {
                        "from": "loans",
                        "localField": "_id",
                        "foreignField": "book_id",
                        "as": "loans",
                    }
                },
                {"$sort": {"title": 1}},
            ]
        )
        reviewPropsList = list(result)
        for reviewProps in reviewPropsList:
            reviewProps["id"] = str(reviewProps["_id"])
            reviewProps["loans"] = [
                str(props["account_id"]) for props in reviewProps["loans"]
            ]
        return [ReviewOut(**review) for review in reviewPropsList]
