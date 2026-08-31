import { Link } from "react-router-dom"
import styles from "./Hero.module.css"
import heroImage from '../../../assets/images/bg2.jpeg'

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.badge}>
                        ✓ Accredited by CBEC
                    </span>

                    <h1>
                        Build Skills. Advance Your Career. Shape Your Future.
                    </h1>

                    <p>
                        Professional certificate programmes designed for modern
                        professionals aiming to accelerate their careers through
                        practical and accredited education.
                    </p>

                    <div className={styles.actions}>
                        <Link to="/courses" className={styles.primaryButton}>
                            Explore Our Courses
                        </Link>

                        <Link to="/apply" className={styles.secondaryButton}>
                            Apply Now
                        </Link>
                    </div>
                </div>

                <div className={styles.imageWrapper}>
                    <img
                        src={heroImage}
                        alt="Students participating in a professional learning session"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero