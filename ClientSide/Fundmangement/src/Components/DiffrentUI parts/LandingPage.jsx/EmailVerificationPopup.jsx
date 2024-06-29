// EmailVerificationPopup.js
import React, { useState } from 'react';
import styles from './Nav.module.css';
import axios from 'axios';

const EmailVerificationPopup = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'otp') {
            setOtp(value);
        }
    };

    const handleSendOTP = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/otpSend', { email });

            if (response.status === 200) {
                const otpFromServer = response.data.otp;
                localStorage.setItem('otp', otpFromServer);
                setOtpSent(true);
                alert('OTP sent successfully!');
            } else {
                alert('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP. Please try again.');
        }
    };

    const handleVerifyOTP = (event) => {
        event.preventDefault();

        const storedOTP = localStorage.getItem('otp');

        if (otp === storedOTP) {
            localStorage.removeItem('otp')
            alert('OTP verified successfully!');
            
            // Handle successful verification, e.g., close the popup, update state, etc.
        } else {
            alert('OTP verification failed. Please try again.');
        }
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h2>Verify Email</h2>
                <form onSubmit={otpSent ? handleVerifyOTP : handleSendOTP}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                    {!otpSent && <button type="submit">Send OTP</button>}
                    {otpSent && (
                        <>
                            <input
                                type="text"
                                name="otp"
                                value={otp}
                                onChange={handleChange}
                                placeholder="Enter OTP"
                                required
                            />
                            <button type="submit">Verify OTP</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EmailVerificationPopup;
