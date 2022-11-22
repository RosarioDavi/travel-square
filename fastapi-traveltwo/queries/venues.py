import os
from pydantic import BaseModel
from typing import List, Optional, Union
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class Error(BaseModel):
    message:str


class CategoryIn(BaseModel):
    category_name: str


class CategoryOut(BaseModel):
    id: int
    category_name: str


class VenueIn(BaseModel):
    venue_name: str
    num_and_street: str
    city: str
    state: str
    zip: str
    category_id: int
    description_text: str
    added_by: int


class VenueOut(BaseModel):
    id: int
    venue_name: str
    num_and_street: str
    city: str
    state: str
    zip: str
    category_id: int
    description_text: str
    added_by: int
    approved: bool


class CategoryRepository:
    def create(self, category: CategoryIn) -> CategoryOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO categories (category_name)
                    VALUES (%s)
                    RETURNING id, category_name
                    """,
                    [category.category_name]
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    def get_all_categories(self) -> list[CategoryOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM categories
                    ORDER BY category_name
                    """
                )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)
                return results

class VenueRepository:
    def create(self, venue: VenueIn, approved: bool) -> VenueOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO venues
                        (venue_name, num_and_street, city, state, zip, category_id, description_text, added_by, approved)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, venue_name, num_and_street, city, state, zip, category_id, description_text, added_by, approved;
                    """,
                    [
                        venue.venue_name,
                        venue.num_and_street,
                        venue.city,
                        venue.state,
                        venue.zip,
                        venue.category_id,
                        venue.description_text,
                        venue.added_by,
                        approved
                    ]
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

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
                        SET venue_name = %s
                          , num_and_street = %s
                          , city = %s
                          , state = %s
                          , zip = %s
                          , category_id = %s
                          , description_text = %s
                          , added_by = %s
                        WHERE id = %s
                        """,
                        [
                            venue.venue_name,
                            venue.num_and_street,
                            venue.city,
                            venue.state,
                            venue.zip,
                            venue.category_id,
                            venue.description_text,
                            venue.added_by,
                        ]
                    )
                    return self.venue_in_to_out(venue_id, venue)
        except Exception as e:
            print(e)
            return {"message": "Could not update that venue"}

    def get_all_with_names(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT v.id,
                            v.venue_name,
                            v.num_and_street,
                            v.city,
                            v.state,
                            v.zip,
                            c.category_name,
                            v.description_text,
                            a.username AS added_by_user,
                            v.approved
                    FROM venues v
                    INNER JOIN categories c
                        ON (c.id = v.category_id)
                    INNER JOIN accounts a
                        ON (a.id = v.added_by)
                    ORDER BY venue_name
                    """
                )
                try:
                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results
                except Exception as e:
                    return {"message": "Could not get all Venues"}

    # def create(self, venue: VenueIn) -> Union[VenueOut, Error]:
    #         try:
    #             with pool.connection() as conn:
    #                 with conn.cursor() as db:
    #                     result = db.execute(
    #                         """
    #                         INSERT INTO Venues
    #                             (name, from_date, to_date, thoughts)
    #                         VALUES
    #                             (%s, %s, %s, %s)
    #                         RETURNING id;
    #                         """,
    #                         [
    #                             venue.name,
    #                             venue.from_date,
    #                             venue.to_date,
    #                             venue.thoughts
    #                         ]
    #                     )
    #                     id = result.fetchone()[0]
    #                     return self.Venue_in_to_out(id, venue)
    #         except Exception:
    #             return {"message": "Create did not work"}

    def venue_in_to_out(self, id: int, venue: VenueIn):
        old_data = venue.dict()
        return VenueOut(id=id, **old_data)

    # def record_to_venue_out(self, record):
    #     return VenueOut(
    #         id=record[0],
    #         name=record[1],
    #         from_date=record[2],
    #         to_date=record[3],
    #         thoughts=record[4],
    #     )
