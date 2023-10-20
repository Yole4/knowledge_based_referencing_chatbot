import React, { useEffect, useState } from 'react'

// require Home
import Home from '../Home'
// chatbot
import Chatbot from '../chatbot/Chatbot';

import BackendURL from '../backend url/BackendURL';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// pdf viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function ViewProject() {
    const backendUrl = BackendURL();
    const projectId = useParams();
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

    // -----------------------------------------  FETCH ARCHIVE FILRS -------------------------------------------------
    const archiveId = parseInt(projectId.id) - 1000;
    const [archiveList, setArchiveList] = useState([]);

    useEffect(() => {
        if (userCredentials && Object.keys(userCredentials).length > 0) {
            const fetchArchives = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`${backendUrl}/api/admin-each-files/public/${archiveId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.status === 200) {
                        setIsLoading(false);
                        setArchiveList(response.data.message[0]);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log(error);
                }
            }
            fetchArchives();
        }
        else {
            const fetchArchives = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`${backendUrl}/api/fetch-each-files/public/${archiveId}`);

                    if (response.status === 200) {
                        setIsLoading(false);
                        setArchiveList(response.data.message[0]);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log(error);
                }
            }
            fetchArchives();
        }
    }, [userCredentials]);


    return (
        <>
            <Home />
            {userCredentials && Object.keys(userCredentials).length > 0 && (
                <Chatbot />
            )}

            <section className="content ">
                <div className="container">
                    <div className="content py-4">
                        <div className="col-12">
                            <div className="card card-outline card-primary shadow rounded-0">
                                {/* <div className="card-header">
                                    <h3 className="card-title">
                                        Archive - 2021120003              </h3>
                                </div> */}
                                <div className="card-body rounded-0">
                                    {Object.keys(archiveList).length > 0 ? (
                                        <div className="container-fluid">
                                            <h2><b>{archiveList && archiveList.project_title}</b></h2>
                                            <small className="text-muted">Submitted by <b className="text-info">Admin</b> {archiveList && archiveList.date}</small>
                                            <hr />
                                            <center>
                                                <img src={archiveList && `${backendUrl}/${archiveList.image_banner}`} alt="Banner Image" id="banner-img" className="img-fluid border bg-gradient-dark" />
                                            </center>
                                            <fieldset>
                                                <legend className="text-navy">Project School Year:</legend>
                                                <div className="pl-4"><large>{archiveList && archiveList.school_year}</large></div>
                                            </fieldset>
                                            <fieldset>
                                                <legend className="text-navy">Abstract:</legend>
                                                <div className="pl-4"><large><p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0 }}>{archiveList && archiveList.abstract}</p></large></div>
                                            </fieldset>
                                            <fieldset>
                                                <legend className="text-navy">Members:</legend>
                                                <div className="pl-4"><large><p><b>Researchers</b></p>
                                                    <ul>
                                                        {archiveList && archiveList.members && archiveList.members.split(',').map((item, index) => (
                                                            <li key={index}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </large>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                {userCredentials && userCredentials.user_type === "Admin" ? (
                                                    <>
                                                        <legend className="text-navy">Project Document:</legend>
                                                        <div className="pl-4">
                                                            <iframe src={archiveList && `${backendUrl}/${archiveList.file_path}`} style={{ minHeight: '80vh' }} className="text-center w-100">Loading Document ...</iframe>
                                                        </div>
                                                    </>
                                                ) : userCredentials && userCredentials.user_type === "Student" ? (
                                                    <div style={{ textAlign: 'center', margin: '10px' }}>
                                                        <button style={{ padding: '10px' }} className='btn btn-primary' onClick={() => alert('Access request not yet!')}>Request To View Document</button>
                                                    </div>
                                                ) : (
                                                    <div style={{ textAlign: 'center', margin: '10px' }}>
                                                        <button style={{ padding: '10px' }} className='btn btn-primary' onClick={() => alert('You need to login for you to request!')}>Request To View Document</button>
                                                    </div>
                                                )}
                                            </fieldset>
                                        </div>
                                    ) : (
                                        <span>No archive list found!</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

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

export default ViewProject
