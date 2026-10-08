import { PostulanteDatos } from '../datos/PostulanteDatos.js';
import { PostulacionServicio } from '../servicio/PostulacionServicio.js';
import { CharlaDatos } from '../datos/CharlaDatos.js';
import { CharlaServicio } from '../servicio/CharlaServicio.js';
import { MapaVista } from './MapaVista.js';

document.addEventListener('DOMContentLoaded', () => {
    const postulacionService = new PostulacionServicio(new PostulanteDatos());
    const charlaService = new CharlaServicio(new CharlaDatos());

    const tbody = document.getElementById('tabla-solicitudes');

    function renderizarTabla() {

        if (!tbody) return; 

        const solicitudes = postulacionService.listarPostulaciones();
        tbody.innerHTML = '';

        if (solicitudes.length === 0) {
            // Se actualiza a colspan="8" por la nueva columna
            tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #888;">No hay solicitudes registradas aún.</td></tr>`;
            return;
        }

        solicitudes.forEach(s => {
            const tr = document.createElement('tr');
            
            let badgeClase = 'badge-pendiente';
            if (s.estado === 'Aprobada') badgeClase = 'badge-aprobada';
            if (s.estado === 'Rechazada') badgeClase = 'badge-rechazada';

            tr.innerHTML = `
                <td>${new Date(s.fechaRegistro).toLocaleDateString()}</td>
                <td><strong>${s.apellido}, ${s.nombre}</strong><br><small style="color: #666;">${s.email}</small></td>
                <td>${s.dni}</td>
                <td>${s.distrito}</td>
                <td>${s.capacitacion ? 'Sí' : 'No'}</td>
                
                <!-- Columna de Agrupación que evalúa el booleano e imprime el partido -->
                <td>${s.agrupacion ? `Sí <br><small style="color: #666;">(${s.partido || 'Sin detallar'})</small>` : 'No'}</td>
                
                <td><span class="badge ${badgeClase}">${s.estado}</span></td>
                <td>
                    ${s.estado === 'Pendiente' ? `
                        <button class="btn-accion btn-aprobar" data-id="${s.id}">Aprobar</button>
                        <button class="btn-accion btn-rechazar" data-id="${s.id}">Rechazar</button>
                    ` : '<small style="color: #888;">Procesada</small>'}
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.btn-aprobar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                postulacionService.cambiarEstado(Number(e.target.dataset.id), 'Aprobada');
                renderizarTabla();
            });
        });

        document.querySelectorAll('.btn-rechazar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                postulacionService.cambiarEstado(Number(e.target.dataset.id), 'Rechazada');
                renderizarTabla();
            });
        });
    }

    const contenedorMapa = document.getElementById('mapa-admin');
    
    if (contenedorMapa) {
        const mapaAdmin = new MapaVista('mapa-admin');
        const formCharla = document.getElementById('form-nueva-charla');
        const alertaCharla = document.getElementById('alerta-charla');
        
        function refrescarMapaAdmin() {
            mapaAdmin.limpiarMarcadores();
            const charlas = charlaService.listarCharlas();
            
            charlas.forEach(c => {
            
                if (!c || !c.sede || typeof c.sede.latitud === 'undefined') {
                    console.warn("Se ignoró una charla corrupta:", c);
                    return; 
                }

                mapaAdmin.agregarMarcador(
                    c.sede.latitud, 
                    c.sede.longitud, 
                    `<b>${c.sede.nombre}</b><br>Charla programada.`
                );
            });
        }

        let pinTemporal = null;
        mapaAdmin.map.on('click', (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            
            document.getElementById('sede-lat').value = lat.toFixed(5);
            document.getElementById('sede-lng').value = lng.toFixed(5);

            if (pinTemporal) {
                mapaAdmin.map.removeLayer(pinTemporal);
            }
            
            pinTemporal = L.marker([lat, lng]).addTo(mapaAdmin.map)
                .bindPopup("Nueva Sede").openPopup();
        });

        if (formCharla) {
            formCharla.addEventListener('submit', (e) => {
                e.preventDefault();

                const datos = {
                    nombre: document.getElementById('charla-nombre').value,
                    tema: document.getElementById('charla-tema').value,
                    fecha: document.getElementById('charla-fecha').value,
                    horario: document.getElementById('charla-horario').value,
                    sedeNombre: document.getElementById('sede-nombre').value,
                    sedeDireccion: document.getElementById('sede-direccion').value,
                    sedeLat: document.getElementById('sede-lat').value,
                    sedeLng: document.getElementById('sede-lng').value
                };

                try {
                    charlaService.registrarCharla(datos);

                    alertaCharla.className = 'alerta alerta-exito';
                    alertaCharla.innerText = '¡Charla guardada con éxito y publicada en el mapa!';
                    alertaCharla.style.display = 'block';

                    formCharla.reset();
                    if (pinTemporal) {
                        mapaAdmin.map.removeLayer(pinTemporal);
                        pinTemporal = null;
                    }

                    refrescarMapaAdmin();
                } catch (error) {
                    alertaCharla.className = 'alerta alerta-error';
                    alertaCharla.innerText = error.message;
                    alertaCharla.style.display = 'block';
                }
            });
        }
        refrescarMapaAdmin();
    }
  renderizarTabla();
});