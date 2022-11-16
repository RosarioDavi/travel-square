

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS states;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS reviews_loved;
DROP TABLE IF EXISTS followings;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    username VARCHAR (25) NOT NULL UNIQUE,
    avatar IMAGE,
);

CREATE TABLE states (
    id SERIAL NOT NULL UNIQUE,
    state_name VARCHAR(2) NOT NULL UNIQUE
);

CREATE TABLE categories (
    id SERIAL NOT NULL UNIQUE,
    category_name VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE venues (
    id SERIAL NOT NULL UNIQUE,
    venue_name VARCHAR(100) NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state_id INTEGER REFERENCES states('id') ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories('id') ON DELETE CASCADE,
    description_text VARCHAR(2000) NOT NULL,
    added_by INTEGER REFERENCES users('id') ON DELETE SET NULL,
    approved BOOLEAN DEFAULT false
);

CREATE TABLE reviews (
    id SERIAL NOT NULL UNIQUE,
    venue_id INTEGER REFERENCES venues('id') ON DELETE CASCADE,
    review_description TEXT NOT NULL,
    rating INTEGER,
    pictures TEXT NOT NULL,
    added_by INTEGER REFERENCES users('id') ON DELETE CASCADE
);

CREATE TABLE reviews_loved (
    id SERIAL NOT NULL UNIQUE,
    review_id INTEGER REFERENCES reviews('id') ON DELETE CASCADE,
    loved_by INTEGER REFERENCES users('id') ON DELETE CASCADE
);

CREATE TABLE followings (
    id SERIAL NOT NULL UNIQUE,
    user_following INTEGER REFERENCES users('id') ON DELETE CASCADE,
    user_followed INTEGER REFERENCES users('id') ON DELETE CASCADE
);

CREATE TABLE requests (
    id SERIAL NOT NULL UNIQUE,
    requester INTEGER REFERENCES users('id') ON DELETE CASCADE,
    txt TEXT NOT NULL,
);

CREATE TABLE comments (
    id SERIAL NOT NULL UNIQUE,
    request_id INTEGER REFERENCES requests('id') ON DELETE CASCADE,
    commenter INTEGER REFERENCES users('id') ON DELETE CASCADE,
    txt TEXT NOT NULL,
);
