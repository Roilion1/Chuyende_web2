import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Menu from "./layouts/Menu";
import Topbar from './layouts/Topbar';
import Footer from "./layouts/Footer";

function Admin() {
    // Thêm CSS AdminLTE khi component được mount
    useEffect(() => {
        const ss = document.createElement("link");
        ss.rel = "stylesheet";
        ss.href = "/admin/dist/css/adminlte.min.css";
        document.head.appendChild(ss);

        return () => {
            document.head.removeChild(ss); // cleanup khi component unmount
        };
    }, []);

    return (
        <div className='wrapper'>
            <Topbar />
            <Menu />
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Admin;
