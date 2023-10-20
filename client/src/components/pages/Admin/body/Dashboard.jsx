import React, { useEffect, useState } from 'react';
import axios from 'axios';

// react icons
import { FaThList, FaUsers, FaUsersSlash } from "react-icons/fa";
import { RiNewspaperLine } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import { TbArchiveOff } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import BackendURL from '../../backend url/BackendURL';
import { MdDateRange } from "react-icons/md";

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
// chatbot
import Chatbot from '../../chatbot/Chatbot';

function Dashboard() {
    const backendUrl = BackendURL();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

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

    // ------------------------------   FETCH ALL USERS     -----------------------------------
    const [usersAccount, setUsersAccount] = useState([]);

    useEffect(() => {
        const fetchUsersAccount = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/api/fetch-users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setUsersAccount(response.data.message);
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
        fetchUsersAccount();
    }, []);

    // -----------------------------------------  FETCH DEPARTMENT -------------------------------------------------
    const [departmentList, setDepartmentList] = useState([]);

    useEffect(() => {
        const fetchDepartment = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/api/fetch-department`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setIsLoading(false);
                    setDepartmentList(response.data.message);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
        fetchDepartment();
    }, []);

    // -----------------------------------------  FETCH COURSES -------------------------------------------------
    const [coursesList, setCoursesList] = useState([]);
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
    }, []);

    // -----------------------------------------  FETCH SCHOOL YEAR -------------------------------------------------
    const [schoolYearList, setSchoolYearList] = useState([]);

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
    }, []);

    // -----------------------------------------  FETCH ARCHIVE FILRS -------------------------------------------------
    const [archiveList, setArchiveList] = useState([]);

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
    }, []);

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

                <div style={{ marginLeft: '20px', textAlign: 'center', marginBottom: '20px' }}>
                    <h1 className="m-0">Welcome to Thesis and Capstone Archiving System</h1>
                    <hr />
                </div>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>{departmentList && departmentList.filter(item => item.status === 'Active').length}</h3>
                                        <p>Active Department</p>
                                    </div>
                                    <div className="icon">
                                        <i><FaThList /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/department-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>{coursesList && coursesList.filter(item => item.status === 'Active').length}<sup style={{ fontSize: 20 }}></sup></h3>
                                        <p>Active Courses</p>
                                    </div>
                                    <div className="icon">
                                        <i><RiNewspaperLine /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/curriculumn-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>{schoolYearList && schoolYearList.filter(item => item.status === 'Active').length}</h3>
                                        <p>Active School Year</p>
                                    </div>
                                    <div className="icon">
                                        <i><MdDateRange /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/department-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>0</h3>
                                        <p>Request User</p>
                                    </div>
                                    <div className="icon">
                                        <i><FaUsers /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/student-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>{archiveList && archiveList.filter(item => item.status === 'Published').length}</h3>
                                        <p>Publish Projects</p>
                                    </div>
                                    <div className="icon">
                                        <i><FiArchive /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/archive-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>{archiveList && archiveList.filter(item => item.status === 'UnPublished').length}</h3>
                                        <p>UnPublish Projects</p>
                                    </div>
                                    <div className="icon">
                                        <i><TbArchiveOff /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/archive-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>{usersAccount && usersAccount.length}</h3>
                                        <p>Users</p>
                                    </div>
                                    <div className="icon">
                                        <i><FaUsers /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/users-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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
            </div>
        </>
    )
}

export default Dashboard
