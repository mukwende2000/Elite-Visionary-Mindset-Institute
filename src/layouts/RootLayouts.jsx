import { Outlet } from "react-router-dom";

import Navbar from "../componets/shared/Navbar/Navbar";
import Footer from "../componets/shared/Footer/Footer";

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