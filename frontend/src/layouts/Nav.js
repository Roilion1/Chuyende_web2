
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
    <nav id="navigation">
        <div className="container">
            <div id="responsive-nav">
                <ul className="main-nav nav nav-navbar">
                    <li><Link to="/">Trang chủ</Link></li>
                    <li><Link to="/products">Sản phẩm</Link></li>
                    <li><Link to="/news">Tin tức</Link></li>
                    <li><Link to="/contact">Liên hệ</Link></li>
                    <li><Link to="/feedback">Phản hồi</Link></li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Nav;
