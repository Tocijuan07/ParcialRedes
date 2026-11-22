// =====================================================================
// Configuración de la aplicación Express.
// =====================================================================
const express = require('express');
const reservasRoutes = require('./routes/reservas.routes');

const app = express();

app.use(express.json());

// Registro de cada petición: hora, método, ruta y código de respuesta.
// Se imprime al terminar la respuesta ('finish') para poder incluir el código.
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.originalUrl} -> ${res.statusCode}`);
  });
  next();
});

app.get('/health', (req, res) => {
  res.json({ servicio: 'ms-reservas', estado: 'ok' });
});

app.use('/reservas', reservasRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// Manejo centralizado de errores
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' });
  }
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ error: err.message, detalles: err.detalles });
});

module.exports = app;
