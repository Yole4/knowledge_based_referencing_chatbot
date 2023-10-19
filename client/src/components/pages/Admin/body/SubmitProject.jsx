import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BackendURL from '../../backend url/BackendURL';

// images
import givenImage from '../../../assets/images/given image.png';
import { useNavigate } from 'react-router-dom';

function SubmitProject() {
    const backendUrl = BackendURL();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // image preview
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSubmitThesisAndCapstone({
                    ...submitThesisAndCapstone,
                    bannerImage: selectedImage,
                });
                setImagePreview(e.target.result);
            };

            reader.readAsDataURL(selectedImage);
        }
    };

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

    // ------------------------------------------- HANDLE SUBMIT ----------------------------------------------
    const [archiveFile, setArchiveFile] = useState(null);
    const [submitThesisAndCapstone, setSubmitThesisAndCapstone] = useState({
        foundAbstract: '',
        pageNumber: '',
        fileName: '',
        department: '',
        course: '',
        schoolYear: '',
        projectTitle: '',
        members: '',
        bannerImage: null
    });

    // ------- get the abstract -----------
    useEffect(() => {
        if (archiveFile) {
            setIsLoading(true);
            const requestAbstract = async () => {
                const data = new FormData();
                data.append('archiveFile', archiveFile);

                try {
                    const response = await axios.post(`${backendUrl}/api/scan-document`, data, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setSubmitThesisAndCapstone((prev) => ({ ...prev, foundAbstract: response.data.foundAbstract }));
                        setSubmitThesisAndCapstone((prev) => ({ ...prev, pageNumber: response.data.pageNumber }));
                        setSubmitThesisAndCapstone((prev) => ({ ...prev, fileName: response.data.fileName }));
                        setIsLoading(false);
                    }
                } catch (error) {
                    setIsLoading(false);
                    setSubmitThesisAndCapstone((prev) => ({ ...prev, foundAbstract: '' }));
                    setSubmitThesisAndCapstone((prev) => ({ ...prev, pageNumber: '' }));
                    setSubmitThesisAndCapstone((prev) => ({ ...prev, fileName: '' }));
                    console.log("error: ", error);
                    if (error.response && error.response.status === 401) {
                        console.log(error.response.data.message);
                    }
                }
            };
            requestAbstract();
        }
    }, [archiveFile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (submitThesisAndCapstone.pageNumber !== '' && submitThesisAndCapstone.foundAbstract !== '' && submitThesisAndCapstone.fileName !== '') {

            const submitData = new FormData();
            submitData.append('userId', (userCredentials.id).toString());
            for (const key in submitThesisAndCapstone) {
                if (submitThesisAndCapstone[key] !== null) {
                    submitData.append(key, submitThesisAndCapstone[key]);
                }
            }

            try {
                const response = await axios.post(`${backendUrl}/api/submit-archive-file`, submitData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setIsLoading(false);
                    setErrorMessage(response.data.message);
                    setIsSuccess(true);

                    setSubmitThesisAndCapstone({
                        foundAbstract: '',
                        pageNumber: '',
                        fileName: '',
                        department: '',
                        course: '',
                        schoolYear: '',
                        projectTitle: '',
                        members: '',
                        bannerImage: null
                    });

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
        } else {
            setIsLoading(false);
            setErrorMessage('No Abstract found on your PDF file! Check your PDF file and upload again!');
            setIsError(true);

            setTimeout(() => {
                setIsError(false);
            }, 5000);
        }
    };

    // -----------------------------------------  FETCH DEPARTMENT -------------------------------------------------
    const [departmentList, setDepartmentList] = useState([]);
    const [searchDepartment, setSearchDepartment] = useState('');

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
    }, []);

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
    }, []);

    return (
        <>
            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0' }}>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="content py-4">
                            <div className="card card-outline card-primary shadow rounded-0">
                                <div className="card-header rounded-0">
                                    <h5 className="card-title">Submit Project</h5>
                                </div>
                                <div className="card-body rounded-0">
                                    <div className="container-fluid">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="year" className="control-label text-navy">Department</label>
                                                        <select id="year" className="form-control form-control-border" value={submitThesisAndCapstone.department} onChange={(e) => setSubmitThesisAndCapstone((prev) => ({ ...prev, department: e.target.value }))} required>
                                                            <option value="" selected disabled>Select Department</option>
                                                            {departmentList && departmentList.map(item => (
                                                                <option key={item.id} value={item.name}>{item.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="year" className="control-label text-navy">Course</label>
                                                        <select id="year" className="form-control form-control-border" value={submitThesisAndCapstone.course} onChange={(e) => setSubmitThesisAndCapstone((prev) => ({ ...prev, course: e.target.value }))} required>
                                                            <option value="" selected disabled>Select Course</option>
                                                            {coursesList && coursesList.map(item => (
                                                                <option key={item.id} value={item.course}>{item.course}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="title" className="control-label text-navy">Project
                                                            Title</label>
                                                        <input type="text" placeholder='Project Title...' value={submitThesisAndCapstone.projectTitle} onChange={(e) => setSubmitThesisAndCapstone((prev) => ({ ...prev, projectTitle: e.target.value }))} className="form-control form-control-border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="year" className="control-label text-navy">School Year</label>
                                                        <select id="year" className="form-control form-control-border" value={submitThesisAndCapstone.schoolYear} onChange={(e) => setSubmitThesisAndCapstone((prev) => ({ ...prev, schoolYear: e.target.value }))} required >
                                                            <option value="" selected disabled>Select School Year</option>
                                                            {schoolYearList && schoolYearList.map(item => (
                                                                <option key={item.id} value={item.school_year}>{item.school_year}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="members" className="control-label text-navy">Project
                                                            Members</label>
                                                        <input type="text" placeholder="e.g. Mr. Programmer," value={submitThesisAndCapstone.members} onChange={(e) => setSubmitThesisAndCapstone((prev) => ({ ...prev, members: e.target.value }))} className="form-control form-control-border summernote-list-only" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="img" className="control-label text-muted">Project
                                                            Image/Banner Image</label>
                                                        <input type="file" className="form-control form-control-border" accept="image/png,image/jpeg" onChange={handleImageChange} required />
                                                    </div>
                                                    <div className="form-group text-center">
                                                        <img src={imagePreview ? imagePreview : givenImage} alt="My Avatar" id="cimg" className="img-fluid banner-img bg-gradient-dark border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="pdf" className="control-label text-muted">Project Document
                                                            (PDF File Only)</label>
                                                        <input type="file" onChange={(e) => setArchiveFile(e.target.files[0])} className="form-control form-control-border" accept="application/pdf" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row" style={{ display: submitThesisAndCapstone.foundAbstract ? 'block' : 'none' }}>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <label for="abstract" class="control-label text-navy">Abstract</label>
                                                        <textarea rows="15" value={submitThesisAndCapstone.foundAbstract} placeholder="abstract" class="form-control form-control-border summernote"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <button className="btn btn-danger" style={{ width: '110px' }} type='button'>Cancel</button>
                                                        <button className="btn btn-primary" style={{ width: '110px' }} type='submit'> Update</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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

            {/* Loading div */}
            <div className='error-respond' style={{ display: isError || isSuccess ? 'block' : 'none', backgroundColor: isSuccess && !isError ? '#7b4ae4' : '#fb7d60' }}>
                <div>
                    <h5>{errorMessage}</h5>
                </div>
            </div>
        </>
    )
}

export default SubmitProject
