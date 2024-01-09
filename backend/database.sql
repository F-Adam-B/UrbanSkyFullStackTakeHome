CREATE DATABASE us_inventory_db;

CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    serial VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
