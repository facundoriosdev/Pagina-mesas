export class Postulante {
    constructor({
        id = Date.now(),
        distrito,
        nombre,
        apellido,
        dni,
        email,
        fueAutoridad,
        capacitacion,
        agrupacion,
        partido = '',
        interesCharlas = false,
        estado = 'Pendiente',
        fechaRegistro = new Date().toISOString()
    }) {
        this.id = id;
        this.distrito = distrito;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.fueAutoridad = fueAutoridad === true || fueAutoridad === 'si';
        this.capacitacion = capacitacion === true || capacitacion === 'si';
        this.agrupacion = agrupacion === true || agrupacion === 'si';
        this.partido = partido;
        this.interesCharlas = Boolean(interesCharlas);
        this.estado = estado;
        this.fechaRegistro = fechaRegistro;
    }
}