import { Link } from "react-router-dom";
import "./FooterStyles.css";

const Footer = () => {
    return (
    <div class="footer-distributed">

        <div class="footer-left">
            <h3>Recuerdate</h3>

            <p class="footer-links">

                <Link to="/">Inici</Link>
                |
                <Link to="/sobre">Sobre nosaltres</Link>
                |
                <Link to="/servei">Serveis</Link>
                |
                <Link to="/contacte">Contacta'ns</Link>
            </p>

            <p class="footer-company-name">Copyright © 2024 <strong>Recuerdate</strong> All rights reserved</p>
        </div>

        <div class="footer-center">
            <div>
                <i class="fa fa-map-marker"></i>
                <p><span>Ubicació</span>
                    Espanya</p>
            </div>

            <div>
                <i class="fa fa-phone"></i>
                <p>+34</p>
            </div>
            <div>
                <i class="fa fa-envelope"></i>
                <p><a href="mailto:recuerdate@gmail.com">recuerdate@gmail.com</a></p>
            </div>
        </div>
        <div class="footer-right">
            <p class="footer-company-about">
                <span>Sobre nosaltres</span>
                <strong>Recuerdate</strong> és una aplicació mobil de recordatoris i contol d'ubicació formada per 2 interficies les cuals son tutor i usuari.
            </p>
            <div class="footer-icons">
                <a href="https://www.instagram.com/"><i class="fa-brands fa-instagram-square"></i></a>
                <a href="https://www.linkedin.com/"><i class="fa-brands fa-linkedin"></i></a>
                <a href="https://twitter.com/"><i class="fa-brands fa-twitter-square"></i></a>
            </div>
        </div>
    </div>
    );
}

export default Footer;