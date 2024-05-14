// Archivo: components/SobreNosaltres.js
import React from 'react';
import LinkedInIcon from '../assets/linkedin.png'; // Asegúrate de reemplazar esto con la ruta al icono de LinkedIn en tu proyecto
import InstagramIcon from '../assets/insta.png'; // Asegúrate de reemplazar esto con la ruta al icono de Instagram en tu proyecto
import CoralPhoto from '../assets/coral.jpeg'; // Importa la foto de Coral
import CampsPhoto from '../assets/camps.jpeg'; // Importa la foto de Coral
import JoniPhoto from '../assets/joni.jpeg'; // Importa la foto de Coral
import "./SobreNosaltresStyles.css";

function SobreNosaltres() {
    const teamMembers = [
        {
            name: "Albert Coral Maderthaner",
            title: "Programador",
            photo: CoralPhoto, // Usa la foto importada
            linkedin: 'https://www.linkedin.com/in/albert-coral-maderthaner-4205b820a/',
            instagram: 'https://www.instagram.com/alberttcoral/'
        },
        {
            name: "Àngel Camps Ruiz",
            title: "Programador",
            photo: CampsPhoto, // Usa la foto importada
            linkedin: 'https://www.linkedin.com/in/àngel-camps-ruiz',
            instagram: 'https://www.instagram.com/aangeel_cr/'
        },
        {
            name: "Jonathan Martin Quispe",
            title: "Programador",
            photo: JoniPhoto, // Usa la foto importada
            linkedin: 'https://www.linkedin.com/in/tinteritos/',
            instagram: 'https://www.instagram.com/tinteritos/'
        },
        // ...
    ];

    return (
        <div className="about-container">
            <div className="section">
                <h1>La nostra historia</h1>
                <p>Fundada a Barcelona al 2024 per un petit grup de joves programadors, 
                 un projecte ambiciós, ha fet que poguem crear una app per a persones amb 
                 problemes de memòria o que depenen d'una tercera persona per gestionar 
                 events diaris, chats amb familiars, localitazació i més.</p>
            </div>

            <div className="section">
                <h1>El nostre objectiu</h1>
                <p>El nostre objectiu és proporcionar a la gent amb i sense problemes de 
                    memòria, una forma accesible d'entrenar i millorar la memòria.

                </p>
            </div>

            <div className="section">
                <h1>El nostre equip</h1>
                <div className="team">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-member">
                            <img src={member.photo} alt={member.name} className="team-member-photo" />
                            <div className="team-member-info">
                                <p className="team-member-name">{member.name}</p>
                                <p className="team-member-title">{member.title}</p>
                                <div className="team-member-socials">
                                    <a href={member.linkedin} target="_blank" rel="noreferrer">
                                        <img src={LinkedInIcon} alt="LinkedIn" className="social-icon" />
                                    </a>
                                    <a href={member.instagram} target="_blank" rel="noreferrer">
                                        <img src={InstagramIcon} alt="Instagram" className="social-icon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SobreNosaltres;