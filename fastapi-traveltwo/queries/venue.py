from pydantic import BaseModel
from typing import List, Optional, Union
from psycopg_pool import ConnectionPool
import os

pool = ConectionPool(conninfo=os.environ["DATABASE_URL"])

class Error(BaseModel):
    message:str

class VenueIn(BaseModel):
    name: str
    street: str
    city: str
    state_id: int
    description: str
    added_by: int
    approved: bool 

class VenueOut(BaseModel):
    id: int
    name: str
    street: str
    city: str
    state_id: int
    description: str
    added_by: int
    approved: bool



class VenueRepository:
    def create(self, venue: VenueIn):
        with pool.conection() as conn:
            with conn.cursor() as db:
                result= db.execute(
                    [
                        venue.name,
                        venue.street,
                        venue.city,
                        venue.state_id,
                        venue.description,
                        venue.added_by,
                        venue.approved                 
                    ]
                )
            id = result.fetchone()[0]
            old_data = venue.dict()
            return VenueOut(id=id, **old_data)
            

    def delete(self, venue_id: int) -> bool:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM venues
                            WHERE id = %s
                            """,
                            [venue_id]
                        )
                        return True
            except Exception as e:
                print(e)
                return False

    def update(self, venue_id: int, venue: VenueIn) -> Union[VenueOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE venues
                        SET name = %s
                          , from_date = %s
                          , to_date = %s
                          , thoughts = %s
                        WHERE id = %s
                        """,
                        [
                            venue.name,
                            venue.from_date,
                            venue.to_date,
                            venue.thoughts,
                            venue_id
                        ]
                    )
                    return self.venue_in_to_out(venue_id, venue)
        except Exception as e:
            print(e)
            return {"message": "Could not update that venue"}

    def get_all(self) -> Union[Error, List[VenueOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, from_date, to_date, thoughts
                        FROM Venues
                        ORDER BY from_date;
                        """
                    )                  
                    return [
                        self.record_to_Venue_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all Venues"}

    def create(self, venue: VenueIn) -> Union[VenueOut, Error]:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        result = db.execute(
                            """
                            INSERT INTO Venues
                                (name, from_date, to_date, thoughts)
                            VALUES
                                (%s, %s, %s, %s)
                            RETURNING id;
                            """,
                            [
                                venue.name,
                                venue.from_date,
                                venue.to_date,
                                venue.thoughts
                            ]
                        )
                        id = result.fetchone()[0]
                        return self.Venue_in_to_out(id, venue)
            except Exception:
                return {"message": "Create did not work"}

    def venue_in_to_out(self, id: int, venue: VenueIn):
        old_data = venue.dict()
        return VenueOut(id=id, **old_data)
    
    def record_to_venue_out(self, record):
        return VenueOut(
            id=record[0],
            name=record[1],
            from_date=record[2],
            to_date=record[3],
            thoughts=record[4],
        )


