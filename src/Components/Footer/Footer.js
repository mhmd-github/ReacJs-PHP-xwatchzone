import React from 'react';

import { FaFacebookF, FaTiktok, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom'; 
import './Footer.css'; 


const Footer = () => {

    const location = useLocation();
    const currentPath = location.pathname.toLowerCase();


    const shouldShowLink = (path) => {

        if (path === '/') {
            return currentPath !== '/';
        }
        return currentPath !== path.toLowerCase();
    };

    return (
        <footer className="footer-root">
            <div className="footer-container">

                {}
                <div className="footer-section brand-info">
                    {}
                    <h3 className="brand-logo">XWATCHZONE</h3>
                    <p className="brand-motto">Timeless style delivered to your door.</p>
                    <div className="social-links">
                        <a href="x" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="x" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a>
                    </div>
                </div>

                {}
                <div className="footer-section quick-links">
                    <h4>Quick Links</h4>
                    <ul>
                        {}
                        {shouldShowLink('/') && (
                            <li><NavLink to="/">Watches</NavLink></li>
                        )}
                        
                        {}
                        {shouldShowLink('/about') && (
                            <li><NavLink to="/About">About Us</NavLink></li>
                        )}
                        
                        {}
                        {shouldShowLink('/contactus') && (
                            <li><NavLink to="/ContactUs">Contact Us</NavLink></li>
                        )}
                        
                        {}
                        {shouldShowLink('/cart') && (
                            <li><NavLink to="/Cart">Your Cart</NavLink></li>
                        )}
                    </ul>
                </div>

                {}
                <div className="footer-section contact-info">
                    {}
                    <h4>Contact Us (Beirut)</h4>
                    <p className="contact-detail">
                        <FaMapMarkerAlt className="contact-icon" /> <span>Beirut, Lebanon</span>
                    </p>
                    <p className="contact-detail">
                        <FaPhoneAlt className="contact-icon" /> <a href="tel:+961xxxxxxxx">+961 xx xxxxxx</a>
                    </p>
                    <p className="contact-detail whatsapp-link">
                        <FaWhatsapp className="contact-icon whatsapp-icon" /> 
                        <a href="https://wa.me/961xxxxxxxx" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
                    </p>
                    <p className="contact-detail">
                        <FaEnvelope className="contact-icon" /> <a href="mailto:x@gmail.com.com">example@gmail.com</a>
                    </p>
                </div>
                
                {}
                {}

            </div>
            
            {}
            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} XWATCHZONE. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;