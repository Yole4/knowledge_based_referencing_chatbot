import React, { useEffect, useState } from 'react';

// icon list
import { ImSearch } from "react-icons/im";
import BackendURL from '../../backend url/BackendURL';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
// chatbot
import Chatbot from '../../chatbot/Chatbot';

function ArchiveList() {
    const backendUrl = BackendURL();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [isEditArchive, setIsEditArchive] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    // --------------------    MOUNT AFTER EXECUTION   ----------------------
    const [autoFetchChecker, setAutoFetchChecker] = useState(false);

    // -------------- Loading List ----------
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [onSearch, setOnSearch] = useState(false);

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

    // -----------------------------------------  FETCH ARCHIVE FILRS -------------------------------------------------
    const [editArchiveChecker, setEditArchiveChecker] = useState(false);
    const [archiveList, setArchiveList] = useState([]);
    const [searchArchive, setSearchArchive] = useState('');

    useEffect(() => {
        const fetchArchives = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/api/fetch-archive-files`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setIsLoading(false);
                    setArchiveList(response.data.message);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
        fetchArchives();
    }, [editArchiveChecker]);

    const archiveToSearch = archiveList.filter(item =>
        item.project_title.toLowerCase().includes(searchArchive.toLowerCase()) ||
        item.course.toLowerCase().includes(searchArchive.toLowerCase()) ||
        item.status.toLowerCase().includes(searchArchive.toLowerCase())
    );

    // --------------------------- EDIT AND DELETE ARCHIVE FILE ------------------------------
    const [editArchiveData, setEditArchiveData] = useState({
        id: '',
        status: '',
        projectTitle: ''
    });

    const buttonEditArchive = async (item) => {
        setEditArchiveData({
            id: item.id,
            status: item.status,
            projectTitle: item.project_title
        });
        setIsEditArchive(true)
    }

    const buttonDeleteArchive = async (item) => {
        setEditArchiveData({
            id: item.id,
            status: item.status,
            projectTitle: item.project_title
        });
        setIsDelete(true)
    };

    // edit
    const handleEditArchive = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/edit-archive-file`, { editArchiveData }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setEditArchiveChecker(editArchiveChecker ? false : true);
                setIsEditArchive(false);

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

    // delete
    const handleDeleteArchive = async (e) => {
        e.preventDefault();

        const userId = (userCredentials.id).toString();
        try {
            const response = await axios.post(`${backendUrl}/api/delete-archive-file`, { editArchiveData, userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setEditArchiveChecker(editArchiveChecker ? false : true);
                setIsDelete(false);

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
                        <div className="card card-outline card-primary">
                            <div className="card-header" style={{ display: 'flex' }}>
                                <h3 className="card-title" style={{ color: 'darkblue', fontWeight: 'bold' }}>List of Thesis & Capstone Archives</h3>
                                <ImSearch size={25} className='search-bar search-right' style={{ marginTop: '0px' }} onClick={() => setOnSearch(onSearch ? false : true)} />
                                <input onClick={(e) => e.stopPropagation()} placeholder='Search...' value={searchArchive} onChange={(e) => setSearchArchive(e.target.value)} className='search-input' type="text" style={{ marginTop: '27px', display: onSearch ? 'block' : 'none' }} />
                            </div>
                            <div className="card-body" style={{ height: 'auto' }}>
                                <div className="container-fluid">
                                    <div className="container-fluid">
                                        <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                            <table className="table table-hover table-striped">
                                                <colgroup>
                                                    <col width="5%" />
                                                    <col width="15%" />
                                                    <col width="20%" />
                                                    <col width="20%" />
                                                    <col width="10%" />
                                                    <col width="10%" />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Date Created</th>
                                                        <th>Project Title</th>
                                                        <th>Course</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {archiveToSearch.length === 0 ? (
                                                        <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                            <span>No Archive found!</span>
                                                        </div>
                                                    ) : (
                                                        archiveToSearch.map((item, index) => (
                                                            <tr key={item.id}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td>{item.date}</td>
                                                                <td>{item.project_title}</td>
                                                                <td>{item.course}</td>
                                                                <td class="text-center">
                                                                    <span class='badge badge-success badge-pill' style={{ background: item.status === "Published" ? '' : 'red' }}>{item.status}</span>
                                                                </td>
                                                                <td align="center">
                                                                    <button type="button" class="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                        Action
                                                                    </button>
                                                                    <div class="dropdown-menu" role="menu">
                                                                        <a class="dropdown-item" onClick={() => navigate(`/view-project/${1000 + item.id}`)} style={{ cursor: 'pointer' }}><span class="fa fa-external-link-alt text-gray"></span> View</a>
                                                                        <div class="dropdown-divider"></div>
                                                                        <a class="dropdown-item update_status" style={{ cursor: 'pointer' }} onClick={() => buttonEditArchive(item)}><span class="fa fa-check text-dark"></span> Update Status</a>
                                                                        <div class="dropdown-divider"></div>
                                                                        <a class="dropdown-item delete_data" style={{ cursor: 'pointer' }} onClick={() => buttonDeleteArchive(item)}><span class="fa fa-trash text-danger"></span> Delete</a>
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

            {/* ==============  EDIT ARCHIVE ================== */}
            {isEditArchive && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isEditArchive ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Edit Status</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleEditArchive}>
                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label htmlFor className="control-label">Status</label>
                                    <select name="status" id="status" className="form-control form-control-border" value={editArchiveData.status} onChange={(e) => setEditArchiveData((prev) => ({ ...prev, status: e.target.value }))} required>
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="Published">Published</option>
                                        <option value="UnPublish">UnPublish</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditArchive(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------------DELETE CONFIRMATION---------------------- */}
            {isDelete && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isDelete ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Delete?</h5>
                        </div>
                        <hr />
                        <div className='form-div'>
                            <span>Are you sure you wan't to Delete {editArchiveData.projectTitle}?</span>
                        </div>

                        <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                            <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDelete(false)}>Cancel</button>
                            <button className='btn btn-primary' type='submit' style={{ width: '80px' }} onClick={handleDeleteArchive}>Delete</button>
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

export default ArchiveList
