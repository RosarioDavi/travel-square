from models import CommentIn, Comment, CommentOut
from .client import Queries
from bson.objectid import ObjectId
from typing import List

class CommentQueries(Queries):
    DB_NAME = "comments"
    COLLECTION = "comments"

    def create(self, comment: CommentIn) -> CommentOut:
        props = comment.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return CommentOut(comments=[], **props)

    def get_all(self) -> List[CommentOut]:
        result = self.collection.aggregate(
            [
                {
                    "$lookup": {
                        "from": "venue",
                        "localField": "_id",
                        "foreignField": "c_id",
                        "as": "",
                    }
                },
                {"$sort": {"created_at": 1}},
            ]
        )
        commentPropsList = list(result)
        for commentProps in commentPropsList:
            commentProps["id"] = str(commentProps["_id"])
            commentProps["venue"] = [
                str(props["venue_id"]) for props in commentProps["venue"]
            ]
        return [CommentOut(**book) for book in commentPropsList]
