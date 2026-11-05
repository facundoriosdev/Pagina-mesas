import { Postulante } from '../clases/Postulante.js';

export class PostulanteDatos {
    constructor() {
        this.STORAGE_KEY = 'portal_postulaciones';
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
        }
    }

    obtenerTodas() {
        const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        return data.map(item => new Postulante(item));
    }

    guardar(postulacion) {
        const postulaciones = this.obtenerTodas();
        postulaciones.push(postulacion);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(postulaciones));
    }

    actualizarEstado(id, evaluacion) {
        const lista = this.obtenerTodas();
        const post = lista.find(p => p.id === id);
        if (post) {
            post.evaluacion = evaluacion;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
            return post;
        }
        throw new Error('Solicitud no encontrada.');
    }
}