// Simulamos la base de datos en memoria para evitar dependencias externas.

const charlas = [
    {
        id: 1,
        nombre: "Charla de Orientación General",
        tema: "Rol de la Autoridad de Mesa y Manejo de Urnas",
        fecha: "2026-10-15",
        horario: "10:00",
        sede: {
            nombre: "Sede Campus UNGS",
            direccion: "Juan María Gutiérrez 1150, Los Polvorines",
            latitud: -34.5221,
            longitud: -58.7001
        }
    },
    {
        id: 2,
        nombre: "Capacitación de Cierre de Escrutinio",
        tema: "Conteo de votos y confección de actas",
        fecha: "2026-10-20",
        horario: "14:00",
        sede: {
            nombre: "Centro de Formación José C. Paz",
            direccion: "Av. Pres. Hipólito Yrigoyen, José C. Paz",
            latitud: -34.5154,
            longitud: -58.7684
        }
    }
];

const postulaciones = [];

const obtenerTodasLasCharlas = () => {
    return charlas;
};

const guardarPostulacion = (datosPostulacion) => {
    const nuevaPostulacion = {
        id: postulaciones.length + 1,
        ...datosPostulacion,
        fechaRegistro: new Date().toISOString(),
        estado: "Pendiente"
    };
    postulaciones.push(nuevaPostulacion);
    return nuevaPostulacion;
};

module.exports = {
    obtenerTodasLasCharlas,
    guardarPostulacion
};