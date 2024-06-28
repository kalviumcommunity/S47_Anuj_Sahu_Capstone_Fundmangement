import React, { useState } from 'react';
import styles from './Main.module.css';
import './button.css';
import leftImg from '/src/assets/Banners/LoginImage.jpeg';
import LoSiCommon from './LoSiCommon';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const setCookie = (name, value, maxAge, path) => {
        document.cookie = `${name}=${value}; max-age=${maxAge}; path=${path}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            if (response.data.token) {
                setCookie('userName', formData.email, 30 * 60 * 60 * 1000, '/');
                setCookie('JWToken', response.data.token, 5 * 60 * 60 * 1000, '/');
                navigate(-1);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError(true);
        }
    };

    // Handle Google login
    const signIn = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                console.log(response)
                const tokenId = response.access_token;                ;
                const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${ tokenId}`);
                console.log(googleResponse);
                if (googleResponse.data.email) {
                    setCookie('userName', googleResponse.data.email, 30 * 60 * 60 * 1000, '/');
                    setCookie('JWToken', googleResponse.data.token, 5 * 60 * 60 * 1000, '/');
                    navigate(-1);
                }
            } catch (error) {
                console.error('Google Login Error:', error);
                setLoginError(true);
            }
        },
        onFailure: (error) => {
            console.error('Google Login Failed:', error);
            setLoginError(true);
        }
    });

    return (
        <div className={styles.wholepage}>
            <section className={styles.leftpanal}>
                <div className={styles.overlay}>
                    <h2>Welcome Back!</h2>
                    <p>Please login to continue our journey.</p>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className={styles.formGroup}>
                        <input type="text" id="email" name="email" placeholder='email' value={formData.email} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <input type="password" id="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                        <label className={styles.forget}>Forget Password</label>
                    </div>
                    {loginError && <p className={styles.error}>Incorrect email or password. Please try again.</p>}
                    <button type="submit" className={styles.login}>LOGIN</button>
                    <Link to='/signup'><button className={styles.signup}>SignUp</button></Link>
                    <hr />Or continue with
                    <button type="button" className={styles.googleButton} onClick={signIn}>Login with Google</button>
                </form>
            </section>
            <LoSiCommon />
        </div>
    );
}

export default Login;
