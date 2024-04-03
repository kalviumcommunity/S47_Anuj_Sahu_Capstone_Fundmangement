// import React from 'react';
// import styles from './Main.module.css';
// import './button.css'
// import leftImg from '/src/assets/Banners/LoginImage.jpeg'
// import LoSiCommon from './LoSiCommon';
// import { Link } from 'react-router-dom';

// function Login() {
//     return (
//         <div className={styles.wholepage}>
//             <section className={styles.leftpanal}>
//                 <div className={styles.overlay}>
//                             <h2>Welcome Back!</h2>
//                             <p>Please login to continue our journeny.</p>
//                 </div>
//                 <form className={styles.form}>
//                     <h2>Login</h2>
//                     <div className={styles.formGroup}>
//                         <input type="text" id="username" name="username" placeholder='Username' />
//                     </div>
//                     <div className={styles.formGroup}>
//                         <input type="password" id="password" name="password" placeholder='Password'/>
//                         <label className={styles.forget}>Forget Password</label>
//                     </div>
                    
//                     <button class={styles.login}>LOGIN</button>
//                     <Link to='/signup'><button className={styles.signup}>SignUp</button></Link>
//                     <hr />Or continue with
//                     <button type="button" className={styles.googleButton}>Login with Google</button>
//                 </form>
//             </section>
//             <LoSiCommon/>
//         </div>
//     );
// }

// export default Login;


import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import './button.css';
import leftImg from '/src/assets/Banners/LoginImage.jpeg';
import LoSiCommon from './LoSiCommon';
import { Link } from 'react-router-dom';

function Login() {
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);

    useEffect(() => {
        fetchOtpFromBackend(); 
    }, []); 

    const fetchOtpFromBackend = () => {
        setTimeout(() => {
            const fetchedOtp = '123456';
            setOtp(fetchedOtp);
        }, 1000); 
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleVerifyOtp = () => {
        if (otp === '123456') { 
            setOtpVerified(true);
            alert('OTP verified successfully!');
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    const handleResendOtp = () => {
        fetchOtpFromBackend(); 
    };

    return (
        <div className={styles.wholepage}>
            <section className={styles.leftpanal}>
                <div className={styles.overlay}>
                    <h2>Welcome Back!</h2>
                    <p>Please login to continue our journey.</p>
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
                    {otpVerified ? null : (
                        <div className={styles.formGroup}>
                            <input type="text" id="otp" name="otp" placeholder='Enter OTP' value={otp} onChange={handleOtpChange} />
                        </div>
                    )}
                    {otpVerified ? (
                        <button className={styles.login}>CONTINUE</button>
                    ) : (
                        <React.Fragment>
                            <button className={styles.login} onClick={handleVerifyOtp}>VERIFY OTP</button>
                            <Link to='/signup'><button className={styles.signup}>SignUp</button></Link>
                            <button className={styles.resendOtp} onClick={handleResendOtp}>Resend OTP</button>
                        </React.Fragment>
                    )}
                    <hr />Or continue with
                    <button type="button" className={styles.googleButton}>Login with Google</button>
                </form>
            </section>
            <LoSiCommon/>
        </div>
    );
}

export default Login;

