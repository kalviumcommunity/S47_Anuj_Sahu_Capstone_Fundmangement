import React from 'react';
import styles from './Main.module.css';
import './button.css'
import leftImg from '/src/assets/Banners/LoginImage.jpeg'
import LoSiCommon from './LoSiCommon';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className={styles.wholepage}>
            <section className={styles.leftpanal}>
                <div className={styles.overlay}>
                            <h2>Welcome Back!</h2>
                            <p>Please login to continue our journeny.</p>
                </div>
                <form className={styles.form}>
                    <h2>Login</h2>
                    <div className={styles.formGroup}>
                        <input type="text" id="username" name="username" placeholder='Username' />
                    </div>
                    <div className={styles.formGroup}>
                        <input type="password" id="password" name="password" placeholder='Password'/>
                        <label className={styles.forget}>Forget Password</label>
                    </div>
                    
                    <button class={styles.login}>LOGIN</button>
                    <Link to='/signup'><button className={styles.signup}>SignUp</button></Link>
                    <hr />Or continue with
                    <button type="button" className={styles.googleButton}>Login with Google</button>
                </form>
            </section>
            <LoSiCommon/>
        </div>
    );
}

export default Login;
