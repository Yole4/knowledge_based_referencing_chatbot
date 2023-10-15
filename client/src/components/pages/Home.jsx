import React, { useEffect, useState } from 'react'
import '../assets/css/CSS.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

//images
import logo from '../assets/images/logo.png';
import givenImage from '../assets/images/given image.png';

// react icons
import { AiOutlineCloseCircle, AiTwotoneHome } from 'react-icons/ai';
import { IoMenuSharp } from 'react-icons/io5';
import { ImSearch } from 'react-icons/im';
import { RiArrowDownSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { TbBulbFilled } from 'react-icons/tb';
import { FaThList } from 'react-icons/fa';
import { SiCoursera } from 'react-icons/si';
import { BiSolidUserVoice } from 'react-icons/bi';
import { PiUploadBold } from 'react-icons/pi';
import { GoDotFill } from 'react-icons/go';
import { VscDeviceCamera } from 'react-icons/vsc';

// backend url
import BackendURL from './backend url/BackendURL';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const backendUrl = BackendURL(); // backend url
    const token = localStorage.getItem('token'); // token

    const [onSearch, setOnSearch] = useState(false); // search
    const [isOpenLogin, setIsOpenLogin] = useState(false); // login popup
    const [isOpenRegister, setIsOpenRegister] = useState(false); // register popup
    const [menuBar, setMenuBar] = useState(false); // right menu bar
    const [isChangePassword, setIsChangePassword] = useState(false); // change password modal
    const [isProfile, setIsProfile] = useState(false); // profile modal
    const [isLogout, setIsLogout] = useState(false);

    // --------------------    MOUNT AFTER EXECUTION   ----------------------
    const [autoFetchChecker, setAutoFetchChecker] = useState(false);

    // -------------- Loading List ----------
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // -------------------------------------      LOGIN    ----------------------------------------    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const requestLogin = { username, password };

        try {
            const response = await axios.post(`${backendUrl}/api/login`, requestLogin);

            if (response.status === 200) {

                localStorage.setItem('token', response.data.token);
                setIsLoading(false);
                setErrorMessage("Login Success!");
                setIsSuccess(true);
                setIsOpenLogin(false);
                setUsername('');
                setPassword('');

                setTimeout(() => {
                    setIsSuccess(false);
                }, 5000);
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 401) {
                setErrorMessage(error.response.data.message);
                setIsError(true);

                setTimeout(() => {
                    setIsError(false);
                }, 5000);
            } else {
                console.log('Error: ', error);
            }
        }
    }

    // -------------------------------------      REGISTER    ----------------------------------------    
    const [registerData, setRegisterData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/register`, { registerData });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setIsLoading(false);
                setErrorMessage("Register Success!");
                setIsSuccess(true);
                setIsOpenRegister(false);
                setRegisterData({
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                })

                setTimeout(() => {
                    setIsSuccess(false);
                }, 5000);
            };
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 401) {
                setErrorMessage(error.response.data.message);
                setIsError(true);

                setTimeout(() => {
                    setIsError(false);
                }, 5000);
            } else {
                console.log('Error: ', error);
            }
        }
    };

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
                                    setChangePass((prev) => ({ ...prev, username: response.data.message[0].username }));
                                    setIsLoading(false);
                                    setIsLogin(true);
                                }
                            } catch (error) {
                                setIsLoading(false);
                                setIsLogin(false);
                            }
                        }
                        fetchUserCredentials();

                    }
                } catch (error) {
                    setIsLoading(false);
                    setIsLogin(false);
                }
            }
            fetchData();
        } else {
            setIsLogin(false);
        }
    }, [token, autoFetchChecker]);

    // -------------------------------------   CHANGE PASSWORD -------------------------------------
    const [changePass, setChangePass] = useState({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChagePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userId = (userCredentials.id).toString();;
        const changeRequest = { changePass, userId };

        try {
            const response = await axios.post(`${backendUrl}/api/change-password`, changeRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setErrorMessage(response.data.message);
                setIsSuccess(true);
                setIsChangePassword(false);
                setAutoFetchChecker(autoFetchChecker ? false : true);

                setChangePass({
                    username: '',
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });

                setTimeout(() => {
                    setIsSuccess(false);
                }, 5000);
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 401) {
                setErrorMessage(error.response.data.message);
                setIsError(true);

                setTimeout(() => {
                    setIsError(false);
                }, 5000);
            } else {
                console.log('Error: ', error);
            }
        }
    };

    // #################################################################  AUTO Profile Upload  ###################################################################
    const [autoImage, setAutoImage] = useState([]);
    useEffect(() => {
        if (autoImage) {
            if (autoImage.length === 0) {
                // console.log('nothing change!')
            }
            else {
                setIsLoading(true);
                const autoUpload = async () => {

                    const requestImageToUpload = new FormData();
                    requestImageToUpload.append('image', autoImage);
                    requestImageToUpload.append('userId', userCredentials.id);

                    try {
                        const response = await axios.post(`${backendUrl}/api/auto-image-upload`, requestImageToUpload, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        if (response.status === 200) {
                            setIsLoading(false);
                            setAutoFetchChecker(autoFetchChecker ? false : true);


                            setErrorMessage(response.data.message);
                            setIsSuccess(true);

                            setTimeout(() => {
                                setIsSuccess(false);
                            }, 5000);
                        }
                    } catch (error) {
                        setIsLoading(false);
                        if (error.response && error.response.status === 401) {
                            setErrorMessage(error.response.data.message);
                            setIsError(true);

                            setTimeout(() => {
                                setIsError(false);
                            }, 5000);
                        } else {
                            console.log('Error: ', error);
                        }
                    }
                };
                autoUpload();
            }
        }
    }, [autoImage]);

    return (
        <>
            <div className="wrapper" onClick={() => setOnSearch(false)}>
                {/* Navbar */}
                <nav className="main-header navbar navbar-expand navbar-primary navbar-dark bg-navy" style={{ width: '100%', marginLeft: '0', zIndex: '51' }}>
                    {/* Left navbar links */}
                    <ul className="navbar-nav">
                        <li className="nav-item d-sm-inline-block" onClick={() => navigate('/')}>
                            <span className="mr-2  text-white"><i className="fa fa-phone mr-1"></i> 09854698789</span>
                        </li>
                    </ul>
                    {/* Right navbar links */}
                    <ul className="navbar-nav ml-auto">
                        {/* Messages Dropdown Menu */}
                        <li className="nav-item dropdown">
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <a href="#" className="dropdown-item">
                                    {/* Message Start */}
                                    {/* Message End */}
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                            </div>
                        </li>

                        {isLogin ? (
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" data-toggle="dropdown" href="#">
                                        <i className="far fa-bell" />
                                        <span className="badge badge-warning navbar-badge">1</span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                        <span className="dropdown-item dropdown-header">1 Notification</span>


                                        <div className='dropdown-item other' style={{ fontSize: '12px', cursor: 'pointer' }}>
                                            <i className="fas fa-bell mr-2" style={{ position: 'absolute', fontSize: '15px', marginTop: '5px', marginLeft: '-5px', color: 'rgba(80, 66, 66, 0.935)' }} /><p style={{ marginLeft: '22px' }}>This is the notification message </p>
                                            <p style={{ marginLeft: 22, fontSize: 10, color: 'rgb(105, 96, 96)' }}>date</p>
                                        </div>

                                        <div className="dropdown-divider" />
                                        <a data-toggle="modal" data-target="#allNotification" style={{ cursor: 'pointer' }} className="dropdown-item dropdown-footer">See All Notifications</a>
                                    </div>
                                </li>

                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userCredentials && `${userCredentials.first_name} ${userCredentials.middle_name} ${userCredentials.last_name}`}</span>
                                        <img style={{ width: 25, height: 25 }} className="img-profile rounded-circle" src={userCredentials && (userCredentials.image).length > 0 ? `${backendUrl}/${userCredentials.image}` : givenImage} />
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                        <a className="dropdown-item" data-toggle="modal" data-target="#profile" style={{ cursor: 'pointer' }} onClick={() => setIsProfile(true)}><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                            Profile
                                        </a>
                                        {userCredentials && userCredentials.user_type === "Admin" && (
                                            <a className="dropdown-item" data-toggle="modal" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}><i className="nav-icon fas fa-tachometer-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Dashboard
                                            </a>
                                        )}
                                        <a className="dropdown-item" data-toggle="modal" onClick={() => setIsChangePassword(true)} data-target="#change_password" style={{ cursor: 'pointer' }}><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                            Change Password
                                        </a>
                                        <a className="dropdown-item" data-toggle="modal" data-target="#logout" style={{ cursor: 'pointer' }} onClick={() => setIsLogout(true)}>
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </>
                        ) : (
                            < li className="nav-item dropdown no-arrow right-margin" style={{ marginRight: '-10px' }}>
                                <a className="nav-link" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => { e.stopPropagation(); setIsOpenLogin(isOpenLogin ? false : true) }}>
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Signin/Login</span>
                                    <img style={{ width: 25, height: 25 }} className="img-profile rounded-circle" src={givenImage} />
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>
                <nav className="main-header navbar navbar-expand navbar-light border-0 navbar-light text-sm" id="top-Nav" style={{ marginLeft: '0', marginTop: '0', zIndex: '50' }}>
                    <div className="container">
                        <a href="#" onClick={() => navigate('/')} className="navbar-brand">
                            <img src={logo} alt="Site Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8', height: '40px', marginRight: '10px' }} />
                            <span>JRMSU</span>
                        </a>
                        <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                            {/* Left navbar links */}
                            {/* <ul className="navbar-nav responsive-header"> */}
                            <ul className="navbar-nav navbar-header">
                                <li className="nav-item" onClick={() => navigate('/')}>
                                    <a href="#" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</a>
                                </li>
                                <li className="nav-item" onClick={() => navigate('/projects')}>
                                    <a href="#" className={location.pathname === '/projects' ? 'nav-link active' : 'nav-link'}>Projects</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className={location.pathname === '/department' ? 'nav-link dropdown-toggle active' : 'nav-link dropdown-toggle'} >Department</a>
                                    <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow" style={{ left: 0, right: 'inherit' }}>
                                        <li>
                                            <a href="./?page=projects_per_department&id=3" className="dropdown-item">College Of Arts And Sciences</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_department&id=4" className="dropdown-item">College Of Business Management And Accountancy</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_department&id=5" className="dropdown-item">College Of Computer Studies</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_department&id=2" className="dropdown-item">College Of Education</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_department&id=6" className="dropdown-item">College Of Engineering</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_department&id=1" className="dropdown-item">College Of Industrial Technology</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_department&id=7" className="dropdown-item">ColLege Of Maritime</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_department&id=8" className="dropdown-item">College Of Nursing And Allied Services</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className={location.pathname === '/courses' ? 'nav-link dropdown-toggle active' : 'nav-link dropdown-toggle'}>Courses</a>
                                    <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow" style={{ left: 0, right: 'inherit' }}>
                                        <li>
                                            <a href="./?page=projects_per_curriculum&id=3" className="dropdown-item">BEEd</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_curriculum&id=7" className="dropdown-item">BS Computer Engineering</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_curriculum&id=5" className="dropdown-item">BSBA</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_curriculum&id=6" className="dropdown-item">BSCE</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_curriculum&id=2" className="dropdown-item">BSCS</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_curriculum&id=4" className="dropdown-item">BSEd</a>
                                        </li><li className="dropdown-divider" />
                                        <li>
                                            <a href="./?page=projects_per_curriculum&id=1" className="dropdown-item">BSIS</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item" onClick={() => navigate('/about-us')}>
                                    <a href="#" className={location.pathname === '/about-us' ? 'nav-link active' : 'nav-link'}>About Us</a>
                                </li>

                                {isLogin && (
                                    <li className="nav-item" onClick={() => navigate('/submit-project')}>
                                        <a href="#" className={location.pathname === '/submit-project' ? 'nav-link active' : 'nav-link'}>Submit Thesis/Capstone</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                        {/* Right navbar links */}
                        <div className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                            <ImSearch size={20} className='search-bar' onClick={(e) => { e.stopPropagation(); setOnSearch(onSearch ? false : true) }} />
                            <input onClick={(e) => e.stopPropagation()} placeholder='Search...' className='search-input' type="text" style={{ display: onSearch ? 'block' : 'none' }} />
                            <IoMenuSharp onClick={(e) => { e.stopPropagation(); setMenuBar(true) }} className="menu-bar" size={30} />
                        </div>
                    </div>
                </nav>
            </div >

            <div onClick={() => setIsOpenLogin(false)} className='popup' style={{ visibility: isOpenLogin && !isOpenRegister ? 'visible' : 'hidden' }} >

                {/* Register page */}
                <div onClick={(e) => e.stopPropagation()} className='popup-body' style={{ animation: isOpenLogin ? 'dropBottom .3s linear' : '' }} >
                    <div style={{ textAlign: 'center' }}>
                        <h3>Login</h3><br />
                    </div>
                    <div className="modal-close" onClick={() => setIsOpenLogin(false)}>
                        <AiOutlineCloseCircle size={30} />
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className='form-div'>
                            <label htmlFor="">Username</label>
                            <input type="text" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <label htmlFor="">Password</label>
                            <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*********' required />
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <input type="submit" style={{ width: '100%' }} className='btn btn-primary' value="Login" />
                        </div>

                    </form>
                    <div style={{ marginTop: '10px', textAlign: 'center' }} className='forgot-password'>
                        <span>Forgot Password?</span>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <span>Don't Have Account? <a style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={() => { setIsOpenRegister(true); setIsOpenLogin(false) }} >Register</a></span>
                    </div>
                </div>
            </div>

            <div onClick={() => setIsOpenRegister(false)} className='popup' style={{ visibility: isOpenRegister && !isOpenLogin ? 'visible' : 'hidden' }} >

                {/* Register page */}
                <div onClick={(e) => e.stopPropagation()} className='popup-body' style={{ animation: isOpenRegister ? 'dropBottom .3s linear' : '' }} >
                    <div style={{ textAlign: 'center' }}>
                        <h3>Register</h3><br />
                    </div>
                    <div className="modal-close" onClick={() => setIsOpenRegister(false)}>
                        <AiOutlineCloseCircle size={30} />
                    </div>

                    <form onSubmit={handleRegister}>
                        <div className='form-div'>
                            <label htmlFor="">First Name</label>
                            <input type="text" value={registerData.firstName} onChange={(e) => setRegisterData((prev) => ({ ...prev, firstName: e.target.value }))} className='form-control' placeholder='First Name' required />
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <label htmlFor="">Middle Name (Optional)</label>
                            <input type="text" value={registerData.middleName} onChange={(e) => setRegisterData((prev) => ({ ...prev, middleName: e.target.value }))} className='form-control' placeholder='Middle Name' />
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <label htmlFor="">Last Name</label>
                            <input type="text" className='form-control' value={registerData.lastName} onChange={(e) => setRegisterData((prev) => ({ ...prev, lastName: e.target.value }))} placeholder='Last Name' required />
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <label htmlFor="">Username</label>
                            <input type="text" className='form-control' value={registerData.username} onChange={(e) => setRegisterData((prev) => ({ ...prev, username: e.target.value }))} placeholder='Username' required />
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <label htmlFor="">Password</label>
                            <input type="password" className='form-control' value={registerData.password} onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))} placeholder='*********' required />
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <label htmlFor="">Confirm Password</label>
                            <input type="password" className='form-control' value={registerData.confirmPassword} onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))} placeholder='*********' required />
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <input type="submit" style={{ width: '100%' }} className='btn btn-primary' value="Register" />
                        </div>

                    </form>

                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <span>Already have account? <a style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={() => { setIsOpenLogin(true); setIsOpenRegister(false) }} >Login</a></span>
                    </div>
                </div>
            </div>

            <div onClick={() => { setMenuBar(false); setOnSearch(false) }} className='popup' style={{ visibility: menuBar ? 'visible' : 'hidden' }} >
                <aside className="main-sidebar sidebar-dark-primary elevation-4 right-bar-body" onClick={(e) => e.stopPropagation()} style={{ animation: menuBar ? 'slideLeft 0.3s linear' : 'slideRight 0.3s linear' }}>
                    {/* Brand Logo */}
                    <span className="brand-link span-cursor" style={{ width: '190px' }}>
                        <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">{isLogin ? userCredentials && userCredentials.user_type : "JRMSU"}</span>
                    </span>

                    {/* Sidebar */}
                    <div className="sidebar" style={{ height: '100vh', overflow: 'auto' }}>
                        {/* Sidebar user (optional) */}

                        {isLogin && (
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex" style={{cursor: 'pointer'}} onClick={() => setIsProfile(true)}>
                                <div className="image">
                                    <img style={{ width: 34, height: 34 }} src={userCredentials && (userCredentials.image).length > 0 ? `${backendUrl}/${userCredentials.image}` : givenImage} className="img-profile rounded-circle" />
                                </div>
                                <div className="info">
                                    <a href="#" className="d-block" data-toggle="modal" data-target="#profile" style={{ cursor: 'pointer' }}>shelo</a>
                                </div>
                            </div>
                        )}

                        {/* Sidebar Menu */}
                        <nav className="mt-2" style={{ marginLeft: '10px' }}>
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" style={{ paddingRight: '15px' }}>
                                <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                                    <a className={location.pathname === '/' ? 'nav-link hover-side' : 'nav-link'}><AiTwotoneHome size={20} style={{ marginTop: '-3px' }} /> Home</a>
                                </li>

                                <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/projects')}>
                                    <a className={location.pathname === '/projects' ? 'nav-link hover-side' : 'nav-link'}><TbBulbFilled size={20} style={{ marginTop: '-3px' }} /> Projects</a>
                                </li>

                                <li className=" dropdown" style={{ cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', paddingLeft: '15px', padding: '7px' }} className={location.pathname === '/department' ? 'hover-side' : ''}>
                                        <a ><FaThList size={17} style={{ marginTop: '-3px' }} /> Department</a><span><RiArrowDownSLine size={25} /></span>
                                        {/* <span><RiArrowLeftSLine size={25} /></span> */}
                                    </div>
                                    <ul className="nav nav-pills nav-sidebar flex-column">
                                        <li className="nav-item dropdown" style={{ marginLeft: '13px', fontSize: '14px' }}>
                                            <a className='nav-link nav-home'>
                                                {/* <i className="nav-icon"><FaUsers /></i> */}
                                                <p >
                                                    <GoDotFill size={17} style={{ marginTop: '-3px' }} /> College Of Arts And Sciences
                                                </p>
                                            </a>
                                        </li>
                                        <li className="nav-item dropdown" style={{ marginLeft: '13px', fontSize: '14px' }}>
                                            <a className='nav-link nav-home'>
                                                {/* <i className="nav-icon"><FaUsers /></i> */}
                                                <p >
                                                    <GoDotFill size={17} style={{ marginTop: '-3px' }} /> College Of Business Management And Accountancy
                                                </p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className=" dropdown" style={{ cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', paddingLeft: '15px', padding: '7px' }} className={location.pathname === '/courses' ? 'hover-side' : ''}>
                                        <a ><SiCoursera size={20} style={{ marginTop: '-3px' }} /> Courses</a><span><RiArrowDownSLine size={25} /></span>
                                        {/* <span><RiArrowLeftSLine size={25} /></span> */}
                                    </div>
                                    <ul className="nav nav-pills nav-sidebar flex-column">
                                        <li className="nav-item dropdown" style={{ marginLeft: '13px', fontSize: '14px' }}>
                                            <a className='nav-link nav-home'>
                                                {/* <i className="nav-icon"><FaUsers /></i> */}
                                                <p >
                                                    <GoDotFill size={17} style={{ marginTop: '-3px' }} /> Bachelor Of Science In Computer Science
                                                </p>
                                            </a>
                                        </li>
                                        <li className="nav-item dropdown" style={{ marginLeft: '13px', fontSize: '14px' }}>
                                            <a className='nav-link nav-home'>
                                                {/* <i className="nav-icon"><FaUsers /></i> */}
                                                <p >
                                                    <GoDotFill size={17} style={{ marginTop: '-3px' }} /> BSMA
                                                </p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/about-us')}>
                                    <a className={location.pathname === '/about-us' ? 'nav-link hover-side' : 'nav-link'}><BiSolidUserVoice size={20} style={{ marginTop: '-3px' }} /> About Us</a>
                                </li>

                                {isLogin && (
                                    <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/submit-project')}>
                                        <a className={location.pathname === '/submit-project' ? 'nav-link hover-side' : 'nav-link'}><PiUploadBold size={20} style={{ marginTop: '-3px' }} /> Submit Thesis/Capstone</a>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </aside>
            </div>

            {/* Change Password */}
            <div className="popup" style={{ visibility: isChangePassword ? 'visible' : 'hidden' }}>
                <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isChangePassword ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                    <div className="popup-edit">
                        <span>Change Password</span>
                    </div>
                    <hr />
                    <form onSubmit={handleChagePassword}>
                        <div className='form-div'>
                            <label htmlFor="">Username</label>
                            <input type="text" value={changePass.username} onChange={(e) => setChangePass((prev) => ({ ...prev, username: e.target.value }))} className='form-control' placeholder='Username' required />
                        </div>

                        <div style={{ marginTop: '15px' }}>
                            <label htmlFor="">Current Password</label>
                            <input type="password" value={changePass.currentPassword} onChange={(e) => setChangePass((prev) => ({ ...prev, currentPassword: e.target.value }))} className='form-control' placeholder='*********' required />
                        </div>

                        <div style={{ marginTop: '15px' }}>
                            <label htmlFor="">New Password</label>
                            <input type="password" value={changePass.newPassword} onChange={(e) => setChangePass((prev) => ({ ...prev, newPassword: e.target.value }))} className='form-control' placeholder='*********' required />
                        </div>

                        <div style={{ marginTop: '15px' }}>
                            <label htmlFor="">Confirm Password</label>
                            <input type="password" value={changePass.confirmPassword} onChange={(e) => setChangePass((prev) => ({ ...prev, confirmPassword: e.target.value }))} className='form-control' placeholder='*********' required />
                        </div>

                        <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                            <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsChangePassword(false)}>Cancel</button>
                            <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Save</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* -----------------------LOGOUT CONFIRMATION---------------------- */}
            <div className="popup" style={{ visibility: isLogout ? 'visible' : 'hidden' }}>
                <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isLogout ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                    <div className="popup-edit">
                        <h5>Logout?</h5>
                    </div>
                    <hr />
                    <div className='form-div'>
                        <span>Are you sure you wan't to logout?</span>
                    </div>

                    <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                        <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsLogout(false)}>No</button>
                        <button className='btn btn-primary' type='submit' style={{ width: '80px' }} onClick={() => { localStorage.removeItem('token'); navigate('/'); setIsLogout(false) }}>Yes</button>
                    </div>
                </div>
            </div>

            {/* --------   PROFILE ---------- */}
            <div className="popup" onClick={() => setIsProfile(false)} style={{ visibility: isProfile ? 'visible' : 'hidden' }}>
                <div className="popup-body" onClick={(e) => e.stopPropagation()} style={{ animation: isProfile ? 'dropBottom .3s linear' : '' }}>
                    <div className="modal-close" onClick={() => setIsProfile(false)}>
                        <AiOutlineCloseCircle size={30} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <img src={userCredentials && userCredentials.image !== '' ? `${backendUrl}/${userCredentials.image}` : givenImage} style={{ borderRadius: '50%', height: '150px', width: '150px' }} />
                        <label htmlFor="uploadPhoto" style={{ marginLeft: '-40px', cursor: 'pointer', zIndex: '3', color: 'white', position: 'absolute', marginTop: '110px' }}>
                            <VscDeviceCamera size={30} style={{ backgroundColor: 'rgb(71, 71, 98)', padding: '3px', borderRadius: '50%' }} />
                            <input type="file" id="uploadPhoto" onChange={(e) => setAutoImage(e.target.files[0])} style={{ display: 'none' }} />
                        </label>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '20px' }}>{userCredentials && `${userCredentials.first_name} ${userCredentials.middle_name} ${userCredentials.last_name}`}</h2>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <span>{userCredentials && userCredentials.user_type}</span>
                        </div><br />
                    </div>
                    <hr />
                    <div className="form-control" style={{ textAlign: 'center' }}>
                        <span>Other profile view</span>
                    </div>
                </div>
            </div>

            {/* fetching data screen */}
            <div className="popup" style={{ display: isLoading ? 'block' : 'none' }}>
                <div className="modal-pop-up-loading">
                    <div className="modal-pop-up-loading-spiner"></div>
                    <p>Loading...</p>
                </div>
            </div>

            {/* Loading div */}
            <div className='error-respond' style={{ display: isError || isSuccess ? 'block' : 'none', backgroundColor: isSuccess && !isError ? '#7b4ae4' : '#fb7d60' }}>
                <div>
                    <h5>{errorMessage}</h5>
                </div>
            </div>
        </>
    );
}

export default Home
