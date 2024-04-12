import React, { useEffect, useState } from 'react'
import bannerImages from './BannerImages'
import styles from './Main.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import shareImg from '/src/assets/Banners/capstone image 3.jpeg'
import videoSrc from '/src/assets/Banners/Transform Your Finances with Morpheus Funds! - Wide Landscape.mp4';
import ReactPlayer from 'react-player';



function Main() {
    const [currentIndex,setCurrentIndex] = useState(0)
    const [playing, setPlaying] = useState(false);
    useEffect(()=>{
        const changeImage = setInterval(()=>{
            setCurrentIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
        },3000)
        return ()=> clearInterval(changeImage)
    },[])

return (
    <main>
        <section className={styles.banners}>
            <img src={bannerImages[currentIndex]} alt="" className={styles.bannerImages} />
        </section>
        <section>
            <div className={styles.whyChooseUs}>
                <h1>Why Choose Us?</h1>
            </div>
            <div className={styles.reasonsContainer}>
                <div className={styles.reason}>
                    <h2>Quality Service</h2>
                    <p>We provide top-notch service to our customers.</p>
                </div>
                <div className={styles.reason}>
                    <h2>Expert Team</h2>
                    <p>Our team consists of experienced professionals.</p>
                </div>
                <div className={styles.reason}>
                    <h2>Customer Satisfaction</h2>
                    <p>Our priority is to ensure our customers are satisfied.</p>
                </div>
                <div className={styles.reason}>
                    <h2>Competitive Pricing</h2>
                    <p>We offer competitive pricing options to ensure great value for your investment.</p>
                </div>
                <div className={styles.reason}>
                    <h2>Custom Solutions</h2>
                    <p>Our team tailors solutions to fit your unique needs, providing personalized service every step of the way.</p>
                </div>
                <div className={styles.reason}>
                    <h2>Timely Delivery</h2>
                    <p>We prioritize timely delivery of our services, ensuring you meet your deadlines and objectives efficiently.</p>
                </div>
            </div>
            
        </section>
        <section className={styles.bigbanner}>
                <ReactPlayer
                    url={videoSrc}
                    playing={true}
                    loop={true}
                    controls={true}
                    width='100vw'
                    height='80vh'   
                >
                {/* <video src={videoSrc}  type="video/mp4" autoPlay loop muted className={styles.video} /> */}
                </ReactPlayer>
            </section>
        <section className={styles.enimationSection}>
                <div>
                    <img src={bannerImages[1]} alt="" className={styles.imageContainer} />
                </div>
                <div className={styles.cardContainer}>
                    <div className={styles.card}>
                        <h2>Some Text Here</h2>
                        <p>This is a placeholder text for the card.</p>
                    </div>
                </div>
        </section>
        <section className={styles.servicesSection}>
                <div className={styles.card}>
                    <h2>Stock Recommendation</h2>
                    <p>Receive personalized stock recommendations.</p>
                    <img src={shareImg} alt="" />
                </div>
                <div className={styles.card}>
                    <h2>Expert Advice</h2>
                    <p>Get expert advice from seasoned professionals.</p>
                    <img src={shareImg} alt="" />                </div>
                <div className={styles.card}>
                    <h2>Tax Calculation</h2>
                    <p>Accurate tax calculations tailored to your needs.</p>
                    <img src={shareImg} alt="" />                </div>
                <div className={styles.card}>
                    <h2>Market News</h2>
                    <p>Stay updated with the latest market news and trends.</p>
                    <img src={shareImg} alt="" />                </div>
        </section>

    </main>
)
}

export default Main
