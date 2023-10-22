import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BackendURL from '../../backend url/BackendURL';
import { useNavigate } from 'react-router-dom';

// images
import jose from '../../../assets/images/jose.jpg';
import logo from '../../../assets/images/logo.png';

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
// chatbot
import Chatbot from '../../chatbot/Chatbot';

function Settings() {
    const backendUrl = BackendURL();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // --------------------    MOUNT AFTER EXECUTION   ----------------------
    const [updateChecker, setUpdateChecker] = useState(false);

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
                                    if (response.data.message[0].user_type !== "Admin") {
                                        navigate('/');
                                    }
                                    else {
                                        setUserCredentials(response.data.message[0]);
                                        setIsLoading(false);
                                    }
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
    }, [token]);

    // --------------------------    UPDATE SETTINGS   --------------------------
    const [settings, setSettings] = useState({
        systemName: '',
        systemShortName: '',
        welcomeContent: '',
        aboutUs: '',
        email: '',
        contactNumber: '',
        address: ''
    });

    const [systemLogo, setSystemLogo] = useState([]);
    const [systemCover, setSystemCover] = useState([]);

    const updateSettings = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/update-settings`, { settings }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setUpdateChecker(updateChecker ? false : true);

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

    useEffect(() => {
        if (systemLogo) {
            const logo = async () => {
                setIsLoading(true);

                const formData = new FormData();
                formData.append('systemLogo', systemLogo);

                try {
                    const response = await axios.post(`${backendUrl}/api/update-logo`, formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.status === 200) {
                        setIsLoading(false);
                        setUpdateChecker(updateChecker ? false : true);

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
            }
            logo();
        }
    }, [systemLogo]);

    useEffect(() => {
        if (systemCover) {
            const cover = async () => {
                setIsLoading(true);

                const formData = new FormData();
                formData.append('systemCover', systemCover);

                try {
                    const response = await axios.post(`${backendUrl}/api/update-cover`, formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.status === 200) {
                        setIsLoading(false);
                        setUpdateChecker(updateChecker ? false : true);

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
            }
            cover();
        }
    }, [systemCover]);

    // --------------------------    FETCH SETTINGS   --------------------------
    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(`${backendUrl}/api/fetch-settings`);

                if (response.status === 200) {
                    setIsLoading(false);
                    setSettings({
                        systemName: response.data.message[0].system_name,
                        systemShortName: response.data.message[0].system_short_name,
                        welcomeContent: response.data.message[0].welcome_content,
                        aboutUs: response.data.message[0].about_us,
                        email: response.data.message[0].email,
                        contactNumber: response.data.message[0].contact_number,
                        address: response.data.message[0].address
                    });
                    setSystemCover(response.data.message[0].system_cover);
                    setSystemLogo(response.data.message[0].system_logo);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
        fetchSettings();
    }, [updateChecker]);


    return (
        <>
            <SideBar />
            <Header />
            {userCredentials && Object.keys(userCredentials).length > 0 && (
                <Chatbot />
            )}

            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6" style={{ width: '100%' }}>
                                {/* <h1 className="m-0">Welcome to Thesis and Capstone Archiving System</h1> */}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content ">
                    <div className="container-fluid">
                        <div className="col-lg-12">
                            <div className="card card-outline card-primary">
                                <div className="card-header">
                                    <h5 className="card-title">System Information</h5>
                                </div>
                                <div className="card-body">
                                    <form action id="system-frm">
                                        <div id="msg" className="form-group" />
                                        <div className="form-group">
                                            <label className="control-label">System Name</label>
                                            <input type="text" className="form-control form-control-sm" value={settings.systemName} onChange={(e) => setSettings((prev) => ({ ...prev, systemName: e.target.value }))} placeholder='System Name' />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">System Short Name</label>
                                            <input type="text" className="form-control form-control-sm" value={settings.systemShortName} onChange={(e) => setSettings((prev) => ({ ...prev, systemShortName: e.target.value }))} placeholder='System Short Name' />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Welcome Content</label>
                                            <textarea cols="30" rows="10" type="text" className="form-control form-control-sm summernote" value={settings.welcomeContent} onChange={(e) => setSettings((prev) => ({ ...prev, welcomeContent: e.target.value }))} placeholder='Write Welcome Message...' />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">About Us</label>
                                            <textarea cols="30" rows="10" type="text" className="form-control form-control-sm summernote" value={settings.aboutUs} onChange={(e) => setSettings((prev) => ({ ...prev, aboutUs: e.target.value }))} placeholder='About...' />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">System Logo</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input rounded-circle" id="customFile" onChange={(e) => setSystemLogo(e.target.files[0])} />
                                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <img src={systemLogo && systemLogo.length > 0 ? `${backendUrl}/${systemLogo}` : logo} alt id="cimg" className="img-fluid img-thumbnail" />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Cover</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input rounded-circle" id="customFile" onChange={(e) => setSystemCover(e.target.files[0])} />
                                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <img src={systemCover && systemCover.length > 0 ? `${backendUrl}/${systemCover}` : jose} alt id="cimg2" className="img-fluid img-thumbnail bg-gradient-dark border-dark" />
                                        </div>
                                        <fieldset>
                                            <legend>School Information</legend>
                                            <div className="form-group">
                                                <label className="control-label" >Email</label>
                                                <input type="email" className="form-control form-control-sm" value={settings.email} onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))} placeholder='System@gmail.com' />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Contact #</label>
                                                <input type="number" className="form-control form-control-sm" value={settings.contactNumber} onChange={(e) => setSettings((prev) => ({ ...prev, contactNumber: e.target.value }))} placeholder='09...' />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Address</label>
                                                <textarea cols="30" rows="3" className="form-control form-control-sm" value={settings.address} onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))} placeholder='Address...' />
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <button className="btn btn-sm btn-primary" onClick={(updateSettings)}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

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
            {isError || isSuccess ? (
                <div className='error-respond' style={{ backgroundColor: isSuccess && !isError ? '#7b4ae4' : '#fb7d60' }}>
                    <div>
                        <h5>{errorMessage}</h5>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Settings
