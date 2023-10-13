import React from 'react'

function CurriculumnList() {
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
                                <h3 className="card-title">List of Curriculum</h3>
                                <div className="card-tools">
                                    <a href="javascript:void(0)" id="create_new" className="btn btn-flat btn-sm btn-primary"><span className="fas fa-plus" />  Add New Curriculum</a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="container-fluid">
                                        <table className="table table-hover table-striped">
                                            <colgroup>
                                                <col width="5%" />
                                                <col width="20%" />
                                                <col width="25%" />
                                                <col width="25%" />
                                                <col width="15%" />
                                                <col width="10%" />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date Created</th>
                                                    <th>Curriculum</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">1</td>
                                                    <td className>2021-12-07 10:12</td>
                                                    <td className>College of Education</td>
                                                    <td>BEEd</td>
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
                                                    <td className>2021-12-07 10:15</td>
                                                    <td className>College of Engineering</td>
                                                    <td>BS Computer Engineering</td>
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
                                                    <td className="text-center">3</td>
                                                    <td className>2021-12-07 10:14</td>
                                                    <td className>College of Education</td>
                                                    <td>BSBA</td>
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
                                                    <td className>2021-12-07 10:14</td>
                                                    <td className>College of Engineering</td>
                                                    <td>BSCE</td>
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
                                                    <td className="text-center">5</td>
                                                    <td className>2021-12-07 10:10</td>
                                                    <td className>College of Computer Studies</td>
                                                    <td>BSCS</td>
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
                                                    <td className="text-center">6</td>
                                                    <td className>2021-12-07 10:13</td>
                                                    <td className>College of Education</td>
                                                    <td>BSEd</td>
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
                                                    <td className="text-center">7</td>
                                                    <td className>2021-12-07 10:10</td>
                                                    <td className>College of Computer Studies</td>
                                                    <td>BSIS</td>
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

export default CurriculumnList
