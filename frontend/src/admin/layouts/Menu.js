import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
    // State để quản lý trạng thái đóng/mở của dropdown
    const [isOpen, setIsOpen] = useState(false);

    // Hàm xử lý khi click vào "Quản lý"
    const handleToggle = () => {
        setIsOpen(!isOpen); // Đảo ngược trạng thái hiện tại
    };

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="/dashboard" className="brand-link">
                <img
                    src="/admin/dist/img/logop.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: '.8' }}
                />
                <span className="brand-text font-weight-light">DreamPhone</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar os-host os-theme-light os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition os-host-scrollbar-vertical-hidden">
                <div className="os-resize-observer-host observed">
                    <div className="os-resize-observer" style={{ left: 0, right: 'auto' }} />
                </div>
                <div className="os-size-auto-observer observed" style={{ height: 'calc(100% + 1px)', float: 'left' }}>
                    <div className="os-resize-observer" />
                </div>
                <div className="os-padding">
                    <div className="os-viewport os-viewport-native-scrollbars-invisible" style={{}}>
                        <div className="os-content" style={{ padding: '0px 8px', height: '100%', width: '100%' }}>
                            {/* Sidebar Menu */}
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                    {/* Dropdown "Quản lý" */}
                                    <li className={`nav-item has-treeview ${isOpen ? 'menu-open' : ''}`}>
                                        <a href="#" className="nav-link" onClick={handleToggle}>
                                            <i className="nav-icon fa fa-table" />
                                            <p>
                                                Quản lý
                                                <i className="fa fa-angle-left right" />
                                            </p>
                                        </a>
                                        {/* Các mục con */}
                                        <ul className="nav nav-treeview" style={{ display: isOpen ? 'block' : 'none' }}>
                                            <li className="nav-item">
                                                <Link to="/dashboard" className="nav-link">
                                                    <i className="fa fa-circle nav-icon" />
                                                    <p>Sản phẩm</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/dashboard/category" className="nav-link">
                                                    <i className="fa fa-circle nav-icon" />
                                                    <p>Danh mục</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
