// =====================================================================
// CAPA DE ACCESO A DATOS (repositorio)
// Única capa que sabe DÓNDE se guardan los datos (MySQL).
// =====================================================================
const pool = require('../db');

async function findAll(filtros = {}) {
  let sql = 'SELECT * FROM reservas';
  const condiciones = [];
  const valores = [];
  if (filtros.huesped) { condiciones.push('huesped = ?'); valores.push(filtros.huesped); }
  if (filtros.ids) { condiciones.push('id IN (?)'); valores.push(filtros.ids); }
  if (condiciones.length > 0) sql += ' WHERE ' + condiciones.join(' AND ');
  const [filas] = await pool.query(sql + ' ORDER BY id', valores);
  return filas;
}

async function findById(id) {
  const [filas] = await pool.query('SELECT * FROM reservas WHERE id = ?', [id]);
  return filas.length > 0 ? filas[0] : null;
}

async function findByCodigo(codigo) {
  const [filas] = await pool.query('SELECT * FROM reservas WHERE codigo = ?', [codigo]);
  return filas.length > 0 ? filas[0] : null;
}

async function create(reserva) {
  const [resultado] = await pool.query(
    'INSERT INTO reservas (codigo, huesped, fecha_entrada, fecha_salida, personas, plan_id) VALUES (?, ?, ?, ?, ?, ?)',
    [reserva.codigo, reserva.huesped, reserva.fecha_entrada, reserva.fecha_salida, reserva.personas, reserva.plan_id]);
  return findById(resultado.insertId);
}

async function actualizar(id, reserva) {
  const [resultado] = await pool.query(
    'UPDATE reservas SET codigo = ?, huesped = ?, fecha_entrada = ?, fecha_salida = ?, personas = ?, plan_id = ? WHERE id = ?',
    [reserva.codigo, reserva.huesped, reserva.fecha_entrada, reserva.fecha_salida, reserva.personas, reserva.plan_id, id]);
  if (resultado.affectedRows === 0) return null;
  return findById(id);
}

async function eliminar(id) {
  const [resultado] = await pool.query('DELETE FROM reservas WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
}

module.exports = { findAll, findById, findByCodigo, create, actualizar, eliminar };
