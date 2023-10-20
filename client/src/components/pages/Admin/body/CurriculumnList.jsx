import React, { useEffect, useState } from 'react'

import BackendURL from '../../backend url/BackendURL';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
// chatbot
import Chatbot from '../../chatbot/Chatbot';

function CurriculumnList() {
    const backendUrl = BackendURL();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [isAddCourses, setIsAddCourses] = useState(false);
    const [isEditCourses, setIsEditCourses] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    // --------------------    MOUNT AFTER EXECUTION   ----------------------
    const [addCoursesChecker, setAddCoursesChecker] = useState(false);

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

    // -----------------------------------------  ADD Courses -------------------------------------------------  
    const [courseData, setCoursesData] = useState({
        name: '',
        status: '',
        acronym: ''
    });

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userId = (userCredentials.id).toString();
        const requestToAdd = { courseData, userId };

        try {
            const response = await axios.post(`${backendUrl}/api/add-courses`, requestToAdd, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setAddCoursesChecker(addCoursesChecker ? false : true);
                setIsAddCourses(false);
                setCoursesData({
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

    // -----------------------------------------  FETCH COURSES -------------------------------------------------
    const [coursesList, setCoursesList] = useState([]);
    const [searchCourses, setSearchCourses] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/api/fetch-courses`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setIsLoading(false);
                    setCoursesList(response.data.message);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
        fetchCourses();
    }, [addCoursesChecker]);

    const coursesToSearch = coursesList.filter(item =>
        item.course.toLowerCase().includes(searchCourses.toLowerCase()) ||
        item.status.toLowerCase().includes(searchCourses.toLocaleLowerCase())
    );

    // ------------------------------- EDIT AND DELETE COURSES --------------------------------
    const [editCourseData, setEditCourseData] = useState({
        id: '',
        name: '',
        status: ''
    });
    const [deleteCourses, setDeleteCourses] = useState({
        id: '',
        name: ''
    });

    const handleEditCourses = async (item) => {
        setIsEditCourses(true);
        setEditCourseData({
            id: item.id,
            name: item.course,
            status: item.status
        });
    };

    const handleDeleteCourse = async (item) => {
        setDeleteCourses({ id: item.id, name: item.course });
        setIsDelete(true);
    }

    // ----------------------  EDIT --------------------------
    const buttonEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/edit-courses`, { editCourseData }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setAddCoursesChecker(addCoursesChecker ? false : true);
                setIsEditCourses(false);

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
            const response = await axios.post(`${backendUrl}/api/delete-courses`, { deleteCourses, userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setAddCoursesChecker(addCoursesChecker ? false : true);
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
                                <h3 className="card-title">Courses</h3>
                                <div className="card-tools">
                                    <a href="#" className="btn btn-flat btn-sm btn-primary" onClick={() => setIsAddCourses(true)}><span className="fas fa-plus" />  Add New Course</a>
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
                                                    <th>Course</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {coursesToSearch.length === 0 ? (
                                                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                        <span>No Course found!</span>
                                                    </div>
                                                ) : (
                                                    coursesToSearch.map((item, index) => (
                                                        <tr>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className>{item.date}</td>
                                                            <td>{item.course}</td>
                                                            <td >
                                                                <span className="badge badge-success badge-pill" style={{ background: item.status === 'Active' ? '' : 'red' }}>{item.status}</span></td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                    Action
                                                                </button>
                                                                <div className="dropdown-menu" role="menu">
                                                                    <a className="dropdown-item edit_data" href="#" onClick={() => handleEditCourses(item)}><span className="fa fa-edit text-primary" /> Edit</a>
                                                                    <div className="dropdown-divider" />
                                                                    <a className="dropdown-item delete_data" href="#" onClick={() => handleDeleteCourse(item)}><span className="fa fa-trash text-danger" /> Delete</a>
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

            {/* ------------------  ADD COURSE  --------------------------- */}
            <div className="popup" style={{ display: isAddCourses ? 'block' : 'none' }}>
                <div className='department-modal' style={{ animation: isAddCourses ? 'animateCenter 0.3s linear' : '' }}>
                    <h5>Add New Course</h5>
                    <hr />
                    <div className="container-fluid">
                        <form onSubmit={handleAddCourse}>
                            <div className="form-group">
                                <label htmlFor="name" className="control-label">Course</label>
                                <input type="text" className="form-control form-control-border" value={courseData.name} onChange={(e) => setCoursesData((prev) => ({ ...prev, name: e.target.value }))} placeholder="e.g. Bachelor of Science in Computer Science" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="control-label">Acronym</label>
                                <input type="text" className="form-control form-control-border" value={courseData.acronym} onChange={(e) => setCoursesData((prev) => ({ ...prev, acronym: e.target.value }))} placeholder="e.g. BSCS" required />
                            </div>
                            <div className="form-group" style={{ marginBottom: '30px' }}>
                                <label htmlFor className="control-label">Status</label>
                                <select name="status" id="status" className="form-control form-control-border" value={courseData.status} onChange={(e) => setCoursesData((prev) => ({ ...prev, status: e.target.value }))} required>
                                    <option value="" selected disabled>Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsAddCourses(false)}>Cancel</button>
                                <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* -----------------   EDIT COURSES -------------------- */}
            <div className="popup" style={{ display: isEditCourses ? 'block' : 'none' }}>
                <div className='department-modal' style={{ animation: isEditCourses ? 'animateCenter 0.3s linear' : '' }}>
                    <h5>Edit Course</h5>
                    <hr />
                    <div className="container-fluid">
                        <form action id="department-form">
                            <div className="form-group">
                                <label htmlFor="name" className="control-label">Course</label>
                                <input type="text" className="form-control form-control-border" value={editCourseData.name} onChange={(e) => setEditCourseData((prev) => ({ ...prev, name: e.target.value }))} placeholder="Course Name" required />
                            </div>
                            <div className="form-group" style={{ marginBottom: '30px' }}>
                                <label htmlFor className="control-label">Status</label>
                                <select name="status" id="status" className="form-control form-control-border" required value={editCourseData.status} onChange={(e) => setEditCourseData((prev) => ({ ...prev, status: e.target.value }))}>
                                    <option value="" selected disabled>Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditCourses(false)}>Cancel</button>
                                <button className='btn btn-primary' style={{ width: '100px' }} type='submit' onClick={buttonEdit}>Save</button>
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
                        <span>Are you sure you wan't to Delete {`${deleteCourses.name}`}?</span>
                    </div>

                    <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                        <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDelete(false)}>Cancel</button>
                        <button className='btn btn-primary' type='submit' style={{ width: '80px' }} onClick={buttonDelete}>Delete</button>
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

export default CurriculumnList
