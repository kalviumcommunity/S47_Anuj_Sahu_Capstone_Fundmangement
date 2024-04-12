import React from 'react';
// import styles from './DiffrentUI parts/Expertappointment.module.css'; // Corrected import statement
import { Link } from 'react-router-dom';

function ExpertDetails() {
    return (
        <div className="expert-appointment-container">
            <Link to='/payment'><button>Payment</button></Link>
        </div>
    );
}

export default ExpertDetails;
