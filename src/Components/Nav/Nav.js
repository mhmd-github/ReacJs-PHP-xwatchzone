import React, { Component } from 'react';
import styles from './Nav.module.css'; 
import { NavLink } from 'react-router-dom';
import logo from '../../photo/logo.png';
import { MdShoppingCart } from "react-icons/md";
import { FaTimes, FaBars } from 'react-icons/fa'; // Added FaBars

class Nav extends Component {

    state = {
        mobileMenu: false,
        cartCount: 0, 
    }

    componentDidMount() {
        this.updateCartCount();
        window.addEventListener('storage', this.handleStorageChange);
        window.addEventListener('cartUpdated', this.updateCartCount); 
    }

    componentWillUnmount() {
        window.removeEventListener('storage', this.handleStorageChange);
        window.removeEventListener('cartUpdated', this.updateCartCount);
    }
    
    handleStorageChange = (e) => {
        if (e.key === 'cart') {
            this.updateCartCount();
        }
    }

    updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.length; 
        this.setState({ cartCount: count });
    }

    toggleMenu = () => {
        this.setState({ mobileMenu: !this.state.mobileMenu });
    }
    
    closeMenu = () => {
        this.setState({ mobileMenu: false });
    }

    render() {
        const { mobileMenu, cartCount } = this.state;
        
        return (
            <div className={styles.NavRoot}>
                <div className={styles.NavContainer}>
                    
                    {/* --- LEFT: MENU TOGGLE (Mobile) --- */}
                    <div className={styles.left}>
                        <div className={styles['menu-btn']} onClick={this.toggleMenu}>
                            <FaBars />
                        </div>
                    </div>

                    {/* --- CENTER: LOGO --- */}
                    <div className={styles.logo}>
                        <NavLink to="/">
                            <img src={logo} alt="Brand Logo" className={styles['logo-img']} />
                        </NavLink>
                    </div>
                
                    {/* --- RIGHT: DESKTOP LINKS & CART --- */}
                    <div className={styles['right-section']}>
                        
                        {/* Desktop Navigation Links */}
                        <ul className={styles['desktop-links']}>
                            <li>
                                <NavLink to="/" className={({ isActive }) => `${styles['links-btn']} ${isActive ? styles.active : ''}`}>
                                    Watches
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/About" className={({ isActive }) => `${styles['links-btn']} ${isActive ? styles.active : ''}`}>
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/ContactUs" className={({ isActive }) => `${styles['links-btn']} ${isActive ? styles.active : ''}`}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>

                        {/* Cart Icon */}
                        <NavLink to="/Cart" className={styles['cart-icon-wrapper']}>
                            <MdShoppingCart className={styles['fright-icon']} />
                            {cartCount > 0 && (
                                <span className={styles['cart-badge']}>{cartCount}</span>
                            )}
                        </NavLink>
                    </div>
                    
                    {/* --- MOBILE MENU DRAWER --- */}
                    <div className={`${styles['mobile-menu-container']} ${mobileMenu ? styles.active : ""}`}>
                        <div className={styles['menu-overlay']} onClick={this.closeMenu}></div>
                        
                        <div className={styles['menu-drawer']}>
                            <div className={styles['drawer-header']}>
                                <img src={logo} alt="Logo" className={styles['drawer-logo']} />
                                <div className={styles['close-menu-btn']} onClick={this.closeMenu}>
                                    <FaTimes />
                                </div>
                            </div>
                            
                            <ul className={styles['mobile-links']}>
                                <li>
                                    <NavLink 
                                        to="/" 
                                        className={({ isActive }) => `${styles['mobile-link-item']} ${isActive ? styles.active : ''}`} 
                                        onClick={this.closeMenu}
                                    >
                                        Watches
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/About" 
                                        className={({ isActive }) => `${styles['mobile-link-item']} ${isActive ? styles.active : ''}`} 
                                        onClick={this.closeMenu}
                                    >
                                        About Us
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/ContactUs" 
                                        className={({ isActive }) => `${styles['mobile-link-item']} ${isActive ? styles.active : ''}`} 
                                        onClick={this.closeMenu}
                                    >
                                        Contact Us
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Nav;