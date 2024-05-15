// Archivo: components/ContacteForm.js
import React, { useState } from "react";
import emailjs from 'emailjs-com';
import "./ContacteFormStyles.css";

function ContacteForm() {
    const [nom, setNom] = useState("");
    const [correu, setCorreu] = useState("");
    const [assumpte, setAssumpte] = useState("");
    const [missatge, setMissatge] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = {
            user_name: nom,
            user_email: correu,
            message_subject: assumpte,
            message: missatge,
        };

        emailjs.send('service_nack1lc', 'template_fg8lpq4', form, '6QTDRA8vyMgGntqpc')
            .then((result) => {
                console.log(result.text);
                alert("Correo enviado con éxito!"); // Muestra una alerta cuando el correo se envía con éxito
                setNom(""); // Resetea el campo del nombre
                setCorreu(""); // Resetea el campo del correo
                setAssumpte(""); // Resetea el campo del asunto
                setMissatge(""); // Resetea el campo del mensaje
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className="form-container">
            <h1>Envia'ns un missatge!</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)}></input>
                <input placeholder="Correu" value={correu} onChange={e => setCorreu(e.target.value)}></input>
                <input placeholder="Assumpte" value={assumpte} onChange={e => setAssumpte(e.target.value)}></input>
                <textarea placeholder="Missatge" rows="4" value={missatge} onChange={e => setMissatge(e.target.value)}></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default ContacteForm;
