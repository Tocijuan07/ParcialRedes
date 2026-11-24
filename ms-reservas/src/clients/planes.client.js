// =====================================================================
// CLIENTE HTTP de ms-planes, para el microservicio de reservas.
// COMPLÉTELO:
// la función pedir() ya está hecha; faltan las funciones que usan
// la validación, la regla de negocio y la composición.
// En el .env de ms-reservas:  PLANES_URL=http://127.0.0.1:3012
// =====================================================================
const HttpError = require('../utils/http-error');
const PLANES_URL = process.env.PLANES_URL;

// Hace una petición GET a ms-planes reenviando el token del usuario.
// Devuelve la respuesta de fetch, o null si ms-planes no respondió.
async function pedir(ruta, token) {
  try {
    return await fetch(`${PLANES_URL}${ruta}`, {
      headers: { Authorization: token },     // el token de la petición original
      signal: AbortSignal.timeout(3000),      // no esperar más de 3 segundos
    });
  } catch (error) {
    return null;                              // ms-planes caído o sin responder
  }
}

async function validarPlan(id, token) {
  const respuesta = await pedir(`/planes/${id}`, token);
  if (!respuesta) throw new HttpError('ms-planes no respondió', 503);
  if (respuesta.status === 404) {
    throw new HttpError('Plan no encontrado', 404), disponible=false;}
  if (!respuesta.ok) {
    throw new HttpError(502, `ms-planes respondió ${respuesta.status}`, disponible=true);
  }
  return disponible;
}

// COMPOSICIÓN: varios planes en UNA reservación → plan_id → plan (null si no responde)
// Solo se usan los campos acordados en el plan: { id, nombre_plan, incluye }
async function obtenerPlanes(ids, token) {
  if (ids.length === 0) return new Map();
  const respuesta = await pedir(`/planes?ids=${ids.join(',')}`, token);
  if (!respuesta || !respuesta.ok) return null;
  const planes = await respuesta.json();
  return new Map(planes.map((p) =>
    [p.id, { id: p.id, nombre_plan: p.nombre_plan, incluye: p.incluye }]));
}

// Ejemplo de uso:
//   const respuesta = await pedir('/planes/3', token);
//   if (!respuesta) ...                   → ms-planes no respondió
//   if (respuesta.status === 404) ...     → no existe
//   const datos = await respuesta.json(); → el objeto (o el arreglo, con ?ids=)

module.exports = { pedir, validarPlan, obtenerPlanes };
