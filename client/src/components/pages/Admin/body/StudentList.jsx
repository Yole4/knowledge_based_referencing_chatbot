import React from 'react';

// icon list
import { BiSearch } from "react-icons/bi";

function StudentList() {
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
                        <style dangerouslySetInnerHTML={{ __html: "\n .img-avatar {\n  width: 45px;\n height: 45px;\n object-fit: cover;\n object-position: center center;\n  border-radius: 100%;\n }\n                    " }} />
                        <div className="card card-outline card-primary">
                            <div className="card-header" style={{ display: 'flex' }}>
                                <h3 className="card-title" style={{ color: 'darkblue', fontWeight: 'bold' }}>List of Students</h3>
                                <input class="form-control " type="search" placeholder="Search" aria-label="Search" style={{ width: '200px', paddingLeft: '28px', position: 'absolute', right: '15px', height: '30px', marginTop: '-5px' }} />
                                <BiSearch size={20} style={{ position: 'absolute', right: '190px' }} />
                            </div>
                            <div className="card-body" style={{ height: 'auto' }}>
                                <div className="container-fluid">
                                    <div className="container-fluid">
                                        <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                            <table className="table table-hover table-striped">

                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Avatar</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">1</td>
                                                        <td className="text-center"><img src="http://localhost/otas/uploads/student-3.png?v=1639377518" className="img-avatar img-thumbnail p-0 border-2" alt="user_avatar" /></td>
                                                        <td>Blake, Claire C</td>
                                                        <td><p className="m-0 truncate-1">cblake@sample.com</p></td>
                                                        <td className="text-center">
                                                            <span className="badge badge-pill badge-success">Verified</span>
                                                        </td>
                                                        <td align="center">
                                                            <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                Action
                                                                <span className="sr-only">Toggle Dropdown</span>
                                                            </button>
                                                            <div className="dropdown-menu" role="menu">
                                                                <a className="dropdown-item view_details" href="javascript:void(0)" data-id={3}><span className="fa fa-eye text-dark" /> view</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={3} data-name="cblake@sample.com"><span className="fa fa-trash text-danger" /> Delete</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">2</td>
                                                        <td className="text-center"><img src="http://localhost/otas/uploads/student-1.png?v=1639202693" className="img-avatar img-thumbnail p-0 border-2" alt="user_avatar" /></td>
                                                        <td>Smith, John D</td>
                                                        <td><p className="m-0 truncate-1">jsmith@sample.com</p></td>
                                                        <td className="text-center">
                                                            <span className="badge badge-pill badge-success">Verified</span>
                                                        </td>
                                                        <td align="center">
                                                            <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                Action
                                                                <span className="sr-only">Toggle Dropdown</span>
                                                            </button>
                                                            <div className="dropdown-menu" role="menu">
                                                                <a className="dropdown-item view_details" href="javascript:void(0)" data-id={1}><span className="fa fa-eye text-dark" /> view</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={1} data-name="jsmith@sample.com"><span className="fa fa-trash text-danger" /> Delete</a>
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
                    </div>
                </section>

            </div>
        </>
    )
}

export default StudentList
