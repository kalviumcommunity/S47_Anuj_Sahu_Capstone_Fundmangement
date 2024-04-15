import React from 'react';
// import styles from './DiffrentUI parts/Expertappointment.module.css'; // Corrected import statement
import { Link } from 'react-router-dom';

function ExpertDetails() {
    return (
        <div>
            <div className="expert-appointment-container">
                <Link to='/payment'><button>Payment</button></Link>
            </div>
            <div className="expert-card">
                <div className="expert-img">
                    <img src="brokenLink" alt="Anuj" />
                </div>
                <div className="expert-details">
                    <h2>Anuj Sahu</h2>
                    <p>Experiance in the fiannace feild with more then 10 years.</p>
                    <button className="book-btn">Book</button>
                </div>
            </div>
        </div>
    );
}

export default ExpertDetails;
