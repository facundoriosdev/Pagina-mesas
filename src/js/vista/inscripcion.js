import { PostulanteDatos } from '../datos/PostulanteDatos.js';
import { PostulacionServicio } from '../servicio/PostulacionServicio.js';

document.addEventListener('DOMContentLoaded', () => {
    const postulacionService = new PostulacionServicio(new PostulanteDatos());

    const form = document.querySelector('.inscripcion-form');
    const agrupacionSi = document.getElementById('agrupacion-si');
    const agrupacionNo = document.getElementById('agrupacion-no');
    const partidoGroup = document.getElementById('partido-group');
    const alerta = document.getElementById('mensaje-feedback');

    agrupacionSi.addEventListener('change', () => {
        partidoGroup.style.display = 'flex';
    });

    agrupacionNo.addEventListener('change', () => {
        partidoGroup.style.display = 'none';
        document.getElementById('partido').value = ''; 
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const datos = {
            distrito: document.getElementById('distrito').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            dni: document.getElementById('dni').value,
            email: document.getElementById('email').value,
            fueAutoridad: form.elements['fue_autoridad'].value,
            capacitacion: form.elements['capacitacion'].value,
            agrupacion: form.elements['agrupacion'].value,
            partido: document.getElementById('partido').value,
            interesCharlas: document.getElementById('interes_charlas').checked
        };

        try {
            postulacionService.registrar(datos);
            alerta.className = 'alerta-feedback alerta-exito';
            alerta.innerText = '¡Postulación enviada exitosamente! Quedará en estado Pendiente para revisión.';
            alerta.style.display = 'block';
            form.reset();
            partidoGroup.style.display = 'none';
            window.scrollTo(0, 0);

        } catch (error) {
            alerta.className = 'alerta-feedback alerta-error';
            alerta.innerText = error.message;
            alerta.style.display = 'block';
            window.scrollTo(0, 0);
        }
    });
});