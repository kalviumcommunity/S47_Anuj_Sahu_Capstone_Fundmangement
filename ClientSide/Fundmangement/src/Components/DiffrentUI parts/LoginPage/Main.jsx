import React, { useState } from 'react';
import styles from './Main.module.css';
import './button.css'
import leftImg from '/src/assets/Banners/LoginImage.jpeg'
import LoSiCommon from './LoSiCommon';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'; 


function Login() {
    const [formData, setFormData] = useState({
        username: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            console.log(response.data);

            // Check if the response contains a token
            if (response.data.token) {
                setCookie('JWToken', response.data.token, 5 * 60 * 60 * 1000); 
                navigate('/')
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError(true); 
        }
    };

    // Function to set a cookie
    const setCookie = (name, value, maxAge) => {
        document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
    };

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
                        <input type="text" id="username" name="username" placeholder='username' value={formData.username} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <input type="password" id="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                        <label className={styles.forget}>Forget Password</label>
                    </div>
                    {loginError && <p className={styles.error}>Incorrect username or password. Please try again.</p>}
                    <button type="submit" className={styles.login}>LOGIN</button>
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
