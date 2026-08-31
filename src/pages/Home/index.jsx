import AccreditationSection from "./components/Accreditation"
import Benefits from "./components/Benefits"
import FeaturedCourses from "./components/FeaturedCourses"
import Hero from "./components/Hero"

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
