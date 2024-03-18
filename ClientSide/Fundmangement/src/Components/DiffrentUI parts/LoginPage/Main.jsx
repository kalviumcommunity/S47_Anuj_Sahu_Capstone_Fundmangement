import React from 'react';
import styles from './Main.module.css';
import './button.css'
import leftImg from '/src/assets/Banners/LoginImage.jpeg'

function Login() {
    return (
        <div className={styles.wholepage}>
            {/* <div className={styles.rightContent}>
                    <div className={styles.imageContainer}>
                        <img src="https://plus.unsplash.com/premium_photo-1688821129108-cb107da48628?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Welcome" className={styles.welcomeImage} />
                    </div>
            </div> */}
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
                    <button className={styles.signup}>SignUp</button>
                    <hr />Or continue with
                    <button type="button" className={styles.googleButton}>Login with Google</button>
                </form>
            </section>
            <section className={styles.rightpanal}>
                <div className={styles.rightContent}>
                    <div className={styles.imageContainer}>
                        <img src={leftImg} alt="Welcome" className={styles.welcomeImage} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
