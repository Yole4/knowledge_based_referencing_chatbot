import React from 'react'

// images
import givenImage from '../../../assets/images/given image.png';

function UsersList() {
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
                                <h3 className="card-title">List of System Users</h3>
                                <div className="card-tools">
                                    <a href="?page=user/manage_user" className="btn btn-flat btn-primary"><span className="fas fa-plus" />  Create New</a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="container-fluid">
                                        <table className="table table-hover table-striped">
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
                                                <tr>
                                                    <td className="text-center">1</td>
                                                    <td className="text-center"><img src={givenImage} style={{height: '40px', borderRadius: '50%'}} className="img-avatar img-thumbnail p-0 border-2" alt="user_avatar" /></td>
                                                    <td>Claire Blake</td>
                                                    <td><p className="m-0 truncate-1">cblake</p></td>
                                                    <td><p className="m-0">Staff</p></td>
                                                    <td align="center">
                                                        <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                            Action
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu" role="menu">
                                                            <a className="dropdown-item" href="?page=user/manage_user&id=2"><span className="fa fa-edit text-primary" /> Edit</a>
                                                            <div className="dropdown-divider" />
                                                            <a className="dropdown-item delete_data" href="javascript:void(0)" data-id={2}><span className="fa fa-trash text-danger" /> Delete</a>
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

export default UsersList
