// =====================================================================
// CAPA DE SERVICIO (lógica de negocio)
// Aplica las reglas del negocio y las validaciones.
// No sabe nada de HTTP (req/res) ni de cómo se guardan los datos.
// =====================================================================
const repo = require('../repositories/reservas.repository');
const { validarReserva, construirReserva } = require('../models/reserva');
const HttpError = require('../utils/http-error');

async function listar(filtros) {
  return repo.findAll(filtros);
}

async function obtener(id) {
  const reserva = await repo.findById(id);
  if (!reserva) throw new HttpError(404, `No existe la reserva con id ${id}`);
  return reserva;
}

async function crear(datos) {
  const errores = validarReserva(datos);
  if (errores.length > 0) throw new HttpError(400, 'Datos inválidos', errores);

  const reserva = construirReserva(datos);

  if (await repo.findByCodigo(reserva.codigo)) {
    throw new HttpError(409, `Ya existe una reserva con el código ${reserva.codigo}`);
  }
  return repo.create(reserva);
}

async function actualizar(id, datos) {
  const existente = await repo.findById(id);
  if (!existente) throw new HttpError(404, `No existe la reserva con id ${id}`);

  const errores = validarReserva(datos);
  if (errores.length > 0) throw new HttpError(400, 'Datos inválidos', errores);
  const reserva = construirReserva(datos);

  const otra = await repo.findByCodigo(reserva.codigo);
  if (otra && otra.id !== id) {
    throw new HttpError(409, `Ya existe una reserva con el código ${reserva.codigo}`);
  }
  return repo.actualizar(id, reserva);
}

async function eliminar(id) {
  const eliminado = await repo.eliminar(id);
  if (!eliminado) throw new HttpError(404, `No existe la reserva con id ${id}`);
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
