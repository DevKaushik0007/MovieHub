import React from "react";
import { Link } from 'react-router-dom';
import {
    // FaFacebookF,
    FaInstagram,
    // FaTwitter,
    FaLinkedin,
    FaGithub,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                Welcome to the Movie Section of our website, your gateway to the fascinating world of cinema. Here, we celebrate the magic of storytelling through film, providing you with an immersive experience that transcends the boundaries of time and space. Dive into a realm where imagination knows no limits, where emotions are heightened, and where dreams come to life.
                </div>
                <div className="socialIcons">
            {/* <div className="icon" href="https://www.youtube.com/watch?v=VLgVw2NEqCM">
                        <FaGithub />
                    </div> */}
                    <Link to ="https://github.com/DevKaushik0007" className="icon" target="_blank"><FaGithub /></Link>
                    <Link to ="https://www.instagram.com/devkaushik0007/" className="icon" target="_blank"><FaInstagram /> </Link>
                    <Link to ="https://www.linkedin.com/in/dev-kaushik-45687b255/   " className="icon" target="_blank"><FaLinkedin /></Link>
                     {/* <span className="icon">
                        <FaInstagram />
                    </span>
                     <span className="icon">
                        <FaTwitter />
                    </span> 
                    <span className="icon">
                        <FaLinkedin />
                    </span>  */}
            
                </div>
         
            </ContentWrapper>
        </footer>
    );
};

export default Footer;