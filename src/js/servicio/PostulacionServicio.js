import { Postulante } from '../clases/Postulante.js';

export class PostulacionServicio {
    constructor(postulacionDatos) {
        this.repo = postulacionDatos;
    }

    listarPostulaciones() {
        return this.repo.obtenerTodas();
    }

    registrar(datos) {
        if (!datos.distrito || !datos.nombre || !datos.apellido || !datos.dni || !datos.email) {
            throw new Error('Complete todos los campos obligatorios.');
        }

        const dniLimpio = datos.dni.toString().trim();
        if (dniLimpio.length < 7 || dniLimpio.length > 8 || isNaN(dniLimpio)) {
            throw new Error('El DNI debe contener 7 u 8 dígitos numéricos.');
        }

        const existentes = this.repo.obtenerTodas();
        if (existentes && existentes.some(p => p.dni === dniLimpio)) {
            throw new Error(`El DNI ${dniLimpio} ya tiene una postulación registrada.`);
        }

        const nueva = new Postulante({
            id: Date.now(),
            distrito: datos.distrito,
            nombre: datos.nombre.trim(),
            apellido: datos.apellido.trim(),
            dni: dniLimpio,
            email: datos.email.trim(),
            fueAutoridad: datos.fueAutoridad,
            capacitacion: datos.capacitacion,
            agrupacion: datos.agrupacion,
            partido: datos.partido,
            interesCharlas: datos.interesCharlas
        });

        this.repo.guardar(nueva);
        return nueva;
    }

    cambiarEstado(id, estado) {
        if (!['Aprobada', 'Rechazada'].includes(estado)) {
            throw new Error('Estado inválido.');
        }
        return this.repo.actualizarEstado(id, estado);
    }
}