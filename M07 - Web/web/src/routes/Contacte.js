import Hero from '../components/Hero';
import Navbar from '../components/navbar';
import SobreImg from "../assets/imatgeBack3.jpg";
import Footer from '../components/Footer';
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
            <Footer />
        </>
    )
}

export default Contacte;