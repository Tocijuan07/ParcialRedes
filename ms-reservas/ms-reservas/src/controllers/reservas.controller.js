// =====================================================================
// CAPA DE PRESENTACIÓN (controlador)
// Traduce HTTP <-> servicio: lee la petición (params, body, query),
// llama al servicio y arma la respuesta (código de estado + JSON).
// =====================================================================
const service = require('../services/reservas.service');
const HttpError = require('../utils/http-error');

function leerId(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) throw new HttpError(400, 'El id debe ser un entero positivo');
  return id;
}

// GET /reservas?huesped=...&ids=1,2,3
async function listar(req, res) {
  const filtros = { huesped: req.query.huesped };
  if (req.query.ids) {
    filtros.ids = String(req.query.ids).split(',').map(Number);
    if (filtros.ids.some((id) => !Number.isInteger(id) || id <= 0)) {
      throw new HttpError(400, 'Los ids deben ser enteros positivos separados por coma');
    }
  }
  const reservas = await service.listar(filtros);
  res.status(200).json(reservas);
}

// GET /reservas/:id
async function obtener(req, res) {
  const reserva = await service.obtener(leerId(req));
  res.status(200).json(reserva);
}

// POST /reservas
async function crear(req, res) {
  const nueva = await service.crear(req.body);
  res.status(201).location(`${req.baseUrl}/${nueva.id}`).json(nueva);
}

// PUT /reservas/:id
async function actualizar(req, res) {
  const actualizada = await service.actualizar(leerId(req), req.body);
  res.status(200).json(actualizada);
}

// DELETE /reservas/:id
async function eliminar(req, res) {
  await service.eliminar(leerId(req));
  res.status(204).end();
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
