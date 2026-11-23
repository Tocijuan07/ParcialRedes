-- db/schema.sql — base de datos de ms-planes
SET NAMES utf8mb4;

CREATE TABLE planes (
  id                   INT AUTO_INCREMENT PRIMARY KEY,
  nombre_plan          VARCHAR(80) NOT NULL,
  incluye              VARCHAR(150) NOT NULL,
  disponible           BOOLEAN NOT NULL
);

INSERT INTO planes (nombre_plan, incluye, disponible) VALUES
  ('Solo alojamiento', 'Habitación', TRUE),
  ('Desayuno incluido', 'Habitación y desayuno', TRUE),
  ('Todo incluido', 'Habitación, comidas y bebidas', TRUE),
  ('Luna de miel', 'Suite, cena y spa', FALSE);
