# ms-planes · Contrato de la API

Microservicio **proveedor** del examen del Módulo 3 (solo lectura). Puerto: **3012**.
Lo consulta el microservicio de reservas, que guarda el atributo `plan_id`.

## Cómo ejecutarlo

Requisitos: Node.js 22.9 o superior, MySQL 8 y ms-usuarios corriendo (para obtener tokens).

1. Como root en MySQL:

```sql
CREATE DATABASE planes_db;
CREATE USER 'planes_user'@'localhost' IDENTIFIED BY 'una-clave-segura';
GRANT ALL PRIVILEGES ON planes_db.* TO 'planes_user'@'localhost';
```

2. `mysql -u planes_user -p planes_db` y luego `SOURCE db/schema.sql;`
3. `npm install`
4. Copiar `.env.example` como `.env`. `JWT_SECRET` debe ser **la misma de ms-usuarios**.
5. `npm run dev`

## Representación

```json
{"id": 1, "nombre_plan": "Solo alojamiento", "incluye": "Habitación", "disponible": true}
```

## Atributos

| Atributo | Tipo |
|---|---|
| id | entero |
| nombre_plan | texto |
| incluye | texto |
| disponible | booleano |

## Endpoints

Todas las peticiones llevan `Authorization: Bearer <token>`. Cualquier rol autenticado puede consultar.

| Operación | Método | URI | Respuesta exitosa | Errores |
|---|---|---|---|---|
| Listar | GET | /planes | 200 arreglo | 401 |
| Consultar por lotes | GET | /planes?ids=1,3 | 200 arreglo (solo los que existen) | 400 · 401 |
| Obtener | GET | /planes/:id | 200 objeto | 400 · 401 · 404 |

## Datos iniciales

| id | nombre_plan | incluye | disponible |
|---|---|---|---|
| 1 | Solo alojamiento | Habitación | true |
| 2 | Desayuno incluido | Habitación y desayuno | true |
| 3 | Todo incluido | Habitación, comidas y bebidas | true |
| 4 | Luna de miel | Suite, cena y spa | false |

## Para el consumidor

La carpeta `para-el-consumidor/` trae `planes.client.js` con la función `pedir()` ya escrita (token y tiempo de espera). Se copia en `ms-reservas/src/clients/` y se completa.

## Frontend del examen

La carpeta `frontend/` trae `index.html`, ya configurado para ms-reservas y ms-planes. No se modifica: se copia al `DocumentRoot` del host virtual del examen en servidor2, y desde Windows se abre `http://examen.<dominio>/`. La página inicia sesión por `/api/usuarios/login` y muestra los listados de `/api/reservas` y `/api/planes` por el mismo nombre, así que no necesita CORS.

## Me consultan

| Me consulta | Peticiones que me hace |
|---|---|
| ms-reservas | `GET /planes/:id` (validar) · `GET /planes?ids=…` (componer) |
