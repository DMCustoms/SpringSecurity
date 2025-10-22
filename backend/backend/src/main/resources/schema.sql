CREATE TABLE IF NOT EXIST users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(64),
    email VARCHAR(64),
    password VARCHAR(256)
);