import Hero from '../components/Hero';
import Navbar from '../components/navbar';
import SobreImg from "../assets/imatgeBack3.jpg";

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
        </>
    )
}

export default Contacte;