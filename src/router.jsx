import { createBrowserRouter } from "react-router-dom"

import Home from "./pages/Home/Home"
import Courses from "./pages/Courses/Courses"
import Apply from "./pages/Apply/Apply"
import About from "./pages/About/About"
import RootLayout from "./layouts/RootLayouts"
import Payment from "./pages/Payment/Payment"
import PaymentConfirmation from './pages/PaymentConfirmation/PaymentConfirmation'

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
            {
                path: "payment",
                element: <Payment />
            },
            {
                path: "payment_confirmation",
                element: <PaymentConfirmation />
            }
        ]
    }

])

export default router