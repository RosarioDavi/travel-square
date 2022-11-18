steps = [
    [
        # Create table
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(25) NOT NULL UNIQUE,
            hashed_password VARCHAR(200) NOT NULL,
            full_name VARCHAR(250)
            avatar TEXT
        );
        """,
        # Drop table
        """
        DROP TABLE accounts
        """
    ]
]
