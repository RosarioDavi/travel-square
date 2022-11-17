from models import RequestIn, Request, RequestOut
from typing import List

class RequestQueries(Queries):
    DB_NAME = "travelsquared"
    COLLECTION = "requests"

    def create(self, request: RequestIn) -> RequestOut:
        props =

    def get_all(self) -> List[RequestOut]:
        result = self.
