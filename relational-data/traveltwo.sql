


CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    username VARCHAR (25) NOT NULL UNIQUE,
    avatar IMAGE,
    followings INTEGER DEFAULT 0
),
