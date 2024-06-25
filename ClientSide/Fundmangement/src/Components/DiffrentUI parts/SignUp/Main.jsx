import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import LoSiCommon from '../LoginPage/LoSiCommon';
import styles from './Main.module.css';
import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode'


function SignUp() {
    const navigate = useNavigate(); 
    const responseGoogle = (response) => {
        import('jwt-decode').then(jwt_decode => {
            const token = response.credential
            const decodedToken = jwt_decode.jwtDecode(token);
            console.log(decodedToken)
            const {email,family_name,given_name}=decodedToken
            console.log(email,given_name,family_name);
            navigate('/')
          }).catch(error => {
            console.log(error)
          });
        
    };

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
                    <hr />
                    <p>Or continue with</p>
                    <button style={{marginTop:'1vh'}}>
                        <GoogleLogin
                            clientId="496937648657-nmdgnmp32lm37u5nr11sl6crottlpn6a.apps.googleusercontent.com"
                            buttonText="Sign Up with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            scope="profile email"
                            
                        />
                    </button>
                    
                    {/* <button type="button" className={styles.googleButton}>Sign Up with Google</button> */}
                </form>
            </section>
        </div>
    );
}

export default SignUp;
