import { Charla } from '../clases/Charla.js';

export class CharlaDatos {
    constructor() {
        this.STORAGE_KEY = 'portal_charlas';
        this._inicializarDatosEjemplo();
    }

    _inicializarDatosEjemplo() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            const iniciales = [
                {
                    id: 1,
                    nombre: "Charla de Orientación General",
                    tema: "Rol de la Autoridad de Mesa",
                    fecha: "2026-10-15",
                    horario: "10:00",
                    sede: {
                        nombre: "Sede Campus UNGS",
                        direccion: "Juan María Gutiérrez 1150",
                        latitud: -34.5221,
                        longitud: -58.7001
                    }
                },
                {
                    id: 2,
                    nombre: "Capacitación Práctica",
                    tema: "Apertura y Cierre de Urnas",
                    fecha: "2026-10-20",
                    horario: "14:00",
                    sede: {
                        nombre: "Centro de Formación San Miguel",
                        direccion: "Av. Pte. Perón 1234",
                        latitud: -34.5422,
                        longitud: -58.7123
                    }
                }
            ];
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(iniciales));
        }
    }

    obtenerTodas() {
        const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        return data.map(item => new Charla(item));
    }

    guardar(charla) {
        const charlas = this.obtenerTodas();
        charlas.push(charla);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(charlas));
    }
}