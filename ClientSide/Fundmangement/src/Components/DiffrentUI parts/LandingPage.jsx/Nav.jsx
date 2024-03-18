import React from 'react';
import styles from './Nav.module.css';
import { Link } from 'react-router-dom';


function Nav() {
return (
<div>
    <nav>
        <div className={styles.upperNav}>
            <div>
                <h1 className={styles.companyName}>Morpheus Funds</h1>
            </div>
            <div>
                <Link to ="/signup"><button type="button" className={styles.signup} >Sign Up</button></Link>
                <Link to="/login"><button type="button" className={styles.login} >Login</button></Link>
            </div>
        </div>
        <div className={styles.lowerNav}>
            <a href="">Home</a>
            <a href="">Services</a>
            <a href="">About Us</a>
            <a href="">Contact Us</a>
        </div>
    </nav>
</div>
);
}

export default Nav;

