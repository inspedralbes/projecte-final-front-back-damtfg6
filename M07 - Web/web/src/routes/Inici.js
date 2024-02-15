import Hero from '../components/Hero';
import Navbar from '../components/navbar';
import SobreImg from "../assets/imatgeBack3.jpg";
function Inici () {
    return (
        <>
        <Navbar />
        <Hero 
        cName="hero"
        heroImg= {SobreImg}
        title="Benvinguts a la nostra pàgina web"
        text="Segon text de la pàgina d'inici."
        /*La nostra missió és ajudar-vos a viure amb mes tranquilitat.*/
        buttonText="Serveis oferts"
        url="/"
        btnClass="show"
        />
        </>
        
    )
}

export default Inici;