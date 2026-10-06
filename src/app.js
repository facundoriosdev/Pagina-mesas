const express = require('express');
const cors = require('cors');
const rutasApi = require('./routes/api');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend externo
app.use(express.json()); // Parsea el body de las peticiones POST a JSON

// Conexión de Rutas
app.use('/api', rutasApi);

// Manejo de rutas inexistentes
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`✅ Backend del Portal de Autoridades corriendo en http://localhost:${PORT}`);
    console.log(`📍 Endpoint de Charlas (GET): http://localhost:${PORT}/api/charlas`);
    console.log(`📝 Endpoint de Postulaciones (POST): http://localhost:${PORT}/api/postulaciones`);
});