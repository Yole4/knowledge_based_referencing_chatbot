import React from 'react';

// icon list
import { BiSearch } from "react-icons/bi";

function ArchiveList() {
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
                            <div className="card-header" style={{display: 'flex'}}>
                                <h3 className="card-title" style={{color: 'darkblue', fontWeight: 'bold'}}>List of Thesis Archives</h3>
                                <input className="form-control " type="search" placeholder="Search" aria-label="Search" style={{width: '200px', paddingLeft: '28px', position: 'absolute', right: '15px', height: '30px', marginTop: '-5px'}} />
                                <BiSearch size={20} style={{position: 'absolute', right: '190px'}}/>
                            </div>
                            <div className="card-body" style={{height: 'auto'}}>
                                <div className="container-fluid">
                                    <div className="container-fluid">
                                        <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                            <table className="table table-hover table-striped">
                                                <colgroup>
                                                    <col width="5%" />
                                                    <col width="15%" />
                                                    <col width="15%" />
                                                    <col width="20%" />
                                                    <col width="20%" />
                                                    <col width="10%" />
                                                    <col width="10%" />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Date Created</th>
                                                        <th>Archive Code</th>
                                                        <th>Project Title</th>
                                                        <th>Curriculum</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">1</td>
                                                        <td className>2021-12-11 14:57</td>
                                                        <td>2021120001</td>
                                                        <td>Sample Project 101</td>
                                                        <td>BSIS</td>
                                                        <td className="text-center">
                                                            <span className="badge badge-success badge-pill">Published</span>
                                                        </td>
                                                        <td align="center">
                                                            <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                Action
                                                                <span className="sr-only">Toggle Dropdown</span>
                                                            </button>
                                                            <div className="dropdown-menu" role="menu">
                                                                <a className="dropdown-item" href="http://localhost/otas//?page=view_archive&id=1" target="_blank"><span className="fa fa-external-link-alt text-gray" style={{marginRight: '5px'}} />
                                                                    View</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item update_status" href="javascript:void(0)" data-id={1} data-status={1}><span className="fa fa-check text-dark" /> Update Status</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={1}><span className="fa fa-trash text-danger" style={{marginRight: '5px'}}/>
                                                                    Delete</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">2</td>
                                                        <td className>2021-12-11 16:53</td>
                                                        <td>2021120002</td>
                                                        <td>Sample 102</td>
                                                        <td>BSIS</td>
                                                        <td className="text-center">
                                                            <span className="badge badge-success badge-pill">Published</span>
                                                        </td>
                                                        <td align="center">
                                                            <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                Action
                                                                <span className="sr-only">Toggle Dropdown</span>
                                                            </button>
                                                            <div className="dropdown-menu" role="menu">
                                                                <a className="dropdown-item" href="http://localhost/otas//?page=view_archive&id=2" target="_blank"><span className="fa fa-external-link-alt text-gray" />
                                                                    View</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item update_status" href="javascript:void(0)" data-id={2} data-status={1}><span className="fa fa-check text-dark" /> Update Status</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={2}><span className="fa fa-trash text-danger" />
                                                                    Delete</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">3</td>
                                                        <td className>2021-12-13 14:30</td>
                                                        <td>2021120003</td>
                                                        <td>Online Point Of Sale System For XYZ Corp.</td>
                                                        <td>BSIS</td>
                                                        <td className="text-center">
                                                            <span className="badge badge-success badge-pill">Published</span>
                                                        </td>
                                                        <td align="center">
                                                            <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                Action
                                                                <span className="sr-only">Toggle Dropdown</span>
                                                            </button>
                                                            <div className="dropdown-menu" role="menu">
                                                                <a className="dropdown-item" href="http://localhost/otas//?page=view_archive&id=3" target="_blank"><span className="fa fa-external-link-alt text-gray" />
                                                                    View</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item update_status" href="javascript:void(0)" data-id={3} data-status={1}><span className="fa fa-check text-dark" /> Update Status</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={3}><span className="fa fa-trash text-danger" />
                                                                    Delete</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">3</td>
                                                        <td className>2021-12-13 14:30</td>
                                                        <td>2021120003</td>
                                                        <td>Online Point Of Sale System For XYZ Corp.</td>
                                                        <td>BSIS</td>
                                                        <td className="text-center">
                                                            <span className="badge badge-success badge-pill">Published</span>
                                                        </td>
                                                        <td align="center">
                                                            <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                Action
                                                                <span className="sr-only">Toggle Dropdown</span>
                                                            </button>
                                                            <div className="dropdown-menu" role="menu">
                                                                <a className="dropdown-item" href="http://localhost/otas//?page=view_archive&id=3" target="_blank"><span className="fa fa-external-link-alt text-gray" />
                                                                    View</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item update_status" href="javascript:void(0)" data-id={3} data-status={1}><span className="fa fa-check text-dark" /> Update Status</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={3}><span className="fa fa-trash text-danger" />
                                                                    Delete</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">3</td>
                                                        <td className>2021-12-13 14:30</td>
                                                        <td>2021120003</td>
                                                        <td>Online Point Of Sale System For XYZ Corp.</td>
                                                        <td>BSIS</td>
                                                        <td className="text-center">
                                                            <span className="badge badge-success badge-pill">Published</span>
                                                        </td>
                                                        <td align="center">
                                                            <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                Action
                                                                <span className="sr-only">Toggle Dropdown</span>
                                                            </button>
                                                            <div className="dropdown-menu" role="menu">
                                                                <a className="dropdown-item" href="http://localhost/otas//?page=view_archive&id=3" target="_blank"><span className="fa fa-external-link-alt text-gray" />
                                                                    View</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item update_status" href="javascript:void(0)" data-id={3} data-status={1}><span className="fa fa-check text-dark" /> Update Status</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={3}><span className="fa fa-trash text-danger" />
                                                                    Delete</a>
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

export default ArchiveList
