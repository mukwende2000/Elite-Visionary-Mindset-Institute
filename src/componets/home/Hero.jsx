import { Link } from "react-router-dom"
import styles from "./Hero.module.css"

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
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4yh7SNsgdkCUbklqufnr20D2j82w9wkKP4axnIoOpTblNxWtv9UhzS7F80tILlNh5JyhcxNDe_-Xw7Gs4A2ndkme8PigNUcT2cFnlHVi_SenayjOVzXbheRb09aoPKDpCuWZ1RTaPyk2ORFzxrGl99aZu-V9PVzFe9TwHFVqeaVC0mtz6knVa3Zw7Prr88sZv09B2ai3pQZ8rWjX8oZDz9DJ2jQnl2ov-FDv0eIcvuxvENbtpIiI"
                        alt="Students participating in a professional learning session"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero