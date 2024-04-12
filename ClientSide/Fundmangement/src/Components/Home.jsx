import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './DiffrentUI parts/LandingPage.jsx/Nav'
import Main from './DiffrentUI parts/LandingPage.jsx/Main'
import Footer from './DiffrentUI parts/LandingPage.jsx/Footer'
import Profile from './Profile'

function Home() {
    return (
        <div>
            <Link to='/appointment'><button>Book Appointment</button></Link>
            <Nav/>
            <Main/>
            <Footer/>
            
            
            

        </div>
    )
}
export default Home

// import React from 'react';
// import styles from './DiffrentUI parts/LandingPage.jsx/Nav.module.css';
// import { Link } from 'react-router-dom';


// function Home() {
// return (
// <div>
//     <nav>
//         <div className={styles.upperNav}>
//             <div>
//                 <h1 className={styles.companyName}>Morpheus Funds</h1>
//             </div>
//             <div>
//                 <Link to ="/signup"><button type="button" className={styles.signup} >Sign Up</button></Link>
//                 <Link to="/profile"><button type="button" className={styles.login} >Login</button></Link>
//             </div>
//         </div>
//         <div className={styles.lowerNav}>
//             <a href="">Home</a>
//             <a href="">Services</a>
//             <a href="">About Us</a>
//             <a href="">Contact Us</a>
//         </div>
//     </nav>
// </div>
// );
// }

// export default Home;

