import Hero from '../components/Hero';
import Navbar from '../components/navbar';
import SobreImg from "../assets/imatgeBack3.jpg";
import Footer from '../components/Footer';
import ContacteForm from '../components/ContacteForm';
import PaginaContacte from '../components/PaginaContacte'; // Asegúrate de importar el nuevo componente
function Contacte () {
    return (
        <>
        <Navbar />
            <Hero
                cName="hero-mid"
                heroImg={SobreImg}
                title="Contacte"
                btnClass="hide"
            />
            <PaginaContacte />
            <Footer />
        </>
    )
}

export default Contacte;