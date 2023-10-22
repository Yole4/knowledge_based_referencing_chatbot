import React, { useEffect, useState } from 'react'

// images
import archive3 from '../../assets/images/archive-3.png';
import archive1 from '../../assets/images/archive-1.png';
import BackendURL from '../backend url/BackendURL';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// require home
import Home from '../Home';
// chatbot
import Chatbot from '../chatbot/Chatbot';

function Projects() {
    const backendUrl = BackendURL();
    const navigate = useNavigate();

    // -------------- Loading List ----------
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');

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
    const [archiveList, setArchiveList] = useState([]);

    useEffect(() => {
        const fetchArchives = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/api/fetch-archive-files/public`);

                if (response.status === 200) {
                    setIsLoading(false);
                    setArchiveList(response.data.message);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
        fetchArchives();
    }, []);

    return (
        <>
            <Home />
            {userCredentials && Object.keys(userCredentials).length > 0 && (
                <Chatbot />
            )}
            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0' }}>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="content py-2">
                            <div className="col-12">
                                <div className="card card-outline card-primary shadow rounded-0">
                                    <div className="card-body rounded-0">
                                        <h2>Archive List</h2>
                                        {/* <h2>Archive List <span>College of computing studies</span></h2> */}
                                        {/* <p><small>Develop creative innovators with the confidence and courage to seize and transform opportunities for the benefit of the society.</small></p> */}
                                        <hr className="bg-navy" />
                                        <div className="list-group">
                                            {archiveList && archiveList.map(item => (
                                                <div onClick={() => navigate(`/view-project/${1000 + item.id}`)} className="text-decoration-none text-dark list-group-item list-group-item-action" style={{ cursor: 'pointer' }}>
                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-5 col-sm-12 text-center">
                                                            <img src={`${backendUrl}/${item.image_banner}`} className="banner-img img-fluid bg-gradient-dark" alt="Banner Image" />
                                                        </div>
                                                        <div className="col-lg-8 col-md-7 col-sm-12">
                                                            <h3 className="text-navy"><b>{item.project_title}</b></h3>
                                                            <small className="text-muted">By <b className="text-info">{item.members}</b></small>
                                                            <p className="truncate">{(item.abstract).slice(0, 480) + '...'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="card-footer clearfix rounded-0">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-md-6"><span className="text-muted">Display Items: 3</span></div>
                                                <div className="col-md-6">
                                                    <ul className="pagination pagination-sm m-0 float-right">
                                                        <li className="page-item"><a className="page-link" href="./?page=projects&p=0" disabled>«</a></li>
                                                        <li className="page-item"><a className="page-link active" href="./?page=projects&p=1">1</a></li>
                                                        <li className="page-item"><a className="page-link" href="./?page=projects&p=2" disabled>»</a></li>
                                                    </ul>
                                                </div>
                                            </div>
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
        </>
    )
}

export default Projects
