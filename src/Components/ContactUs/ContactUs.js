import React, { useEffect } from 'react';
import styles from './ContactUs.module.css'; 
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
    

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

        <div className={styles.root}>
            <div className={styles.container}>
                
                {}
                <div className={styles.intro}>
                    <h1>Get In Touch</h1>
                    <p>
                        Whether you have a question about a timepiece, an order, or need styling advice, 
                        our team in Beirut is ready to assist you. Reach out through any of the channels below.
                    </p>
                </div>

                {}
                <div className={styles.grid}>
                    
                    {}
                    <div className={styles.card}>
                        <FaPhoneAlt className={styles['card-icon']} />
                        <h3>Call or Text Us</h3>
                        <p>Our dedicated line for quick inquiries and immediate support.</p>
                        <a href="tel:+961xxxxxxxx" className={styles['contact-link']}>+961 xx xxxxxx</a>
                    </div>
                    
                    {}
                    <div className={`${styles.card} ${styles['whatsapp-card']}`}>
                        <FaWhatsapp className={`${styles['card-icon']} ${styles['whatsapp-icon']}`} />
                        <h3>Chat with Us Instantly</h3>
                        <p>The fastest way to reach us for orders and details.</p>
                        <a 
                            href="https://wa.me/961xxxxxxxx" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`${styles['contact-link']} ${styles['whatsapp-link-btn']}`}
                        >
                            Start WhatsApp Chat
                        </a>
                    </div>

                    {}
                    <div className={styles.card}>
                        <FaEnvelope className={styles['card-icon']} />
                        <h3>Send Us an Email</h3>
                        <p>For detailed order inquiries, returns, or business proposals.</p>
                        <a href="mailto:x@gmail.com.com" className={styles['contact-link']}>example@gmail.com</a>
                    </div>

                    {}
                    <div className={styles.card}>
                        <FaMapMarkerAlt className={styles['card-icon']} />
                        <h3>Our Location</h3>
                        <p>Proudly based and serving customers across Lebanon from our Beirut center.</p>
                        <span className={styles['contact-link']}>Beirut, Lebanon</span>
                    </div>

                </div>

              

            </div>
        </div>
    );
}

export default ContactUs;