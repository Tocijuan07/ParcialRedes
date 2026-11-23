// CAPA DE PRESENTACIÓN: rutas de planes (solo lectura, cualquier rol autenticado)
const { Router } = require('express');
const controller = require('../controllers/planes.controller');
const { verificarToken } = require('../middlewares/auth');

const router = Router();

router.use(verificarToken);                // todas las rutas exigen token

router.get('/', controller.listar);       // GET /planes  y  GET /planes?ids=1,3
router.get('/:id', controller.obtener);   // GET /planes/:id

module.exports = router;
