// CAPA DE ACCESO A DATOS: planes en MySQL
const pool = require('../db');

// MySQL guarda BOOLEAN como 0/1: aquí se traduce al formato del contrato
const aObjeto = (fila) => ({ ...fila, disponible: Boolean(fila.disponible) });

async function findAll(ids) {
  const [filas] = ids
    ? await pool.query('SELECT * FROM planes WHERE id IN (?) ORDER BY id', [ids])
    : await pool.query('SELECT * FROM planes ORDER BY id');
  return filas.map(aObjeto);
}

async function findById(id) {
  const [filas] = await pool.query('SELECT * FROM planes WHERE id = ?', [id]);
  return filas.length ? aObjeto(filas[0]) : null;
}

module.exports = { findAll, findById };
