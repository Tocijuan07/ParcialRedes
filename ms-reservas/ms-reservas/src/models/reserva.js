// =====================================================================
// CAPA DE MODELO (entidad)
// Define qué campos tiene una Reserva y qué reglas deben cumplir.
// No sabe nada de HTTP ni de bases de datos.
// =====================================================================
function textoValido(v) {
  return typeof v === 'string' && v.trim() !== '';
}

// Formato AAAA-MM-DD y que la fecha exista de verdad (rechaza 2026-02-31)
function fechaValida(v) {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(`${v}T00:00:00Z`);
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}

// Devuelve una lista de errores de validación (vacía si todo está bien)
function validarReserva(datos) {
  if (!datos || typeof datos !== 'object') {
    return ['Se esperaba un objeto JSON con los datos de la reserva'];
  }
  const errores = [];
  if (!textoValido(datos.codigo)) errores.push('codigo es obligatorio');
  if (!textoValido(datos.huesped)) errores.push('huesped es obligatorio');

  const entradaOk = fechaValida(datos.fecha_entrada);
  const salidaOk = fechaValida(datos.fecha_salida);
  if (!entradaOk) errores.push('fecha_entrada es obligatoria con formato AAAA-MM-DD');
  if (!salidaOk) errores.push('fecha_salida es obligatoria con formato AAAA-MM-DD');
  // Comparar strings AAAA-MM-DD equivale a comparar fechas
  if (entradaOk && salidaOk && datos.fecha_salida <= datos.fecha_entrada) {
    errores.push('fecha_salida debe ser posterior a fecha_entrada');
  }

  if (!Number.isInteger(datos.personas) || datos.personas <= 0) {
    errores.push('personas debe ser un entero mayor que 0');
  }
  return errores;
}

// Construye una reserva "limpia" solo con los campos permitidos
function construirReserva(datos) {
  return {
    codigo: datos.codigo.trim(),
    huesped: datos.huesped.trim(),
    fecha_entrada: datos.fecha_entrada,
    fecha_salida: datos.fecha_salida,
    personas: datos.personas,
  };
}

module.exports = { validarReserva, construirReserva };
