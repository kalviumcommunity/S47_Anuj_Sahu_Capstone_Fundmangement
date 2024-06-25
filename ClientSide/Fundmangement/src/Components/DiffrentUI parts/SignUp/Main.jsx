import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoSiCommon from '../LoginPage/LoSiCommon';
import styles from './Main.module.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner';

function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State for loading spinner
    const [userName, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleManualSignUp = async (event) => {
        event.preventDefault();

        // Validate passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Prepare data for POST request
        const userData = {
            userName: userName,
            email: email,
            password: password
        };

        try {
            setLoading(true); // Show loading spinner
            // Make POST request to backend
            const response = await axios.post('http://localhost:3000/signup', userData);
            console.log('SignUp successful:', response.data);
            // Redirect or show success message as needed
            navigate('/');
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle error, e.g., show error message to user
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    const responseGoogle = (response) => {
        import('jwt-decode').then(jwt_decode => {
            const token = response.credential;
            const decodedToken = jwt_decode.default(token); // Note: Use .default for CommonJS modules
            console.log(decodedToken);
            const { email, family_name, given_name } = decodedToken;
            console.log(email, given_name, family_name);
            navigate('/');
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className={styles.wholepage}>
            <LoSiCommon />
            {loading ? (
                <CirclesWithBar
                    height={100}
                    width={100}
                    color="#4fa94d"
                    outerCircleColor="#4fa94d"
                    innerCircleColor="#4fa94d"
                    barColor="#4fa94d"
                    ariaLabel="circles-with-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            ) : (
                <section className={styles.rightpanal}>
                    <div className={styles.overlay}>
                        <h2>Welcome to Our Community!</h2>
                        <p>Join us by creating your account.</p>
                    </div>
                    <form className={styles.form} onSubmit={handleManualSignUp}>
                        <h2>Sign Up</h2>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                placeholder="userName"
                                value={userName}
                                onChange={(e) => setuserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.signup}>Sign Up</button>
                        <Link to="/login"><button className={styles.login}>Login</button></Link>
                        <hr />
                        <p>Or continue with</p>
                        <button style={{ marginTop: '1vh' }}>
                            <GoogleLogin
                                clientId="496937648657-nmdgnmp32lm37u5nr11sl6crottlpn6a.apps.googleusercontent.com"
                                buttonText="Sign Up with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                scope="profile email"
                            />
                        </button>
                    </form>
                </section>
            )}
        </div>
    );
}

export default SignUp;
