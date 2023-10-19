import React, { useEffect, useState } from 'react';

// icon list
import { ImSearch } from "react-icons/im";
import BackendURL from '../../backend url/BackendURL';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        item.course.toLowerCase().includes(searchArchive.toLocaleLowerCase()) ||
        item.status.toLowerCase().includes(searchArchive.toLocaleLowerCase())
    );

    return (
        <>
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
                                <ImSearch size={25} className='search-bar search-right' style={{marginTop: '0px'}} onClick={() => setOnSearch(onSearch ? false : true)} />
                                <input onClick={(e) => e.stopPropagation()} placeholder='Search...' value={searchArchive} onChange={(e) => setSearchArchive(e.target.value)} className='search-input' type="text" style={{marginTop: '27px', display: onSearch ? 'block' : 'none'}}/>
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
                                                                    <span class='badge badge-success badge-pill'>{item.status}</span>
                                                                </td>
                                                                <td align="center">
                                                                    <button type="button" class="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                        Action
                                                                    </button>
                                                                    <div class="dropdown-menu" role="menu">
                                                                        <a class="dropdown-item" href="http://localhost/otas//?page=view_archive&id=3" target="_blank"><span class="fa fa-external-link-alt text-gray"></span> View</a>
                                                                        <div class="dropdown-divider"></div>
                                                                        <a class="dropdown-item update_status" onClick={() => setIsEditArchive(true)}><span class="fa fa-check text-dark"></span> Update Status</a>
                                                                        <div class="dropdown-divider"></div>
                                                                        <a class="dropdown-item delete_data" onClick={() => setIsDelete(true)}><span class="fa fa-trash text-danger"></span> Delete</a>
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
            <div className="popup" style={{ display: isEditArchive ? 'block' : 'none' }}>
                <div className='department-modal' style={{ animation: isEditArchive ? 'animateCenter 0.3s linear' : '' }}>
                    <h5>Edit Status</h5>
                    <hr />
                    <div className="container-fluid">
                        <form >
                            <div className="form-group" style={{ marginBottom: '30px' }}>
                                <label htmlFor className="control-label">Status</label>
                                <select name="status" id="status" className="form-control form-control-border" required>
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

            {/* -----------------------DELETE CONFIRMATION---------------------- */}
            <div className="popup" style={{ visibility: isDelete ? 'visible' : 'hidden' }}>
                <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isDelete ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                    <div className="popup-edit">
                        <h5>Delete?</h5>
                    </div>
                    <hr />
                    <div className='form-div'>
                        <span>Are you sure you wan't to Delete (project name)?</span>
                    </div>

                    <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                        <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDelete(false)}>Cancel</button>
                        <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Delete</button>
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
    )
}

export default ArchiveList
