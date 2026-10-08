import { Sede } from './Sede.js';

export class Charla {
    constructor({ id, nombre, tema, fecha, horario, sede }) {
        this.id = id;
        this.nombre = nombre;
        this.tema = tema;
        this.fecha = fecha;
        this.horario = horario;
        this.sede = sede instanceof Sede ? sede : new Sede(sede);
    }
}