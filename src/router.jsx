import { createBrowserRouter } from "react-router-dom"

import Home from "./pages/Home/Home"
import Courses from "./pages/Courses/Courses"
import Apply from "./pages/Apply/Apply"
import About from "./pages/About/About"
import RootLayout from "./layouts/RootLayouts"
import Payment from "./pages/Payment/Payment"
import PaymentConfirmation from './pages/PaymentConfirmation/PaymentConfirmation'
import AdminLayout from "./layouts/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard"
import AdminApplications from "./pages/admin/AdminApplications/AdminApplications"
import AdminApplicationDetails from "./pages/admin/AdminApplicationDetails/AdminApplicationDetails"
import AdminPayments from "./pages/admin/AdminPayments/AdminPayments"
import AdminLogin from "./pages/admin/AdminLogin/AdminLogin"
import ProtectedAdminRoute from "./pages/admin/ProtectedAdminRoute"
import AdminPaymentDetails from "./pages/admin/AdminPaymentDetails/AdminPaymentDetails"
import CourseDetails from "./pages/CourseDetails/CourseDetails"
import AdminCourses from "./pages/admin/AdminCourses/AdminCourses"
import AdminCourseDetails from "./pages/admin/AdminCourseDetails/AdminCourseDetails"
import AddCourse from "./pages/admin/AddCourse/AddCourse"

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
                path: "/courses/:courseId",
                element: <CourseDetails />

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
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
        element: <ProtectedAdminRoute />,
        children: [
            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <AdminDashboard />,
                    },
                    {
                        path: "applications",
                        element: <AdminApplications />,
                    },
                    {
                        path: "applications/:id",
                        element: <AdminApplicationDetails />,
                    },
                    {
                        path: "payments",
                        element: <AdminPayments />,
                    },
                    {
                        path: "payments/:id",
                        element: <AdminPaymentDetails />
                    },
                    {
                        path: "courses",
                        element: <AdminCourses />
                    },
                    {
                        path: "courses/:id",
                        element: <AdminCourseDetails />
                    },
                    {
                        path: "add-course",
                        element: <AddCourse />
                    }
                ],
            }
        ]
    }

])

export default router