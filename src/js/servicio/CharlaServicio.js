import { Charla } from '../clases/Charla.js';
import { Sede } from '../clases/Sede.js';

export class CharlaServicio {
    constructor(CharlaDatos) {
        this.repo = CharlaDatos;
    }

    listarCharlas() {
        return this.repo.obtenerTodas();
    }

    registrarCharla(datos) {
        if (!datos.nombre || !datos.tema || !datos.fecha || !datos.horario) {
            throw new Error("Todos los campos de la charla son obligatorios.");
        }

        if (!datos.sedeNombre || !datos.sedeDireccion) {
            throw new Error("Debe ingresar nombre y dirección de la sede.");
        }

        const lat = parseFloat(datos.sedeLat);
        const lng = parseFloat(datos.sedeLng);

        if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            throw new Error("Las coordenadas geográficas ingresadas no son válidas.");
        }

       const nuevaCharla = new Charla({
            id: Date.now(),
            nombre: datos.nombre.trim(),
            tema: datos.tema.trim(),
            fecha: datos.fecha,
            horario: datos.horario,
            sede: new Sede({
                nombre: datos.sedeNombre.trim(), 
                direccion: datos.sedeDireccion.trim(), 
                latitud: lat, 
                longitud: lng 
            })
        });

        this.repo.guardar(nuevaCharla);
        return nuevaCharla;
    }
}