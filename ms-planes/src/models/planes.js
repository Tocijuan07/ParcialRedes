function textoValido(v) {
  return typeof v === 'string' && v.trim() !== '';
}

// Devuelve una lista de errores de validación (vacía si todo está bien)
function validarPlan(datos) {
  if (!datos || typeof datos !== 'object') {
    return ['Se esperaba un objeto JSON con los datos del plan'];
  }
  const errores = [];
  if (!textoValido(datos.nombre_plan)) errores.push('nombre_plan es obligatorio');

  if (!textoValido(datos.incluye)) errores.push('incluye es obligatorio');

  if (!Number.isInteger(datos.id) || datos.id <= 0) {
    errores.push('id debe ser un entero mayor que 0');
  }

  if (!Boolean(datos.disponible) && datos.activo !== false) {
    errores.push('disponible debe ser true o false');
  }
  return errores;
}

// Construye un plan "limpio" solo con los campos permitidos
function construirPlan(datos) {
  return {
    id: datos.id,
    nombre_plan: datos.nombre_plan,
    incluye: datos.incluye,
    disponible: Boolean(datos.disponible),
  };
}

module.exports = { validarPlan, construirPlan };
