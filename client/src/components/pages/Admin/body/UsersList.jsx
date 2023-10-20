import React, { useEffect, useState } from 'react'
import axios from 'axios';

// backend URL
import BackendURL from '../../backend url/BackendURL';

// images
import givenImage from '../../../assets/images/given image.png';

// react icons
import { ImSearch } from "react-icons/im";

import { useNavigate } from 'react-router-dom';

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
// chatbot
import Chatbot from '../../chatbot/Chatbot';

function UsersList() {
    const backendUrl = BackendURL();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // --------------------    MOUNT AFTER EXECUTION   ----------------------
    const [userChecker, setUserChecker] = useState(false);

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


    // ------------------------------   FETCH ALL USERS     -----------------------------------
    const [usersAccount, setUsersAccount] = useState([]);
    const [usersAccountSearch, setUsersAccountSearch] = useState('');

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
    }, [userChecker]);

    const usersAccountToSearch = usersAccount.filter(item =>
        item.first_name.toLowerCase().includes(usersAccountSearch.toLowerCase()) ||
        item.middle_name.toLowerCase().includes(usersAccountSearch.toLocaleLowerCase()) ||
        item.last_name.toLowerCase().includes(usersAccountSearch.toLowerCase()) ||
        item.username.toLowerCase().includes(usersAccountSearch.toLowerCase())
    );

    // --------------------------------   EDIT AND DELETE USERS    -------------------------------------
    const [isEditUser, setIsEditUser] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [editUserData, setEditUserData] = useState({
        id: '',
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        userType: ''
    });
    const [deleteUser, setDeleteUser] = useState({
        id: '',
        firstName: '',
        middleName: '',
        lastName: ''
    });

    const handleEdit = async (item) => {
        setIsEditUser(true);
        setEditUserData({
            id: item.id,
            firstName: item.first_name,
            middleName: item.middle_name,
            lastName: item.last_name,
            username: item.username,
            userType: item.user_type
        });
    };

    const handleDelete = async (item) => {
        setIsDelete(true);
        setDeleteUser({
            id: item.id,
            firstName: item.first_name,
            middleName: item.middle_name,
            lastName: item.last_name
        });
    };

    // ------- EDIT ---------
    const buttonEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/edit-user`, { editUserData }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setIsLoading(false);
                setUserChecker(userChecker ? false : true);
                setIsEditUser(false);

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

    // -------  DELETE  ----------
    const buttonDelete = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userId = (userCredentials.id).toString();

        try {
            const response = await axios.post(`${backendUrl}/api/delete-user`, { deleteUser, userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                setUserChecker(userChecker ? false : true);
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
                                <h3 className="card-title" style={{ color: 'darkblue', fontWeight: 'bold' }}>List of Students</h3>
                                <ImSearch size={25} className='search-bar search-right' style={{ marginTop: '0px' }} onClick={() => setOnSearch(onSearch ? false : true)} />
                                <input onClick={(e) => e.stopPropagation()} placeholder='Search...' value={usersAccountSearch} onChange={(e) => setUsersAccountSearch(e.target.value)} className='search-input' type="text" style={{ marginTop: '27px', display: onSearch ? 'block' : 'none' }} />
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
                                                        <th>Avatar</th>
                                                        <th>Name</th>
                                                        <th>Username</th>
                                                        <th>User Type</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {usersAccountToSearch.length === 0 ? (
                                                        <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                            <span>No Student Account found!</span>
                                                        </div>
                                                    ) : (
                                                        usersAccountToSearch.map((item, index) => (
                                                            <tr>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td className="text-center"><img src={`${backendUrl}/${item.image}`} style={{ height: '40px', borderRadius: '50%' }} className="img-avatar img-thumbnail p-0 border-2" alt="user_avatar" /></td>
                                                                <td>{`${item.first_name} ${item.middle_name} ${item.last_name}`}</td>
                                                                <td><p className="m-0 truncate-1">{item.username}</p></td>
                                                                <td><p className="m-0">{item.user_type}</p></td>
                                                                <td align="center">
                                                                    <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                        Action
                                                                        <span className="sr-only">Toggle Dropdown</span>
                                                                    </button>
                                                                    <div className="dropdown-menu" role="menu">
                                                                        <a className="dropdown-item" href="#" onClick={() => handleEdit(item)}><span className="fa fa-edit text-primary" /> Edit</a>
                                                                        <div className="dropdown-divider" />
                                                                        <a className="dropdown-item delete_data" href="#" onClick={() => handleDelete(item)}><span className="fa fa-trash text-danger" /> Delete</a>
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

            {/* -----------------   EDIT User -------------------- */}
            <div className="popup" style={{ display: isEditUser ? 'block' : 'none' }}>
                <div className='department-modal' style={{ animation: isEditUser ? 'animateCenter 0.3s linear' : '' }}>
                    <h5>Edit User</h5>
                    <hr />
                    <div className="container-fluid">
                        <form action id="department-form">
                            <div className="form-group">
                                <label htmlFor="name" className="control-label">First Name</label>
                                <input type="text" className="form-control form-control-border" value={editUserData.firstName} onChange={(e) => setEditUserData((prev) => ({ ...prev, firstName: e.target.value }))} placeholder="First Name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="control-label">Middle Name (Optional)</label>
                                <input type="text" className="form-control form-control-border" value={editUserData.middleName} onChange={(e) => setEditUserData((prev) => ({ ...prev, middleName: e.target.value }))} placeholder="Middle Name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="control-label">Last Name</label>
                                <input type="text" className="form-control form-control-border" value={editUserData.lastName} onChange={(e) => setEditUserData((prev) => ({ ...prev, lastName: e.target.value }))} placeholder="Last Name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="control-label">Username</label>
                                <input type="text" className="form-control form-control-border" value={editUserData.username} onChange={(e) => setEditUserData((prev) => ({ ...prev, username: e.target.value }))} placeholder="Username" required />
                            </div>
                            <div className="form-group" style={{ marginBottom: '30px' }}>
                                <label htmlFor className="control-label">User Type</label>
                                <select name="status" id="status" className="form-control form-control-border" value={editUserData.userType} onChange={(e) => setEditUserData((prev) => ({ ...prev, userType: e.target.value }))} required>
                                    <option value="" selected disabled>Select User Type</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Student">Student</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditUser(false)}>Cancel</button>
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
                        <span>Are you sure you wan't to Delete {`${deleteUser.firstName} ${deleteUser.middleName} ${deleteUser.lastName}`}?</span>
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

export default UsersList
