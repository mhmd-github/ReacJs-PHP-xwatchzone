import React from 'react';
import styles from './About.module.css';
import { FaAward, FaMapMarkerAlt, FaHandshake, FaClock } from 'react-icons/fa';
import { NavLink} from 'react-router-dom'; 

const About = () => {
    
    return (

        <div className={styles.root}>
            
            {}
            <div className={styles.hero}>
                <h1>Welcome to XWATCHZONE</h1>
                <p>Curating Timeless Elegance in the Heart of Beirut.</p>
            </div>

            <div className={styles.container}>
                
                {}
                <div className={`${styles.section} ${styles['split-layout']}`}>
                    <div className={styles.text}>
                        <h2>Our Story</h2>
                        <p>
                            At <strong>XWATCHZONE</strong>, we believe that a watch is more than just a device to tell time—it is a statement of style, a piece of history, and a companion for life's most important moments.
                        </p>
                        <p>
                            Founded in <strong>Beirut, Lebanon</strong>, we started with a simple mission: to bring high-quality, stylish, and affordable timepieces to our community. Whether you are looking for a classic look for the office or a rugged companion for your adventures, we have curated a collection that speaks to every personality.
                        </p>
                    </div>
                    <div className={styles['image-placeholder']}>
                        {}
                        <div className={styles['img-box']}>
                            <span>Time is Luxury</span>
                        </div>
                    </div>
                </div>

                {}
                <div className={`${styles.section} ${styles['values-section']}`}>
                    <h2>Why Shop With Us?</h2>
                    <div className={styles['values-grid']}>
                        <div className={styles['value-card']}>
                            <FaAward className={styles['value-icon']} />
                            <h3>Quality Guaranteed</h3>
                            <p>We hand-pick every watch in our inventory to ensure it meets our high standards of durability and style.</p>
                        </div>
                        <div className={styles['value-card']}>
                            <FaMapMarkerAlt className={styles['value-icon']} />
                            <h3>Local & Accessible</h3>
                            <p>Proudly Lebanese. We are based in Beirut, offering fast local delivery and personal customer support.</p>
                        </div>
                        <div className={styles['value-card']}>
                            <FaHandshake className={styles['value-icon']} />
                            <h3>Customer First</h3>
                            <p>Your satisfaction is our priority. Our team is always ready via WhatsApp or phone to help you choose the perfect fit.</p>
                        </div>
                    </div>
                </div>

                {}
                <div className={`${styles.section} ${styles['location-highlight']}`}>
                    <div className={styles['location-content']}>
                        <FaClock className={styles['location-icon-bg']} />
                        <h2>Serving Lebanon with Pride</h2>
                        <p>
                            From the bustling streets of Hamra to the mountains of Lebanon, XWATCHZONE is your trusted partner in time. 
                            We understand the local taste for elegance and quality.
                        </p>
                        <div>
                            {}
                            <NavLink to="/ContactUs" className={styles['contact-btn']}>Visit or Contact Us</NavLink>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;