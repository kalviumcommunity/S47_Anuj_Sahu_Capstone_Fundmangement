import React from 'react'
import styles from './Main.module.css';
import leftImg from '/src/assets/Banners/LoginImage.jpeg'


function LoSiCommon() {
    return (
            <section className={styles.rightpanal}>
                <div className={styles.rightContent}>
                    <div className={styles.imageContainer}>
                        <img src={leftImg} alt="Welcome" className={styles.welcomeImage} />
                    </div>
                </div>
            </section>
        
    )
}
export default LoSiCommon
