import React from 'react';

// react icons
import { FaThList, FaUsers, FaUsersSlash } from "react-icons/fa";
import { RiNewspaperLine } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import { TbArchiveOff } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
// import { TbArchiveOff } from "react-icons/tb";


function Dashboard() {
    const navigate = useNavigate();
    return (
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

            <div style={{marginLeft: '20px', textAlign: 'center', marginBottom: '20px'}}>
                <h1 className="m-0">Welcome to Thesis and Capstone Archiving System</h1>
                <hr />
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>1</h3>
                                    <p>Department List</p>
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
                                    <h3>2<sup style={{ fontSize: 20 }}></sup></h3>
                                    <p>Curriculumn List</p>
                                </div>
                                <div className="icon">
                                    <i><RiNewspaperLine /></i>
                                </div>
                                <a href="#" className="small-box-footer" onClick={() => navigate('/curriculumn-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>4</h3>
                                    <p>Verified Student</p>
                                </div>
                                <div className="icon">
                                    <i><FaUsers /></i>
                                </div>
                                <a href="#" className="small-box-footer" onClick={() => navigate('/student-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>0</h3>
                                    <p>Not Verified Student</p>
                                </div>
                                <div className="icon">
                                    <i><FaUsersSlash /></i>
                                </div>
                                <a href="#" className="small-box-footer" onClick={() => navigate('/student-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>1</h3>
                                    <p>Verified Archives</p>
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
                                    <h3>1</h3>
                                    <p>Not Verified Archives</p>
                                </div>
                                <div className="icon">
                                    <i><TbArchiveOff /></i>
                                </div>
                                <a href="#" className="small-box-footer" onClick={() => navigate('/archive-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Dashboard
