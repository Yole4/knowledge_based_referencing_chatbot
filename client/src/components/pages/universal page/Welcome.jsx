import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackendURL from '../backend url/BackendURL';

// require home
import Home from '../Home';
// chatbot
import Chatbot from '../chatbot/Chatbot';

function Welcome() {
    const navigate = useNavigate();
    const backendUrl = BackendURL();
    const token = localStorage.getItem('token');

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
                }
            }
            fetchData();
        }
    }, [token]);

    // --------------------------    FETCH SETTINGS   --------------------------
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
    }, []);

    const [coverUrl, setCoverUrl] = useState('');
    useEffect(() => {
        if (systemCover) {
            const url = `${backendUrl}/${systemCover}`;

            // Replace spaces with '%20'
            const re = url.replace(/ /g, '%20');
            setCoverUrl(re);
        }
    }, [systemCover]);
    return (
        <>
            <Home />
            {userCredentials && Object.keys(userCredentials).length > 0 && (
                <Chatbot />
            )}

            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0' }}>
                <div id="header" style={{ backgroundImage: systemCover && coverUrl ? `url(${coverUrl})` : 'none', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center' }} className="shadow mb-4">

                    <div className="d-flex justify-content-center h-100 w-100 align-items-center flex-column px-3">
                        <h1 className="w-100 text-center site-title" style={{ marginBottom: '20px' }}>{settings && settings.systemName}</h1>
                        <a href="#" onClick={() => navigate('/projects')} className="btn btn-lg btn-light rounded-pill explore" id="enrollment"><b>Explore Projects</b></a>
                    </div>
                </div>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="col-lg-12 py-5">
                            <div className="contain-fluid">
                                <div className="card card-outline card-navy shadow rounded-0">
                                    <div className="card-body rounded-0">
                                        <div className="container-fluid">
                                            <h3 className="text-center">Welcome</h3>
                                            <hr />
                                            <div className="welcome-content">
                                                <p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0, textAlign: 'justify' }}>{settings && settings.welcomeContent}</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* fetching data screen */}
            <div className="popup" style={{ display: isLoading ? 'block' : 'none' }}>
                <div className="modal-pop-up-loading">
                    <div className="modal-pop-up-loading-spiner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        </>
    )
}

export default Welcome
