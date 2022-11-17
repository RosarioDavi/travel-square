from bson.objectid import ObjectId
from typing import List
from .client import Queries


class VenueQueries(Queries):
    def create(self, book: VenueIn) -> VenueOut:
        props = venue.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return VenueOut(loans=[], **props)

    def get_all(self) -> List[VenueOut]:
        result = self.aggregate(
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
        venuePropsList = list(result)
        for venueProps in venuePropsList:
            venueProps['id'] = str(venueProps['_id'])
        return [VenueOut(**venue) for venue in venuePropsList]
