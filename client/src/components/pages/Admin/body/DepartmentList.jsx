import React from 'react'

function DepartmentList() {
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
                            <div className="card-header">
                                <h3 className="card-title">List of Department</h3>
                                <div className="card-tools">
                                    <a href="javascript:void(0)" id="create_new" className="btn btn-flat btn-sm btn-primary"><span className="fas fa-plus" />  Add New Department</a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="container-fluid" style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                        <table className="table table-hover table-striped">
                                            <colgroup>
                                                <col width="5%" />
                                                <col width="20%" />
                                                <col width="20%" />
                                                <col width="30%" />
                                                <col width="15%" />
                                                <col width="10%" />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date Created</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">1</td>
                                                    <td className>2021-12-07 09:34</td>
                                                    <td>College Of Arts And Sciences</td>
                                                    <td className="truncate-1">Develop and implement programs in Liberal Arts and Sciences to achieve academic excellence and competencies geared towards the total development of the learners in their specialized fields.</td>
                                                    <td className="text-center">
                                                        <span className="badge badge-success badge-pill">Active</span>                          </td>
                                                    <td align="center">
                                                        <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                            Action
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu" role="menu">
                                                            <a className="dropdown-item view_data" href="javascript:void(0)" data-id={3}><span className="fa fa-eye text-dark" /> View</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item edit_data" href="javascript:void(0)" data-id={3}><span className="fa fa-edit text-primary" /> Edit</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={3}><span className="fa fa-trash text-danger" /> Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">2</td>
                                                    <td className>2021-12-07 09:34</td>
                                                    <td>College Of Business Management And Accountancy</td>
                                                    <td className="truncate-1">College of Business Management and Accountancy</td>
                                                    <td className="text-center">
                                                        <span className="badge badge-success badge-pill">Active</span>                          </td>
                                                    <td align="center">
                                                        <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                            Action
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu" role="menu">
                                                            <a className="dropdown-item view_data" href="javascript:void(0)" data-id={4}><span className="fa fa-eye text-dark" /> View</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item edit_data" href="javascript:void(0)" data-id={4}><span className="fa fa-edit text-primary" /> Edit</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={4}><span className="fa fa-trash text-danger" /> Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">3</td>
                                                    <td className>2021-12-07 09:35</td>
                                                    <td>College Of Computer Studies</td>
                                                    <td className="truncate-1">Develop creative innovators with the confidence and courage to seize and transform opportunities for the benefit of the society.</td>
                                                    <td className="text-center">
                                                        <span className="badge badge-success badge-pill">Active</span>                          </td>
                                                    <td align="center">
                                                        <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                            Action
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu" role="menu">
                                                            <a className="dropdown-item view_data" href="javascript:void(0)" data-id={5}><span className="fa fa-eye text-dark" /> View</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item edit_data" href="javascript:void(0)" data-id={5}><span className="fa fa-edit text-primary" /> Edit</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={5}><span className="fa fa-trash text-danger" /> Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">4</td>
                                                    <td className>2021-12-07 09:28</td>
                                                    <td>College Of Education</td>
                                                    <td className="truncate-1">Implement Teacher Education Programs for the elementary and secondary levels and endeavor to achieve quality and excellence, relevance and responsiveness, equity and access, and efficiency and effectiveness in instruction, research, extension, and production.</td>
                                                    <td className="text-center">
                                                        <span className="badge badge-success badge-pill">Active</span>                          </td>
                                                    <td align="center">
                                                        <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                            Action
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu" role="menu">
                                                            <a className="dropdown-item view_data" href="javascript:void(0)" data-id={2}><span className="fa fa-eye text-dark" /> View</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item edit_data" href="javascript:void(0)" data-id={2}><span className="fa fa-edit text-primary" /> Edit</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={2}><span className="fa fa-trash text-danger" /> Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">5</td>
                                                    <td className>2021-12-07 09:37</td>
                                                    <td>College Of Engineering</td>
                                                    <td className="truncate-1">To develop scientific and technical knowledge anchored on sustainable fisheries productivity and promote linkages and networking in the implementation of fisheries programs and projects.</td>
                                                    <td className="text-center">
                                                        <span className="badge badge-success badge-pill">Active</span>                          </td>
                                                    <td align="center">
                                                        <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                            Action
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu" role="menu">
                                                            <a className="dropdown-item view_data" href="javascript:void(0)" data-id={6}><span className="fa fa-eye text-dark" /> View</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item edit_data" href="javascript:void(0)" data-id={6}><span className="fa fa-edit text-primary" /> Edit</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={6}><span className="fa fa-trash text-danger" /> Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">6</td>
                                                    <td className>2021-12-07 09:28</td>
                                                    <td>College Of Industrial Technology</td>
                                                    <td className="truncate-1">Develop world-class industrial workers and middle-level managers equipped with scientific knowledge, technological skills, and ethical work values to achieve a desirable quality of life.</td>
                                                    <td className="text-center">
                                                        <span className="badge badge-success badge-pill">Active</span>                          </td>
                                                    <td align="center">
                                                        <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                            Action
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu" role="menu">
                                                            <a className="dropdown-item view_data" href="javascript:void(0)" data-id={1}><span className="fa fa-eye text-dark" /> View</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item edit_data" href="javascript:void(0)" data-id={1}><span className="fa fa-edit text-primary" /> Edit</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={1}><span className="fa fa-trash text-danger" /> Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">7</td>
                                                    <td className>2023-08-24 17:24</td>
                                                    <td>ColLege Of Maritime</td>
                                                    <td className="truncate-1">College of blah blah blah blah blah</td>
                                                    <td className="text-center">
                                                        <span className="badge badge-success badge-pill">Active</span>                          </td>
                                                    <td align="center">
                                                        <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                            Action
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu" role="menu">
                                                            <a className="dropdown-item view_data" href="javascript:void(0)" data-id={7}><span className="fa fa-eye text-dark" /> View</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item edit_data" href="javascript:void(0)" data-id={7}><span className="fa fa-edit text-primary" /> Edit</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={7}><span className="fa fa-trash text-danger" /> Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">8</td>
                                                    <td className>2023-08-25 17:29</td>
                                                    <td>College Of Nursing And Allied Services</td>
                                                    <td className="truncate-1">CNAHS where the aspiring nurse will nurture their skills in treating people who need aid.</td>
                                                    <td className="text-center">
                                                        <span className="badge badge-success badge-pill">Active</span>                          </td>
                                                    <td align="center">
                                                        <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                            Action
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu" role="menu">
                                                            <a className="dropdown-item view_data" href="javascript:void(0)" data-id={8}><span className="fa fa-eye text-dark" /> View</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item edit_data" href="javascript:void(0)" data-id={8}><span className="fa fa-edit text-primary" /> Edit</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={8}><span className="fa fa-trash text-danger" /> Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}

export default DepartmentList
