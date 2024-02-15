import Hero from '../components/Hero';
import Navbar from '../components/navbar';
import SobreImg from "../assets/imatgeBack3.jpg";

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
        </>
    )
}

export default Sobre;