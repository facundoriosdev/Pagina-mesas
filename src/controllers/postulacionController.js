const db = require('../data/db');

const obtenerCharlas = (req, res) => {
    try {
        const charlas = db.obtenerTodasLasCharlas();
        res.status(200).json(charlas);
    } catch (error) {
        res.status(500).json({ error: "Error interno al obtener las charlas." });
    }
};

const registrarPostulacion = (req, res) => {
    const datos = req.body;

    // Validación estricta de datos de entrada (Criterio: Manejo de errores)
    if (!datos.nombre || !datos.apellido || !datos.dni || !datos.distritoElectoral) {
        return res.status(400).json({ 
            error: "Faltan datos obligatorios. Nombre, apellido, DNI y distrito electoral son requeridos." 
        });
    }

    if (datos.dni.toString().length < 7 || datos.dni.toString().length > 8) {
        return res.status(400).json({ 
            error: "Formato de DNI inválido. Debe tener entre 7 y 8 dígitos numéricos." 
        });
    }

    try {
        // Delegamos la persistencia a la capa de datos
        const postulacionGuardada = db.guardarPostulacion(datos);

        res.status(201).json({
            mensaje: "Postulación registrada con éxito. Se encuentra Pendiente de evaluación.",
            datos: postulacionGuardada
        });
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al intentar guardar la postulación." });
    }
};

module.exports = {
    obtenerCharlas,
    registrarPostulacion
};