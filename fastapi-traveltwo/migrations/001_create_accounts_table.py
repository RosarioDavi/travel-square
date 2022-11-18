CREATE TABLE users (
    id SERIAL PRIMARY PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    hashed_password VARCHAR(200) NOT NULL,
    full_name VARCHAR(250)
    avatar IMAGE,
);
