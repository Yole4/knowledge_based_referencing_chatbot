import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackendURL from '../backend url/BackendURL';

// images
import givenImage from '../../assets/images/given image.png';

// react icons  
import { AiTwotoneHome, AiOutlineCloseCircle } from "react-icons/ai";
import { VscDeviceCamera } from "react-icons/vsc";

function Header() {
    const navigate = useNavigate(); // vavigate
    const token = localStorage.getItem('token');

    // get backend URL
    const backendUrl = BackendURL();

    const [isChangePassword, setIsChangePassword] = useState(false); // change password modal
    const [isProfile, setIsProfile] = useState(false); // profile modal
    const [isLogout, setIsLogout] = useState(false);

    // --------------------    MOUNT AFTER EXECUTION   ----------------------
    const [autoFetchChecker, setAutoFetchChecker] = useState(false);
    const [autoFetchNotification, setAutoFetchNotification] = useState(false);

    // -------------- Loading List ----------
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
                                    setAutoFetchNotification(autoFetchNotification ? false : true);
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

    // ------------------------- FETCH NOTIFICATIONS -------------------------------------
    const [myNotifications, setMyNotifications] = useState([]);

    useEffect(() => {
        if (userCredentials) {
            const getNotification = async () => {
                setIsLoading(true);
                const userId = userCredentials && (userCredentials.id).toString();

                try {
                    const response = await axios.post(`${backendUrl}/api/fetch-notifications`, { userId }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setMyNotifications(response.data.message);
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.log('error!');
                    setIsLoading(false);
                }
            };
            getNotification();
        }
    }, [autoFetchNotification]);

    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-primary navbar-dark bg-navy">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block" onClick={() => navigate('/')}>
                        <span style={{ cursor: 'pointer' }} className="nav-link">Home</span>
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
                    {/* Notifications Dropdown Menu */}
                    {/* // ================================================================= NOTIFICATION =============================================================================== */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="far fa-bell" />
                            <span className="badge badge-warning navbar-badge">{myNotifications && myNotifications.length}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">{myNotifications && myNotifications.length} Notification</span>


                            <div style={{ height: '400px', overflow: 'auto' }}>
                                {myNotifications && myNotifications.reverse().map(item => (
                                    <div key={item.id} className='dropdown-item other' style={{ fontSize: '12px', cursor: 'pointer', backgroundColor: item.seen === 0 ? 'rgba(131, 131, 131, 0.20)' : '' }}>
                                        <div style={{ display: 'flex' }}>
                                            <i className="fas fa-bell mr-2" style={{ color: 'rgba(80, 66, 66, 0.935)', fontSize: '15px', marginTop: '5px' }} /><p style={{ marginLeft: '10px' }}>{item.content}</p>
                                        </div>
                                        <div style={{ marginLeft: '10px' }}>
                                            <p style={{ marginLeft: 22, fontSize: 10, color: 'rgb(105, 96, 96)' }}>{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="dropdown-divider" />
                            <a data-toggle="modal" data-target="#allNotification" style={{ cursor: 'pointer' }} className="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>

                    {/* Admin Profile */}
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userCredentials && `${userCredentials.first_name} ${userCredentials.middle_name} ${userCredentials.last_name}`}</span>
                            <img style={{ width: 25, height: 25 }} className="img-profile rounded-circle" src={userCredentials && (userCredentials.image).length > 0 ? `${backendUrl}/${userCredentials.image}` : givenImage} />
                        </a>

                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a className="dropdown-item" data-toggle="modal" data-target="#profile" style={{ cursor: 'pointer' }} onClick={() => setIsProfile(true)}><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                Profile
                            </a>
                            <a className="dropdown-item" onClick={() => navigate('/')} data-toggle="modal" style={{ cursor: 'pointer' }}><i className="fa-sm fa-fw mr-2 text-gray-400" ><AiTwotoneHome size={18} style={{ color: 'black', marginTop: '-3px' }} /></i>
                                Home
                            </a>
                            <a className="dropdown-item" data-toggle="modal" onClick={() => setIsChangePassword(true)} data-target="#change_password" style={{ cursor: 'pointer' }}><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                Change Password
                            </a>
                            <a className="dropdown-item" data-toggle="modal" data-target="#logout" style={{ cursor: 'pointer' }} onClick={() => setIsLogout(true)}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>

            {/* Change Password */}
            {isChangePassword && (
                <div className="popup">
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
            )}

            {/* -----------------------LOGOUT CONFIRMATION---------------------- */}
            {isLogout && (
                <div className="popup">
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
            )}

            {/* --------   PROFILE ---------- */}
            {isProfile && (
                <div className="popup" onClick={() => setIsProfile(false)}>
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
            )}

            {/* fetching data screen */}
            {isLoading && (
                <div className="popup">
                    <div className="modal-pop-up-loading">
                        <div className="modal-pop-up-loading-spiner"></div>
                        <p>Loading...</p>
                    </div>
                </div>
            )}

            {/* Loading div */}
            {isError || isSuccess && (
                <div className='error-respond' style={{ backgroundColor: isSuccess && !isError ? '#7b4ae4' : '#fb7d60' }}>
                    <div>
                        <h5>{errorMessage}</h5>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header
