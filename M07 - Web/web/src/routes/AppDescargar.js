import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Qr from './Qr';
import SobreImg from "../assets/imatgeBack3.jpg";
function AppDescargar () {
    return (
        <>
            <Navbar />
            <Hero 
                cName="hero-mid"
                heroImg={SobreImg}
                title="App ReMind"
            />
            <Qr/>
            <Footer />
        </>
    );
}

export default AppDescargar;
