// Archivo: components/PaginaContacte.js
import React from 'react';
import ContacteForm from './ContacteForm'; // Importa tu formulario de contacto existente
import MapaLeaflet from './MapaLeaflet'; // Importa el componente del mapa que acabas de crear
import './PaginaContacteStyles.css'; // Asegúrate de tener este archivo de estilos

const PaginaContacte = () => {
    return (
        <div className="pagina-contacte-container">
            <div className="contacte-form-wrapper">
                <ContacteForm />
            </div>
            <div className="leaflet-map-wrapper">
                <MapaLeaflet />
            </div>
        </div>
    );
};

export default PaginaContacte;
