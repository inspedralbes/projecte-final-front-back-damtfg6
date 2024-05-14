// Archivo: components/Testimonials.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos necesarios
import './Testimonials.css';

function Testimonials({ title, testimonials }) {
    return (
        <div className="testimonials-container">
            <h2>{title}</h2>
            <Carousel 
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                showArrows={false}
                emulateTouch={true} // Permite arrastrar para navegar
            >
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial">
                        <p className="testimonial-text">{testimonial.text}</p>
                        <p className="testimonial-author">- {testimonial.author}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default Testimonials;
