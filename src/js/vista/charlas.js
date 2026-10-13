import { CharlaDatos } from '../datos/CharlaDatos.js';
import { CharlaServicio } from '../servicio/CharlaServicio.js';
import { MapaVista } from './MapaVista.js';

document.addEventListener('DOMContentLoaded', () => {

    const charlaServicio = new CharlaServicio(new CharlaDatos());
    const mapaVista = new MapaVista('map');
    const contenedorLista = document.querySelector('.charlas-list');
    
    function cargarCharlas() {
        const charlas = charlaServicio.listarCharlas();
        
        contenedorLista.innerHTML = '';
        mapaVista.limpiarMarcadores();

        if (charlas.length === 0) {
            contenedorLista.innerHTML = '<p style="padding: 20px; color: #666;">No hay charlas programadas actualmente.</p>';
            return;
        }

        charlas.forEach(charla => {
    if (!charla || !charla.sede) return;

    const { latitud, longitud, nombre: nombreSede, direccion } = charla.sede;

    const popupHTML = `
        <div style="font-size: 13px;">
            <b style="font-size: 14px;">${charla.nombre}</b><br>
            <strong>Tema:</strong> ${charla.tema}<br>
            <strong>Sede:</strong> ${nombreSede} (${direccion})<br>
            <strong>Fecha:</strong> ${charla.fecha} - ${charla.horario} hs
        </div>
    `;

    // 1. Creamos el marcador en el mapa
    const marker = mapaVista.agregarMarcador(latitud, longitud, popupHTML);

    // 2. Creamos la tarjeta del HTML en la lista
    const cardItem = document.createElement('div');
    cardItem.className = 'charla-item';
    cardItem.innerHTML = `
        <h3>${nombreSede}</h3>
        <p><strong>Tema:</strong> ${charla.tema}</p>
        <p><strong>Fecha:</strong> ${charla.fecha} - ${charla.horario} hs</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
    `;

    // Función auxiliar para resaltar esta tarjeta y desmarcar las otras
    const seleccionarTarjeta = () => {
        document.querySelectorAll('.charla-item').forEach(el => el.classList.remove('activa'));
        cardItem.classList.add('activa');
        cardItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    // EVENTO 1: Al hacer clic en la tarjeta de la lista -> enfoca mapa, abre popup y se resalta
    cardItem.addEventListener('click', () => {
        seleccionarTarjeta();
        mapaVista.map.flyTo([latitud, longitud], 14, {
            animate: true,
            duration: 1.5
        });
        marker.openPopup();
    });

    // EVENTO 2 (LO QUE PEDÍAS): Al hacer clic en el marcador del mapa -> se resalta la tarjeta correspondiente
    marker.on('click', () => {
        seleccionarTarjeta();
    });

    contenedorLista.appendChild(cardItem);
});
    }

    cargarCharlas();
});