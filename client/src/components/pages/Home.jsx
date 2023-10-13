import React from 'react'

//images
import logo from '../assets/images/logo.png';
import '../assets/css/CSS.css';

function Home() {

    return (
        <>
            <div>
                <div className="wrapper">
                    {/* Navbar */}
                    <nav className="bg-navy w-100 px-2 py-1 position-fixed top-0" id="login-nav">
                        <div className="d-flex justify-content-between w-100">
                            <div>
                                <span className="mr-2  text-white"><i className="fa fa-phone mr-1" /> 09854698789 / 78945632</span>
                            </div>
                            <div style={{cursor: 'pointer'}}>
                                <span className="mx-2">Howdy, admin</span>
                                <span className="mx-2"><img src="http://localhost/otas/uploads/student-1.png?v=1639202560" alt="User Avatar" style={{height: '30px', borderRadius: '50%'}} id="student-img-avatar" /></span>
                                {/* <span className="mx-1"><a href="http://localhost/otas/classes/Login.php?f=student_logout"><i className="fa fa-power-off" /></a></span> */}
                            </div>
                        </div>
                    </nav>
                    <nav className="main-header navbar navbar-expand navbar-light border-0 navbar-light text-sm" id="top-Nav" style={{marginLeft: '0'}}>
                        <div className="container">
                            <a href="./" className="navbar-brand">
                                <img src="http://localhost/otas/uploads/logo-JRMSU.png" alt="Site Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8', height: '40px', marginRight: '10px' }} />
                                <span>JRMSU BSCS</span>
                            </a>
                            <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                                {/* Left navbar links */}
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a href="./" className="nav-link active">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="./?page=projects" className="nav-link ">Projects</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle  ">Department</a>
                                        <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow" style={{ left: 0, right: 'inherit' }}>
                                            <li>
                                                <a href="./?page=projects_per_department&id=3" className="dropdown-item">College Of Arts And Sciences</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_department&id=4" className="dropdown-item">College Of Business Management And Accountancy</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_department&id=5" className="dropdown-item">College Of Computer Studies</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_department&id=2" className="dropdown-item">College Of Education</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_department&id=6" className="dropdown-item">College Of Engineering</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_department&id=1" className="dropdown-item">College Of Industrial Technology</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_department&id=7" className="dropdown-item">ColLege Of Maritime</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_department&id=8" className="dropdown-item">College Of Nursing And Allied Services</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle  ">Courses</a>
                                        <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow" style={{ left: 0, right: 'inherit' }}>
                                            <li>
                                                <a href="./?page=projects_per_curriculum&id=3" className="dropdown-item">BEEd</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_curriculum&id=7" className="dropdown-item">BS Computer Engineering</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_curriculum&id=5" className="dropdown-item">BSBA</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_curriculum&id=6" className="dropdown-item">BSCE</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_curriculum&id=2" className="dropdown-item">BSCS</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_curriculum&id=4" className="dropdown-item">BSEd</a>
                                            </li><li className="dropdown-divider" />
                                            <li>
                                                <a href="./?page=projects_per_curriculum&id=1" className="dropdown-item">BSIS</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="./?page=about" className="nav-link ">About Us</a>
                                    </li>
                                    {/* <li class="nav-item">
                              <a href="#" class="nav-link">Contact</a>
                          </li> */}
                                    <li className="nav-item">
                                        <a href="./?page=profile" className="nav-link ">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="./?page=submit-archive" className="nav-link ">Submit Thesis/Capstone</a>
                                    </li>
                                </ul>
                            </div>
                            {/* Right navbar links */}
                            <div className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                                <a href="javascript:void(0)" className="text-navy" id="search_icon"><i className="fa fa-search" /></a>
                                <div className="position-relative">
                                    <div id="search-field" className="position-absolute">
                                        <input type="search" id="search-input" className="form-control rounded-0" required placeholder="Search..." defaultValue />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {/* /.navbar */}
                    {/* Content Wrapper. Contains page content */}
                    <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0', marginTop: '25px' }}>
                        <div id="header" className="shadow mb-4">
                            <div className="d-flex justify-content-center h-100 w-100 align-items-center flex-column px-3">
                                <h1 className="w-100 text-center site-title" style={{marginBottom: '20px'}}>A thesis and capstone archiving system  with integrated knowledge-based referencing chatbot</h1>
                                <a href="./?page=projects" className="btn btn-lg btn-light rounded-pill w-25" id="enrollment"><b>Explore Projects</b></a>
                            </div>
                        </div>
                        {/* Main content */}
                        <section className="content ">
                            <div className="container">
                                <div className="col-lg-12 py-5">
                                    <div className="contain-fluid">
                                        <div className="card card-outline card-navy shadow rounded-0">
                                            <div className="card-body rounded-0">
                                                <div className="container-fluid">
                                                    <h3 className="text-center">Welcome</h3>
                                                    <hr />
                                                    <div className="welcome-content">
                                                        <p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0, textAlign: 'justify' }}>Greetings and
                                                            welcome to our
                                                            state-of-the-art electronic archiving system, meticulously designed to cater specifically to the storage and
                                                            retrieval of both thesis and capstone projects. Our pioneering solution introduces a paradigm shift in conventional
                                                            archiving methodologies, seamlessly transitioning these scholarly pursuits into a digitized realm for enhanced
                                                            durability and effortless access. Driven by secure cloud-based infrastructure, intelligent metadata categorization,
                                                            and advanced search functionalities, our platform empowers researchers, students, and educators to seamlessly tap
                                                            into an expansive reservoir of invaluable academic insights. By embracing this innovative system, you not only
                                                            ensure the preservation of intellectual contributions for generations to come but also nurture a collaborative
                                                            learning environment. Scholars can seamlessly build upon existing research, actively contributing to the dynamic
                                                            landscape of academic discovery. Embrace the future of research dissemination and scholarly interaction through our
                                                            electronic archiving system – a testament to the evolving spirit of academic advancement and collective knowledge
                                                            enrichment.</p>                  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>        </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home
