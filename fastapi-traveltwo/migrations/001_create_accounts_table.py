steps = [
    [
        # Create table
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(25) NOT NULL UNIQUE,
            full_name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            hashed_password VARCHAR(200) NOT NULL,
            avatar TEXT,
            is_admin BOOLEAN DEFAULT FALSE
        );
        """,
        # Drop table
        """
        DROP TABLE accounts
        """
    ]
]
