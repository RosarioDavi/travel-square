steps = [
    [
        # Create table
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(25) NOT NULL UNIQUE,
            full_name VARCHAR(50) NOT NULL,
            hashed_password VARCHAR(200) NOT NULL,
            avatar TEXT
        );
        """,
        # Drop table
        """
        DROP TABLE accounts
        """
    ]
]
