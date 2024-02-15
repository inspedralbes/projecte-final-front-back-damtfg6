import Hero from '../components/Hero';
import Navbar from '../components/navbar';
import SobreImg from "../assets/imatgeBack3.jpg";
import Footer from '../components/Footer';
import SobreNosaltres from '../components/SobreNosaltres';
function Sobre() {
    return (
        <>
            <Navbar />
            <Hero
                cName="hero-mid"
                heroImg={SobreImg}
                title="Sobre nosaltres"
                btnClass="hide"
            />
            <SobreNosaltres />
            <Footer />
        </>
    )
}

export default Sobre;