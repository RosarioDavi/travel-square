import json
from fastapi.testclient import TestClient
from main import app
from queries.venues import VenueRepository


client = TestClient(app)

class VenuesQueriesMock:
    def get_all(self):
        return []
    
    def create_venues(self, venue):
        response = {
            
                'id': 1,
                'venue_name': 'underground pizza',
                'num_and_street': '123 street',
                'city': 'New York',
                'state': 'NY',
                'zip': "1234",
                'category_id': 1,
                'description_text': "Pizza",
                'added_by': 1,
                'approved': "false",
            
        }
        response.update(venue)
        return response

def test_list_venues():

   app.dependency_overrides[VenueRepository] = VenuesQueriesMock

   response = client.get('/api/venues/')

   assert response.status_code == 200
   assert response.json() == []

   app.dependency_overrides = {}

def test_create_venues():
    app.dependency_overrides[VenueRepository] = VenuesQueriesMock
    venue = {
        'venue_name': 'underground pizza',
        'num_and_street': '123 street',
        'city': 'New York',
        'state': 'NY',
        'zip': "1234",
        'category_id': "1",
        'description_text': "pizza",
    }

    response = client.post("/api/venues/", json.dumps(venue))

    assert response.status_code == 401
    # assert response.json()['venue_name'] == "underground pizza"
    # assert response.json()['id'] == 1