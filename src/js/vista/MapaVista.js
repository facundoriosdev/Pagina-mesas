export class MapaVista {
    constructor(elementId, latitudInicial = -34.56, longitudInicial = -58.54) {
        // Inicializa el mapa en el contenedor especificado
        this.map = L.map(elementId).setView([latitudInicial, longitudInicial], 10);

        // Capa de teselas (OpenStreetMap oficial)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.markersGroup = L.layerGroup().addTo(this.map);

        setTimeout(() => {
            this.map.invalidateSize();
        }, 250);
    }

    limpiarMarcadores() {
        this.markersGroup.clearLayers();
    }

    agregarMarcador(lat, lng, popupHTML) {
        const marker = L.marker([lat, lng]);
        marker.bindPopup(popupHTML);
        this.markersGroup.addLayer(marker);
        return marker;
    }
}