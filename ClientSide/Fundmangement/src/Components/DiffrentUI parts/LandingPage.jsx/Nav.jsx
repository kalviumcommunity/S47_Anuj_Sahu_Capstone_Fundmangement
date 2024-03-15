import React from 'react';
import styles from './Nav.module.css';


function Nav() {
return (
<div>
    <nav>
        <div className={styles.upperNav}>
            <div>
                <h1 className={styles.companyName}>Morpheus Funds</h1>
            </div>
            <div>
                <button type="button" className={styles.signup} >Sign Up</button>
                <button type="button" className={styles.login} >Login</button>
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

