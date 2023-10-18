import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackendURL from '../backend url/BackendURL';

import { FaThList, FaUsers, FaUsersCog } from "react-icons/fa";
import { RiNewspaperLine } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

// images
import givenImage from '../../assets/images/given image.png';
import logo from '../../assets/images/logo.png';

function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const backendUrl = BackendURL(); // backend URL
    const token = localStorage.getItem('token');

    // --------------------    MOUNT AFTER EXECUTION   ----------------------
    const [autoFetchChecker, setAutoFetchChecker] = useState(false);

    // -------------- Loading List ----------
    const [isLoading, setIsLoading] = useState(false);

    // -----------------------------------------   GET USER CREDENTIALS -------------------------------------------------  
    const [userCredentials, setUserCredentials] = useState(null);
    // get the credentials
    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`${backendUrl}/api/protected`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.status === 200) {

                        const userId = (response.data.user.id).toString();

                        const fetchUserCredentials = async () => {
                            try {
                                const response = await axios.post(`${backendUrl}/api/fetch-user`, { userId }, {
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                });
                                if (response.status === 200) {
                                    setUserCredentials(response.data.message[0]);
                                    setIsLoading(false);
                                }
                            } catch (error) {
                                setIsLoading(false);

                            }
                        }
                        fetchUserCredentials();

                    }
                } catch (error) {
                    setIsLoading(false);
                    navigate('/');
                }
            }
            fetchData();
        } else {
            navigate('/');
        }
    }, [token, autoFetchChecker]);

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <i className='fas fa-times close-button' data-widget="pushmenu" style={{ position: 'absolute', top: '17px', right: '20px', fontSize: '27px' }} href="#" role="button"></i>
                {/* Brand Logo */}
                <span className="brand-link span-cursor" style={{ width: '190px' }}>
                    <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">{userCredentials && userCredentials.user_type}</span>
                </span>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img style={{ width: 34, height: 34 }} src={userCredentials && (userCredentials.image).length > 0 ? `${backendUrl}/${userCredentials.image}` : givenImage} className="img-profile rounded-circle" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block" data-toggle="modal" data-target="#profile" style={{ cursor: 'pointer' }}>{userCredentials && `${userCredentials.first_name} ${userCredentials.middle_name} ${userCredentials.last_name}`}</a>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2" style={{ marginLeft: '10px' }}>
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* =========================================================== PUBLICIZE RESEARCH ======================================================================================== */}
                            <li className="nav-item dropdown" onClick={() => navigate('/dashboard')}>
                                <a href="#" className={location.pathname === '/dashboard' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/archive-list')}>
                                <a className={location.pathname === '/archive-list' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FiArchive /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Archive List
                                    </p>
                                </a>
                            </li>
                            {/* =========================================================== RESEARCH WORKS ======================================================================================== */}
                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/student-list')}>
                                <a className={location.pathname === '/student-list' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FaUsers /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Request User
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <p className='nav-link nav-home' style={{ marginLeft: '', fontSize: '18px', color: 'whitesmoke', marginBottom: '-10px' }}><span>Maintenance</span></p>

                    <nav className="mt-2" style={{ marginLeft: '10px' }}>
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* =========================================================== PUBLICIZE RESEARCH ======================================================================================== */}
                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/department-list')}>
                                <a className={location.pathname === '/department-list' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FaThList /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Department List
                                    </p>
                                </a>
                            </li>
                            {/* =========================================================== RESEARCH WORKS ======================================================================================== */}
                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/curriculumn-list')}>
                                <a className={location.pathname === '/curriculumn-list' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><RiNewspaperLine /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Courses
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/school-year')}>
                                <a className={location.pathname === '/school-year' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><MdDateRange /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        School Year
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/users-list')}>
                                <a className={location.pathname === '/users-list' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FaUsersCog /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        User List
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/settings')}>
                                <a className={location.pathname === '/settings' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
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

            {/* fetching data screen */}
            <div className="popup" style={{ display: isLoading ? 'block' : 'none' }}>
                <div className="modal-pop-up-loading">
                    <div className="modal-pop-up-loading-spiner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar
