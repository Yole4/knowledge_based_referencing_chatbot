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
                            <li className="nav-item has-treeview" onClick={() => navigate('/archive-list')} style={{cursor: 'pointer'}}>
                                <span className="nav-link span-cursor">
                                    <i><FiArchive /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Archive List
                                    </p>
                                </span>
                            </li>
                            {/* =========================================================== RESEARCH WORKS ======================================================================================== */}
                            <li className="nav-item has-treeview" onClick={() => navigate('/student-list')} style={{cursor: 'pointer'}}>
                                <span className="nav-link span-cursor">
                                    <i><FaUsers /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Student List
                                    </p>
                                </span>
                            </li>
                        </ul>
                    </nav>
                    <p className='nav-link span-cursor' style={{ marginLeft: '', fontSize: '18px', color: 'whitesmoke', marginBottom: '-10px' }}><span>Maintenance</span></p>

                    <nav className="mt-2" style={{ marginLeft: '10px' }}>
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* =========================================================== PUBLICIZE RESEARCH ======================================================================================== */}
                            <li className="nav-item has-treeview" onClick={() => navigate('/department-list')} style={{cursor: 'pointer'}}>
                                <span className="nav-link span-cursor">
                                    <i><FaThList /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Department List
                                    </p>
                                </span>
                            </li>
                            {/* =========================================================== RESEARCH WORKS ======================================================================================== */}
                            <li className="nav-item has-treeview" onClick={() => navigate('/curriculumn-list')} style={{cursor: 'pointer'}}>
                                <span className="nav-link span-cursor">
                                    <i><RiNewspaperLine /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Curriculumn List
                                    </p>
                                </span>
                            </li>
                            <li className="nav-item has-treeview" onClick={() => navigate('/users-list')} style={{cursor: 'pointer'}}>
                                <span className="nav-link span-cursor">
                                    <i><FaUsersCog /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        User List
                                    </p>
                                </span>
                            </li>
                            <li className="nav-item has-treeview" onClick={() => navigate('/settings')} style={{cursor: 'pointer'}}>
                                <span className="nav-link span-cursor">
                                    <i><IoSettingsOutline /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        settings
                                    </p>
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default SideBar
