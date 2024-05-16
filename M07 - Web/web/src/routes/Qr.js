import React from 'react';
import './Qr.css'; // Asegúrate de que el nombre del archivo y la ruta sean correctos

// Importa los logos de tus servicios
import qr from '../assets/qr.png'; // Asegúrate de que la ruta al logo sea correcta

function Qr() {
    const services = [
        {
            name: "ReMind",
            description: "Escaneja el qr per accedir a la descàrrega",
            logo: qr,
        },
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

export default Qr;