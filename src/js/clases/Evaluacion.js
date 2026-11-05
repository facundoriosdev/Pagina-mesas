export class Evaluacion {
    constructor(estado, descripcion) {
        this.estado = estado;
        this.descripcion = descripcion;
        this.fechaEvaluacion = new Date().toISOString();
    }
}