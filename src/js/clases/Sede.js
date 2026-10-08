export class Sede {
    constructor({ nombre, direccion, latitud, longitud }) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.latitud = parseFloat(latitud);
        this.longitud = parseFloat(longitud);
    }
}