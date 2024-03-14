import React from 'react';
import styles from './Nav.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Nav() {
return (
<div>
    <nav>
        <div>
            <h1 className={styles.companyName}>Morpheus Funds</h1>
        </div>
        <div>
            <button type="button" className={styles.signup} >Sign Up</button>
            <button type="button" className={styles.login} >Login</button>
        </div>
        
    </nav>
</div>
);
}

export default Nav;

