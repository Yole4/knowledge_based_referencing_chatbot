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

    // background color active hover
    const [dashboardList, setDashBoardList] = useState({
        dashboard: true,
        archive: false,
        student: false,
        department: false,
        curriculumn: false,
        user: false,
        settings: false
    });

    // dashboard
    const dashboard = async () => {
        navigate('/dashboard');
        setDashBoardList((prev) => ({
            dashboard: true,
            archive: false,
            student: false,
            department: false,
            curriculumn: false,
            user: false,
            settings: false
        }))
    }

    // archive
    const archive = async () => {
        navigate('/archive-list');
        setDashBoardList((prev) => ({
            dashboard: false,
            archive: true,
            student: false,
            department: false,
            curriculumn: false,
            user: false,
            settings: false
        }))
    }

    // student
    const student = async () => {
        navigate('/student-list');
        setDashBoardList((prev) => ({
            dashboard: false,
            archive: false,
            student: true,
            department: false,
            curriculumn: false,
            user: false,
            settings: false
        }))
    }

    // department
    const department = async () => {
        navigate('/department-list');
        setDashBoardList((prev) => ({
            dashboard: false,
            archive: false,
            student: false,
            department: true,
            curriculumn: false,
            user: false,
            settings: false
        }))
    }
    // curriculumn
    const curriculumn = async () => {
        navigate('/curriculumn-list');
        setDashBoardList((prev) => ({
            dashboard: false,
            archive: false,
            student: false,
            department: false,
            curriculumn: true,
            user: false,
            settings: false
        }))
    }

    // user
    const user = async () => {
        navigate('/users-list');
        setDashBoardList((prev) => ({
            dashboard: false,
            archive: false,
            student: false,
            department: false,
            curriculumn: false,
            user: true,
            settings: false
        }))
    }

    // settings
    const settings = async () => {
        navigate('/settings');
        setDashBoardList((prev) => ({
            dashboard: false,
            archive: false,
            student: false,
            department: false,
            curriculumn: false,
            user: false,
            settings: true
        }))
    }

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <i className='fas fa-times close-button' data-widget="pushmenu" style={{position: 'absolute', top: '17px', right: '20px', fontSize: '27px'}} href="#" role="button"></i>
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
                                <a href="#" onClick={dashboard} className={dashboardList.dashboard ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" onClick={archive} style={{ cursor: 'pointer' }}>
                                <a className={dashboardList.archive ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FiArchive /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Archive List
                                    </p>
                                </a>
                            </li>
                            {/* =========================================================== RESEARCH WORKS ======================================================================================== */}
                            <li className="nav-item dropdown" onClick={student} style={{ cursor: 'pointer' }}>
                                <a className={dashboardList.student ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
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
                            <li className="nav-item dropdown" onClick={department} style={{ cursor: 'pointer' }}>
                                <a className={dashboardList.department ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FaThList /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Department List
                                    </p>
                                </a>
                            </li>
                            {/* =========================================================== RESEARCH WORKS ======================================================================================== */}
                            <li className="nav-item dropdown" onClick={curriculumn} style={{ cursor: 'pointer' }}>
                                <a className={dashboardList.curriculumn ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><RiNewspaperLine /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Curriculumn List
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" onClick={user} style={{ cursor: 'pointer' }}>
                                <a className={dashboardList.user ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FaUsersCog /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        User List
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" onClick={settings} style={{ cursor: 'pointer' }}>
                                <a className={dashboardList.settings ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
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
