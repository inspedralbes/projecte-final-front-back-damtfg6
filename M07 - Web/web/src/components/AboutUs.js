// Archivo: components/AboutUs.js
import React from 'react';

function AboutUs({ title, text }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    );
}

export default AboutUs;
