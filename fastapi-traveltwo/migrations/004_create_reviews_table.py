steps = [
    [
        # Create table
        """
        CREATE TABLE reviews (
            id SERIAL UNIQUE PRIMARY KEY,
            venue_id INTEGER REFERENCES venues('id') ON DELETE CASCADE,
            review_description TEXT NOT NULL,
            rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
            picture TEXT NOT NULL,
            added_by INTEGER REFERENCES accounts('id') ON DELETE CASCADE
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
        """,
        # Drop table
        """
        DROP TABLE reviews
        """
    ]
]
