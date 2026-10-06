const express = require('express');
const router = express.Router();
const { obtenerCharlas, registrarPostulacion } = require('../controllers/postulacionController');

// GET /api/charlas -> Para que el mapa de Leaflet consuma las ubicaciones
router.get('/charlas', obtenerCharlas);

// POST /api/postulaciones -> Para recibir el formulario del ciudadano
router.post('/postulaciones', registrarPostulacion);

module.exports = router;