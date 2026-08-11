import AccreditationSection from "../../componets/home/Accreditation"
import Benefits from "../../componets/home/Benefits"
import FeaturedCourses from "../../componets/home/FeaturedCourses"
import Hero from "../../componets/home/Hero"

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
