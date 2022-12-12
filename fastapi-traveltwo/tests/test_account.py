import json
from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries
from authenticator import authenticator

client = TestClient(app)

def getaccountdatamock():
    return {'id':1, 'username':'muhammad'}

class AccountQueriesMock:
    def get_all_accounts(self):
        return []

def test_list_request():

   app.dependency_overrides[AccountQueries] = AccountQueriesMock

   response = client.get('/api/accounts/')

   assert response.status_code == 200
   assert response.json() == []

   app.dependency_overrides = {}
