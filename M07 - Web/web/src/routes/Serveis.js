// Archivo: components/Serveis.js
import React from 'react';
import './Serveis.css'; // Asegúrate de que el nombre del archivo y la ruta sean correctos

// Importa los logos de tus servicios
import Logo1 from '../assets/family2.png'; // Asegúrate de que la ruta al logo sea correcta
import Logo2 from '../assets/chat.png'; // Asegúrate de que la ruta al logo sea correcta
import Logo3 from '../assets/calendar.png'; // Asegúrate de que la ruta al logo sea correcta
import Logo4 from '../assets/pin.png'; // Asegúrate de que la ruta al logo sea correcta
import Logo5 from '../assets/gaming.png'; // Asegúrate de que la ruta al logo sea correcta
import Logo6 from '../assets/graphic.png'; // Asegúrate de que la ruta al logo sea correcta

function Serveis() {
    const services = [
        {
            name: "Familiars",
            description: "Llista de familiars, amics, coneguts que pots afegir perque l'usuari pugui recordarlos.",
            logo: Logo1,
        },
        {
            name: "Chat",
            description: "Chat amb el que pots comunicarte amb els teus tutors que tinguis enllaçats.",
            logo: Logo2,
        },
        {
            name: "Calendari",
            description: "Calendari per afegir recordatoris o events diaris.",
            logo: Logo3,
        },
        {
            name: "Localització",
            description: "Localització de l'usuari i boto per guiarte a tornar a casa.",
            logo: Logo4,
        },
        {
            name: "Joc",
            description: "Joc de parelles per entrenar la memòria.",
            logo: Logo5,
        },
        {
            name: "Progrés",
            description: "Descobreix el teu progrés de les partides realitzades en el joc.",
            logo: Logo6,
        },
        // Añade los demás servicios aquí...
    ];

    return (
        <div className="services-container">
            {services.map((service, index) => (
                <div key={index} className="service">
                    <img src={service.logo} alt={service.name} className="service-logo" />
                    <h2 className="service-name">{service.name}</h2>
                    <p className="service-description">{service.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Serveis;