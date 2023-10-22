import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// backend URL
import BackendURL from '../../backend url/BackendURL';

// icon list
import { BiSearch } from "react-icons/bi";

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
// chatbot
import Chatbot from '../../chatbot/Chatbot';

function StudentList() {
    const backendUrl = BackendURL();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // -------------- Loading List ----------
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // -----    MOUND AFTER EXECUTION ----------------
    const [requestChecker, setRequestChecker] = useState(false);

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

    // ----------------------------------- FETCH ALL REQUEST USER -----------------------------------------
    const [requestedUsers, setRequestedUsers] = useState([]);
    const [searchRequestedUsers, setSearchRequestedUsers] = useState('');

    useEffect(() => {
        const fetchRequest = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(`${backendUrl}/api/fetch-request-user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setIsLoading(false);
                    setRequestedUsers(response.data.message);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchRequest();
    }, [requestChecker]);

    const requestedUsersToSearch = requestedUsers.filter(item =>
        item.first_name.toLowerCase().includes(searchRequestedUsers.toLowerCase()) ||
        item.middle_name.toLowerCase().includes(searchRequestedUsers.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchRequestedUsers.toLowerCase()) ||
        item.project_title.toLowerCase().includes(searchRequestedUsers.toLowerCase())
    );

    // ------------------------------  ACCEPT REQUEST  ---------------------

    const handleAccept = async (item) => {
        let currentStatus = '';
        if (item.status === "Approved"){
            currentStatus = 'Pending';
        }else{
            currentStatus = "Approved";
        }

        const fullname = `${item.first_name} ${item.middle_name} ${item.last_name}`;
        const projectTitle = item.project_title;
        const acceptId = (item.id).toString();
        const userId = (userCredentials.id).toString();
        const userRequestId = (item.user_request_id).toString();

        setIsLoading(false);

        try {
            const response = await axios.post(`${backendUrl}/api/accept-request`, { acceptId, userId, userRequestId, currentStatus, fullname, projectTitle }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setErrorMessage(response.data.message);
                setIsSuccess(true);
                setRequestChecker(requestChecker ? false : true);

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
                        <style dangerouslySetInnerHTML={{ __html: "\n .img-avatar {\n  width: 45px;\n height: 45px;\n object-fit: cover;\n object-position: center center;\n  border-radius: 100%;\n }\n                    " }} />
                        <div className="card card-outline card-primary">
                            <div className="card-header" style={{ display: 'flex' }}>
                                <h3 className="card-title" style={{ color: 'darkblue', fontWeight: 'bold' }}>Request Student</h3>
                                <input className="form-control " type="search" value={searchRequestedUsers} onChange={(e) => setSearchRequestedUsers(e.target.value)} placeholder="Search" aria-label="Search" style={{ width: '200px', paddingLeft: '28px', position: 'absolute', right: '15px', height: '30px', marginTop: '-5px' }} />
                                <BiSearch size={20} style={{ position: 'absolute', right: '190px' }} />
                            </div>
                            <div className="card-body" style={{ height: 'auto' }}>
                                <div className="container-fluid">
                                    <div className="container-fluid">
                                        <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                            <table className="table table-hover table-striped">
                                                <colgroup>
                                                    <col width="3%" />
                                                    <col width="10%" />
                                                    <col width="20%" />
                                                    <col width="52%" />
                                                    <col width="10%" />
                                                    <col width="5%" />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Avatar</th>
                                                        <th>Name</th>
                                                        <th>Project Title</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {requestedUsersToSearch.length === 0 ? (
                                                        <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                            <span>No Requested found!</span>
                                                        </div>
                                                    ) : (
                                                        requestedUsersToSearch.map((item, index) => (
                                                            <tr>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td className="text-center"><img src={`${backendUrl}/${item.image}`} style={{ height: '40px', width: '40px', borderRadius: '50%' }} className="img-avatar img-thumbnail p-0 border-2" alt="user_avatar" /></td>
                                                                <td>{`${item.first_name} ${item.middle_name} ${item.last_name}`}</td>
                                                                <td><p className="m-0 truncate-1">{item.project_title}</p></td>
                                                                <td >
                                                                    <span className="badge badge-success badge-pill" style={{ background: item.status === 'Approved' ? '' : 'red' }}>{item.status}</span></td>
                                                                <td align="center">
                                                                    <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                        Action
                                                                        <span className="sr-only">Toggle Dropdown</span>
                                                                    </button>
                                                                    <div className="dropdown-menu" role="menu">
                                                                        <a class="dropdown-item" onClick={() => navigate(`/view-project/${1000 + item.project_id}`)} style={{ cursor: 'pointer' }}><span class="fa fa-external-link-alt text-gray"></span> View</a>
                                                                        <div class="dropdown-divider"></div>
                                                                        <a class="dropdown-item update_status" style={{ cursor: 'pointer' }} onClick={() => handleAccept(item)} ><span class="fa fa-check text-dark"></span>{item.status === "Approved" ? ' Decline' : ' Accept'}</a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>

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

export default StudentList
