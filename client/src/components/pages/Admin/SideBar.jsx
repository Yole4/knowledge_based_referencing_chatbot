import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackendURL from '../backend url/BackendURL';

import { FaThList, FaUsers, FaUsersCog } from "react-icons/fa";
import { RiNewspaperLine } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

// images
import givenImage from '../../assets/images/given image.png';
import logo from '../../assets/images/logo.png';

function SideBar() {
    const navigate = useNavigate();

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <span className="brand-link span-cursor" style={{ width: '190px' }}>
                    <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">Admin</span>
                </span>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img style={{ width: 34, height: 34 }} src={givenImage} className="img-profile rounded-circle" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block" data-toggle="modal" data-target="#profile" style={{ cursor: 'pointer' }}>shelo</a>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2" style={{ marginLeft: '10px' }}>
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* =========================================================== PUBLICIZE RESEARCH ======================================================================================== */}
                            <li className="nav-item dropdown">
                                <a href="#" onClick={() => navigate('/dashboard')} className="nav-link nav-home">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" onClick={() => navigate('/archive-list')} style={{ cursor: 'pointer' }}>
                                <a className="nav-link nav-home">
                                    <i className="nav-icon"><FiArchive /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Archive List
                                    </p>
                                </a>
                            </li>
                            {/* =========================================================== RESEARCH WORKS ======================================================================================== */}
                            <li className="nav-item dropdown" onClick={() => navigate('/student-list')} style={{ cursor: 'pointer' }}>
                                <a className="nav-link nav-home">
                                    <i className="nav-icon"><FaUsers /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Student List
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <p className='nav-link nav-home' style={{ marginLeft: '', fontSize: '18px', color: 'whitesmoke', marginBottom: '-10px' }}><span>Maintenance</span></p>

                    <nav className="mt-2" style={{ marginLeft: '10px' }}>
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* =========================================================== PUBLICIZE RESEARCH ======================================================================================== */}
                            <li className="nav-item dropdown" onClick={() => navigate('/department-list')} style={{ cursor: 'pointer' }}>
                                <a className="nav-link nav-home">
                                    <i className="nav-icon"><FaThList /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Department List
                                    </p>
                                </a>
                            </li>
                            {/* =========================================================== RESEARCH WORKS ======================================================================================== */}
                            <li className="nav-item dropdown" onClick={() => navigate('/curriculumn-list')} style={{ cursor: 'pointer' }}>
                                <a className="nav-link nav-home">
                                    <i className="nav-icon"><RiNewspaperLine /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Curriculumn List
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" onClick={() => navigate('/users-list')} style={{ cursor: 'pointer' }}>
                                <a className="nav-link nav-home">
                                    <i className="nav-icon"><FaUsersCog /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        User List
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }}>
                                <a className="nav-link nav-home">
                                    <i className="nav-icon"><IoSettingsOutline /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        settings
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default SideBar
