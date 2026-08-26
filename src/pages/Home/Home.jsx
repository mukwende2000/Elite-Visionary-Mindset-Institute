import AccreditationSection from "../../components/home/Accreditation"
import Benefits from "../../components/home/Benefits"
import FeaturedCourses from "../../components/home/FeaturedCourses"
import Hero from "../../components/home/Hero"

function Home() {
    return (
        <>
            <Hero />
            <Benefits />
            <AccreditationSection />
            <FeaturedCourses />
        </>
    )
}

export default Home
