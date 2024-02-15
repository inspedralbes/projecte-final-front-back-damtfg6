import "./ContacteFormStyles.css";

function ContacteForm() {
    return (

        <div className="form-container">

            <h1>Envia'ns un missatge!</h1>
            <form>
                <input placeholder="Nom"></input>
                <input placeholder="Correu"></input>
                <input placeholder="Assumpte"></input>
                <textarea placeholder="Missatge" rows="4"></textarea>
                <button>Enviar</button>
            </form>
        </div>
    )

}

export default ContacteForm;