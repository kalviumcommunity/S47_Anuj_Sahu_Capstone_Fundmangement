import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DiffrentUI parts/Expertappointment.module.css';
import banner from "../assets/Banners/Banner1.png";
import { Link, useNavigate } from 'react-router-dom';
import Nav from './DiffrentUI parts/LandingPage.jsx/Nav'
import Footer from './DiffrentUI parts/LandingPage.jsx/Footer'
import Payment from './Payment';
import Cookies from 'js-cookie'

const ExpertDetails = () => {
    const [experts, setExperts] = useState([]);
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const token = getCookie('JWToken');
    useEffect(() => {
        console.log(token)
        axios.get("http://localhost:3000/appointment",{
            headers: {
                'Authorization': `${token}`
            }
        })
            .then((response) => {
                setExperts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching experts:", error);
            });
    }, []);

    const handleBooking = () => {
        window.location.href = 'https://calendly.com/morpheousfunds/consultation-with-expert';
    };

    

    useEffect(() => {
        if (!token) {
            setDisplay(true);
            navigate('/login');
        } else {
            setDisplay(false);
        }
    },[])

    return (
        <>
        <Nav/>
        {
            display ? (
                <><h1>Please Login</h1>
                </>
            )
            : (
                <div>
                    <div className={styles.introContainer }>
                        <p className={styles.introText }>Welcome to our Expert Recommendations page! Here, you'll find personalized financial advice tailored to your needs. Our team of experienced experts analyzes market trends and your investment goals to provide you with tailored recommendations that can help you achieve your financial objectives. Whether you're planning for retirement, saving for a big purchase, or simply looking to grow your wealth, our experts are here to guide you every step of the way. Explore our curated selection of investment opportunities and take control of your financial future today</p>

                    </div>
                    <div className={styles.selectExpert}>
                        <h1>Select Your Expert!</h1>
                    </div>
                <div className={styles.expertContainer}> 
            {experts.map((expert, index) => {
                const firstName = expert.name.split(' ')[0];
                const lastName = expert.name.split(' ')[1];
                return (
                    <div key={index} className={styles.expertDetails}> 
                        <div className={styles.imageAndName}>
                            <img src={`${expert.profilePhoto}${firstName}+${lastName}`} alt="Profile Image" className={styles.userImage} />
                            <h1>{firstName}</h1>
                        </div>
                        <div className={styles.experience}>
                            <p>{expert.description}</p>
                        </div>
                        <div className={styles.bookBtn}>
                            <button onClick={handleBooking}>Book</button>
                            <button><Payment/></button>
                        </div>
                    </div>
                );
            })}
        </div>
        </div>
            )
        }
        <Footer/>
        </>
    );
};

export default ExpertDetails;



