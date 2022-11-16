

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS states;
DROP TABLE IF EXISTS categories;

CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    username VARCHAR (25) NOT NULL UNIQUE,
    avatar IMAGE,
    followings INTEGER DEFAULT 0
),

CREATE TABLE states (
    id INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE categories (
    id INTEGER NOT NULL UNIQUE
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE venues (
    id INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state_id INTEGER REFERENCES states("id") ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories("id") ON DELETE CASCADE,
    description TEXT NOT NULL,
    added_by INTEGER REFERENCES users("id") ON DELETE SET NULL,
    approved BOOLEAN NOT NULL
);

CREATE TABLE review(
    id INTEGER NOT NULL UNIQUE,
    venue_id INTEGER REFERENCES venues('id') ON DELETE CASCADE,
    review_description TEXT NOT NULL,
    rating INTEGER,
    pictures TEXT NOT NULL,
    added_by INTEGER REFERENCES users('id') ON DELETE CASCADE,
    loved list INTEGER REFERENCES users('id') ON DELETE CASCADE
)

CREATE TABLE request(
    id INTEGER NOT NULL UNIQUE,
    requester INTEGER REFERENCES users('id') ON DELETE CASCADE,
    txt TEXT NOT NULL,
)

CREATE TABLE comment(
    request_id INTEGER REFERENCES requests('id') ON DELETE CASCADE,
    commenter INTEGER REFERENCES users('id') ON DELETE CASCADE,
    txt TEXT NOT NULL,
)
