import Hero from '../components/Hero';
import Navbar from '../components/navbar';
import SobreImg from "../assets/imatgeBack3.jpg";
import Footer from '../components/Footer';

function Servei () {
    return (
        <>
        <Navbar />
            <Hero
                cName="hero-mid"
                heroImg={SobreImg}
                title="Serveis"
                btnClass="hide"
            />
            <Footer />
        </>
    )
}

export default Servei;