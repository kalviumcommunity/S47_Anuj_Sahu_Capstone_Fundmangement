import React from 'react';
import styles from './Footer.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerColumn}>
                    <h3>Quick Links</h3>
                    <ul className={styles.footerLinks}>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h3>Contact Info</h3>
                    <ul className={styles.contactInfo}>
                        <li>123 main road</li>
                        <li>Jaipur,Rajasthan, India,302022</li>
                        <li className={styles.Email} >Email:<a href="mailto:morpheousfunds@gmail.com"> morpheousfunds@gmail.com</a></li>
                        <li>Phone: 7049898650</li>
                    </ul>
                </div>
                
                
                <div className={styles.footerColumn}>
                    <h3>Follow Us</h3>
                    <ul className={styles.socialLinks}>
                        <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                        <li><a href="#"><i className="bi bi-linkedin"></i></a></li>
                        <li><a href="#"><i className="bi bi-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>Morpheus Funds. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
