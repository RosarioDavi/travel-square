from .client import Queries
from bson.objectid import ObjectId
from models import Venue, Account, SessionOut


class ReviewQueries(Queries):
    DB_NAME = "travelsquared"
    COLLECTION = "reviews"

    def get(self, review: str):
        return self.collection.find_one({"review": review})

    def create(self, review: str, account: Account) -> Optional[Account]:
        result = self.collection.insert_one(
            {
                "review": review,
                "account_id": ObjectId(account.id),
            }
        )
        if result and result.inserted_id:
            return SessionOut(review=review, account_id=account.id)
        return None

    def delete(self, review: str):
        self.collection.delete_many({"review": review})
