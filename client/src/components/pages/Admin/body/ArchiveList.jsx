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
                                <h3 className="card-title" style={{color: 'darkblue', fontWeight: 'bold'}}>List of Thesis & Capstone Archives</h3>
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
                                                        <td className="text-center">Not Yet</td>
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
