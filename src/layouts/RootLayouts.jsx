import { Outlet } from "react-router-dom";

import Navbar from "../componets/Navbar/Navbar";
import Footer from "../componets/Footer/Footer";

function RootLayout() {
    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default RootLayout