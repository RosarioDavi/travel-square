from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List
import datetime


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class SessionOut(BaseModel):
    jti: str
    account_id: str


class AccountIn(BaseModel):
    username: str
    email: str
    password: str
    full_name: str
    avatar: str


class Account(AccountIn):
    id: PydanticObjectId
    roles: List[str]
    followings: List[str]


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str
    roles: List[str]
    followings: List[str]


class StateIn(BaseModel):
    state_name: str


class State(StateIn):
    id: PydanticObjectId


class StateOut(StateIn):
    id: str
    venues: List[str]


class CategoryIn(BaseModel):
    category_name: str


class Category(CategoryIn):
    id: PydanticObjectId


class CategoryOut(CategoryIn):
    id: str
    venues: List[str]


class VenueIn(BaseModel):
    venue_name: str
    street: str
    city: str
    state_id: str
    category_id: str
    description: str
    added_by: str


class Venue(VenueIn):
    id: PydanticObjectId


class VenueOut(VenueIn):
    id: str
    approved: str
    reviews: List[str]


class ReviewIn(BaseModel):
    venue_id: str
    text: str
    rating: str
    pictures: List[str]
    added_by: str


class Review(ReviewIn):
    id: PydanticObjectId
    created_at: datetime.datetime.utcnow()


class ReviewOut(ReviewIn):
    id: str
    created_at: str


class RequestIn(BaseModel):
    requester_id: str
    text: str


class Request(RequestIn):
    id: PydanticObjectId
    created_at: datetime.datetime.utcnow()


class RequestOut(RequestIn):
    id: str
    created_at: str


class CommentIn(BaseModel):
    request_id: str
    commenter_id: str
    text: str


class Comment(CommentIn):
    id: PydanticObjectId
    created_at: datetime.datetime.utcnow()


class CommentOut(RequestIn):
    id: str
    created_at: str
