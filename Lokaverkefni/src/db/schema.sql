DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS venues CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Notendur
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Staðir
CREATE TABLE venues (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Flokkar
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Viðburðir
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  venue_id INTEGER NOT NULL REFERENCES venues(id) ON DELETE RESTRICT,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  tickets_available INTEGER NOT NULL CHECK (
    tickets_available >= 0 AND tickets_available <= capacity
  ),
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bókanir
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_price NUMERIC(10,2) NOT NULL CHECK (total_price >= 0),
  status TEXT NOT NULL CHECK (status IN ('CONFIRMED', 'CANCELLED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ
);
