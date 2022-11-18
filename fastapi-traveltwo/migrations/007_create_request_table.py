steps = [
    [
        # Create table
        """
        CREATE TABLE requests (
            id SERIAL UNIQUE PRIMARY KEY,
            requester INTEGER REFERENCES accounts('id') ON DELETE CASCADE,
            txt TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
        """,
        # Drop table
        """
        DROP TABLE requests
        """
    ]
]
