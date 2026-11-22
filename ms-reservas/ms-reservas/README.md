# ms-reservas

Microservicio de reservas. Evaluación Módulo 3 - Redes y Servicios Multimedia (UAO).

Arquitectura: routes → controller → service → repository (+ modelo y HttpError). MySQL (`reservas_db`).
Puerto **3011** en 127.0.0.1.

## Puesta en marcha

1. `cp .env.example .env` y ajustar valores (el `JWT_SECRET` debe ser el mismo de ms-usuarios).
2. Crear base y usuario en MySQL y cargar `mysql -u root -p reservas_db < db/schema.sql`.
3. `npm install` y luego `npm start`.

## Recurso

| Campo | Tipo | Regla |
|---|---|---|
| id | entero | autogenerado |
| codigo | texto | obligatorio, **único** (409 si ya existe) |
| huesped | texto | obligatorio |
| fecha_entrada | fecha AAAA-MM-DD | obligatoria, fecha real |
| fecha_salida | fecha AAAA-MM-DD | obligatoria, **posterior** a fecha_entrada (400) |
| personas | entero | mayor que 0 |

## Seguridad

Todas las rutas exigen `Authorization: Bearer <token>` (JWT de ms-usuarios).
GET: cualquier rol. POST, PUT y DELETE: solo `administrador`.

## Contrato

| Método y ruta | Descripción | Éxito | Errores |
|---|---|---|---|
| GET /reservas | Lista. Filtros: `?huesped=` y `?ids=1,2,3` | 200 | 400 (ids inválidos), 401 |
| GET /reservas/:id | Una reserva | 200 | 400 (id inválido), 401, 404 |
| POST /reservas | Crea | 201 + Location | 400 (datos inválidos), 401, 403, 409 (código repetido) |
| PUT /reservas/:id | Reemplaza | 200 | 400, 401, 403, 404, 409 |
| DELETE /reservas/:id | Elimina | 204 | 400, 401, 403, 404 |
| GET /health | Estado del servicio | 200 | |

Ejemplo de cuerpo para POST/PUT:

```json
{
  "codigo": "RES-004",
  "huesped": "Ana Torres",
  "fecha_entrada": "2027-03-01",
  "fecha_salida": "2027-03-05",
  "personas": 2
}
```

Las respuestas de error tienen la forma `{ "error": "mensaje", "detalles": [ ... ] }`.

## Pruebas

Colección de Postman en `docs/ms-reservas.postman_collection.json` (login + un caso por cada código).
