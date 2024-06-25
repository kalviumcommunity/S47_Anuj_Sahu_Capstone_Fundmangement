import React from 'react';
import { Link } from 'react-router-dom';
import LoSiCommon from '../LoginPage/LoSiCommon';
import styles from './Main.module.css';

function SignUp() {
    return (
        <div className={styles.wholepage}>
            <LoSiCommon />
            <section className={styles.rightpanal}>
                <div className={styles.overlay}>
                    <h2>Welcome to Our Community!</h2>
                    <p>Join us by creating your account.</p>
                </div>
                <form className={styles.form}>
                    <h2>Sign Up</h2>
                    <div className={styles.formGroup}>
                        <input type="text" id="username" name="username" placeholder="Username" />
                    </div>
                    <div className={styles.formGroup}>
                        <input type="email" id="email" name="email" placeholder="Email" />
                    </div>
                    <div className={styles.formGroup}>
                        <input type="password" id="password" name="password" placeholder="Password" />
                    </div>
                    <div className={styles.formGroup}>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" />
                    </div>
                    <button className={styles.signup}>Sign Up</button>
                    <Link to="/login"><button className={styles.login}>Login</button></Link>
                    <hr />Or continue with
                    <button type="button" className={styles.googleButton}>Sign Up with Google</button>
                </form>
            </section>
        </div>
    );
}

export default SignUp;
