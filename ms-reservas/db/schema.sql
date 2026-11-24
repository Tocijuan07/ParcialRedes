-- db/schema.sql
SET NAMES utf8mb4; -- para que las tildes y ñ se guarden correctamente

DROP TABLE IF EXISTS reservas;

CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  huesped VARCHAR(100) NOT NULL,
  fecha_entrada DATE NOT NULL,
  fecha_salida DATE NOT NULL,
  personas INT NOT NULL,
  plan_id INT NOT NULL
) DEFAULT CHARSET = utf8mb4;

INSERT INTO reservas (codigo, huesped, fecha_entrada, fecha_salida, personas, plan_id) VALUES
('RES-001', 'Oscar Jimenez', '2026-12-20', '2026-12-27', 2, 1),
('RES-002', 'Ilana Urrea', '2027-01-05', '2027-01-08', 1, 2),
('RES-003', 'Juan Damigo', '2027-02-14', '2027-02-17', 4, 3);
