import { createBrowserRouter } from "react-router-dom"

import Home from "./pages/Home/Home"
import Courses from "./pages/Courses/Courses"
import Apply from "./pages/Apply/Apply"
import About from "./pages/About/About"
import RootLayout from "./layouts/RootLayouts"

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "courses",
                element: <Courses />,
            },
            {
                path: "apply",
                element: <Apply />,
            },
            {
                path: "about",
                element: <About />,
            },
        ]
    }

])

export default router