DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS states;
DROP TABLE IF EXISTS categories;

CREATE TABLE states (
    id INTEGER NOT NULL UNIQUE,
    state_name VARCHAR(2) NOT NULL UNIQUE
);

CREATE TABLE categories (
    id INTEGER NOT NULL UNIQUE
    category_name VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE venues (
    id INTEGER NOT NULL UNIQUE,
    venue_name VARCHAR(100) NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state_id INTEGER REFERENCES states("id") ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories("id") ON DELETE CASCADE,
    description_text VARCHAR(2000) NOT NULL,
    added_by INTEGER REFERENCES users("id") ON DELETE SET NULL,
    approved BOOLEAN DEFAULT false
);
