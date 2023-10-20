import React, { useEffect, useState } from 'react'

import BackendURL from '../../backend url/BackendURL';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
//chatbot
import Chatbot from '../../chatbot/Chatbot';

function SchoolYear() {
    const backendUrl = BackendURL();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [isAddSchoolYear, setIsAddSchoolYear] = useState(false);
    const [isEditSchoolYear, setIsEditSchoolYear] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    // --------------------    MOUNT AFTER EXECUTION   ----------------------
    const [addSchoolYearChecker, setAddSchoolYearChecker] = useState(false);

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

    // -----------------------------------------  ADD SCHOOL YEAR -------------------------------------------------  
    const [schollYearData, setSchoolYearData] = useState({
        name: '',
        status: ''
    });

    const handleAddSchoolYear = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userId = (userCredentials.id).toString();
        const requestToAdd = { schollYearData, userId };

        try {
            const response = await axios.post(`${backendUrl}/api/add-school-year`, requestToAdd, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setAddSchoolYearChecker(addSchoolYearChecker ? false : true);
                setIsAddSchoolYear(false);
                setSchoolYearData({
                    name: '',
                    status: ''
                });

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

    // -----------------------------------------  FETCH SCHOOL YEAR -------------------------------------------------
    const [schoolYearList, setSchoolYearList] = useState([]);
    const [searchSchoolYear, setSearchSchoolYear] = useState('');

    useEffect(() => {
        const fetchSchoolYear = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/api/fetch-school-year`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setIsLoading(false);
                    setSchoolYearList(response.data.message);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
        fetchSchoolYear();
    }, [addSchoolYearChecker]);

    const schoolYearToSearch = schoolYearList.filter(item =>
        item.school_year.toLowerCase().includes(searchSchoolYear.toLowerCase()) ||
        item.status.toLowerCase().includes(searchSchoolYear.toLocaleLowerCase())
    );

    // ------------------------------- EDIT AND DELETE SCHOOL YEAR --------------------------------
    const [editSchoolYearData, setEditSchoolYearData] = useState({
        id: '',
        name: '',
        status: ''
    });
    const [deleteSchoolYear, setDeleteSchoolYear] = useState({
        id: '',
        name: ''
    });

    const handleEditSchoolYear = async (item) => {
        setIsEditSchoolYear(true);
        setEditSchoolYearData({
            id: item.id,
            name: item.school_year,
            status: item.status
        });
    };

    const handleDeleteSchoolYear = async (item) => {
        setDeleteSchoolYear({ id: item.id, name: item.school_year });
        setIsDelete(true);
    }

    // ----------------------  EDIT --------------------------
    const buttonEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/edit-school-year`, { editSchoolYearData }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setAddSchoolYearChecker(addSchoolYearChecker ? false : true);
                setIsEditSchoolYear(false);

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

    // --------------  DELETE  -------------------
    const buttonDelete = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userId = (userCredentials.id).toString();

        try {
            const response = await axios.post(`${backendUrl}/api/delete-school-year`, { deleteSchoolYear, userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setAddSchoolYearChecker(addSchoolYearChecker ? false : true);
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
                            <div className="card-header">
                                <h3 className="card-title">School Year</h3>
                                <div className="card-tools">
                                    <a href="#" className="btn btn-flat btn-sm btn-primary" onClick={() => setIsAddSchoolYear(true)}><span className="fas fa-plus" />  Add New SY</a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="container-fluid" style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                        <table className="table table-hover table-striped">
                                            <colgroup>
                                                <col width="5%" />
                                                <col width="20%" />
                                                <col width="30%" />
                                                <col width="15%" />
                                                <col width="10%" />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date Created</th>
                                                    <th>School Year</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {schoolYearToSearch.length === 0 ? (
                                                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                        <span>No School Year found!</span>
                                                    </div>
                                                ) : (
                                                    schoolYearToSearch.map((item, index) => (
                                                        <tr>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className>{item.date}</td>
                                                            <td>{item.school_year}</td>
                                                            <td >
                                                                <span className="badge badge-success badge-pill" style={{ background: item.status === 'Active' ? '' : 'red' }}>{item.status}</span></td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                    Action
                                                                </button>
                                                                <div className="dropdown-menu" role="menu">
                                                                    <a className="dropdown-item edit_data" href="#" onClick={() => handleEditSchoolYear(item)}><span className="fa fa-edit text-primary" /> Edit</a>
                                                                    <div className="dropdown-divider" />
                                                                    <a className="dropdown-item delete_data" href="#" onClick={() => handleDeleteSchoolYear(item)}><span className="fa fa-trash text-danger" /> Delete</a>
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

                </section>
            </div>

            {/* ------------------  ADD SCHOOL YEAR  --------------------------- */}
            {isAddSchoolYear && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isAddSchoolYear ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Add New School Year</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleAddSchoolYear}>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">School Year</label>
                                    <input type="text" className="form-control form-control-border" value={schollYearData.name} onChange={(e) => setSchoolYearData((prev) => ({ ...prev, name: e.target.value }))} placeholder="School Year" required />
                                </div>
                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label htmlFor className="control-label">Status</label>
                                    <select name="status" id="status" className="form-control form-control-border" value={schollYearData.status} onChange={(e) => setSchoolYearData((prev) => ({ ...prev, status: e.target.value }))} required>
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsAddSchoolYear(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------   EDIT SCHOOL YEAR -------------------- */}
            {isEditSchoolYear && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isEditSchoolYear ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Edit School Year</h5>
                        <hr />
                        <div className="container-fluid">
                            <form action id="department-form">
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">School Year</label>
                                    <input type="text" className="form-control form-control-border" value={editSchoolYearData.name} onChange={(e) => setEditSchoolYearData((prev) => ({ ...prev, name: e.target.value }))} placeholder="School Year" required />
                                </div>
                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label htmlFor className="control-label">Status</label>
                                    <select name="status" id="status" className="form-control form-control-border" required value={editSchoolYearData.status} onChange={(e) => setEditSchoolYearData((prev) => ({ ...prev, status: e.target.value }))}>
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditSchoolYear(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit' onClick={buttonEdit}>Save</button>
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
                            <span>Are you sure you wan't to Delete {`${deleteSchoolYear.name}`}?</span>
                        </div>

                        <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                            <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDelete(false)}>Cancel</button>
                            <button className='btn btn-primary' type='submit' style={{ width: '80px' }} onClick={buttonDelete}>Delete</button>
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
        </>
    )
}

export default SchoolYear
