import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DiffrentUI parts/Expertappointment.module.css';
import banner from "../assets/Banners/Banner1.png";
import { Link } from 'react-router-dom';

const ExpertDetails = () => {
    const [experts, setExperts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/appointment")
            .then((response) => {
                setExperts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching experts:", error);
            });
    }, []);

    const handleBooking = () => {
        window.location.href = 'https://calendly.com/morpheousfunds/consultation-with-expert';
    };

    return (
        <div className={styles.cardContainer}>
            {experts.map((expert, index) => {
                const firstName = expert.name.split(' ')[0];
                const lastName = expert.name.split(' ')[1];
                return (
                    <div key={index} className={styles.expertDetailsContainer}>
                        <div className={styles.imageAndName}>
                            <div className={styles.image}>
                                <img src={`${expert.profilePhoto}${firstName}+${lastName}`} alt="Profile Image" />
                            </div>
                            <div>
                                <h1>{firstName}</h1>
                            </div>
                        </div>
                        <div className={styles.experience}>
                            <p>{expert.description}</p>
                        </div>
                        <div className={styles.bookBtn}>
                            <button onClick={handleBooking}>Book Appointment</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExpertDetails;



