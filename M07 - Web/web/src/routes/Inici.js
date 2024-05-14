// Archivo: Inici.js
import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/navbar';
import SobreImg from "../assets/imatgeBack3.jpg";
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import './Inici.css'; // Asegúrate de crear este archivo CSS

function Inici () {
    return (
        <>
        <Navbar />
        <Hero 
        cName="hero"
        heroImg= {SobreImg}
        title="Benvinguts a la nostra pàgina web"
        text="Descobreix la nostra passió per ajudar-te a viure amb més tranquil·litat. Estem compromesos a proporcionar serveis de qualitat que superin les teves expectatives."
        buttonText="Serveis oferts"
        url="/"
        btnClass="show"
        />
        <div className="testimonials-container">
            <Testimonials 
            title="El que diuen els nostres clients"
            testimonials={[
                {
                    text: "Estic molt content amb els serveis que m'han proporcionat. Han superat les meves expectatives!",
                    author: "Client satisfet"
                },
                {
                    text: "Realment han fet un gran treball. Estic impressionat amb el seu compromís amb la qualitat.",
                    author: "Client feliç"
                }
            ]}
            />
        </div>
        <Footer />
        </>
    )
}

export default Inici;
