import React, { useState, useEffect, useRef } from 'react';
import styles from './Nav.module.css';
import { Link } from 'react-router-dom';
import shareImg from '/src/assets/Banners/capstone image 3.jpeg';

function Nav() {
    const [isProfileCardOpen, setProfileCardOpen] = useState(false);
    const profileCardRef = useRef(null);
    const [hasCookie, setHasCookie] = useState(false);

    



    useEffect(() => {
        const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith('JWToken='));
        setHasCookie(cookieExists);
    }, []);
    

    useEffect(() => {
        const handleClickOutsideProfileCard = (event) => {
            if (profileCardRef.current && !profileCardRef.current.contains(event.target)) {
                setProfileCardOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutsideProfileCard);
        return () => {
            document.removeEventListener('click', handleClickOutsideProfileCard);
        };
    }, []);

    const toggleProfileCard = (event) => {
        event.stopPropagation(); 
        setProfileCardOpen(!isProfileCardOpen);
    };


    const handleLogout = () => {
        document.cookie = 'JWToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload();
        
    };
    

    return (
        <div>
            <nav>
                <div className={styles.upperNav}>
                    <div>
                        <h1 className={styles.companyName}>Morpheus Funds</h1>
                    </div>
                    {hasCookie ? (
                        <section>
                            <img src={shareImg} alt="" className={styles.profile} onClick={toggleProfileCard} />
                        </section>
                    ) : (
                        <Link to="/signup"><button type="button" className={styles.login} >Join Us</button></Link>
                    )}
                </div>
                {isProfileCardOpen && (
                    <div className={styles.profileCard} ref={profileCardRef}>
                        <div className={styles.upperprofilecard}>
                            <img src={shareImg} alt="" className={styles.profileoncard} onClick={toggleProfileCard}/>
                            <button className={styles.editBtn}>
  <svg height="1em" viewBox="0 0 512 512">
    <path
      d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
    ></path>
  </svg>
</button>
                        </div>
                        <div className={styles.lowerprofilecard}>
                            <h5 className={styles.username}>Anuj Sahu</h5>
                            <div className={styles.featuresContainer}>
                                <p className={styles.features}>Your watch stokes</p>
                                <p className={styles.features}>Your Protfolio</p>
                                <p className={styles.features}>Contact Us</p>
                            </div>
                        <button onClick={()=>{handleLogout()} } className={styles.logout} >Logout</button>
                        </div>
                        
                    </div>
                )}
                <div className={styles.lowerNav}>
                    <a href="">Home</a>
                    <a href="">Services</a>
                    <a href="">About Us</a>
                    <a href="">Contact Us</a>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
