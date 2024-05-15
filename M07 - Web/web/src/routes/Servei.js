// Archivo: components/Servei.js
import React from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Serveis from './Serveis'; // Importa el nuevo componente de servicios
import SobreImg from "../assets/imatgeBack3.jpg";

function Servei() {
    return (
        <>
            <Navbar />
            <Hero
                cName="hero-mid"
                heroImg={SobreImg}
                title="Serveis"
                btnClass="hide"
            />
            <Serveis /> {/* Aquí se incluye el componente de servicios */}
            <Footer />
        </>
    );
}

export default Servei;
