import Hero from '../components/Hero';
import Navbar from '../components/navbar';
import SobreImg from "../assets/imatgeBack3.jpg";

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
        </>
    )
}

export default Servei;