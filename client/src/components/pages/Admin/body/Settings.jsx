import React from 'react'

function Settings() {
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
                        <div className="col-lg-12">
                            <div className="card card-outline card-primary">
                                <div className="card-header">
                                    <h5 className="card-title">System Information</h5>
                                </div>
                                <div className="card-body">
                                    <form action id="system-frm">
                                        <div id="msg" className="form-group" />
                                        <div className="form-group">
                                            <label htmlFor="name" className="control-label">System Name</label>
                                            <input type="text" className="form-control form-control-sm" name="name" id="name" value="Thesis and Capstone Archiving System" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="short_name" className="control-label">System Short Name</label>
                                            <input type="text" className="form-control form-control-sm" name="short_name" id="short_name" value="JRMSU BSCS" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="content[about_us]" className="control-label">Welcome Content</label>
                                            <textarea cols="30" rows="10" type="text" className="form-control form-control-sm summernote" name="content[welcome]" id="welcome" value={"<p style=\"margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify;\">Greetings and\n    welcome to our\n    state-of-the-art electronic archiving system, meticulously designed to cater specifically to the storage and\n    retrieval of both thesis and capstone projects. Our pioneering solution introduces a paradigm shift in conventional\n    archiving methodologies, seamlessly transitioning these scholarly pursuits into a digitized realm for enhanced\n    durability and effortless access. Driven by secure cloud-based infrastructure, intelligent metadata categorization,\n    and advanced search functionalities, our platform empowers researchers, students, and educators to seamlessly tap\n    into an expansive reservoir of invaluable academic insights. By embracing this innovative system, you not only\n    ensure the preservation of intellectual contributions for generations to come but also nurture a collaborative\n    learning environment. Scholars can seamlessly build upon existing research, actively contributing to the dynamic\n    landscape of academic discovery. Embrace the future of research dissemination and scholarly interaction through our\n    electronic archiving system – a testament to the evolving spirit of academic advancement and collective knowledge\n    enrichment.</p>"} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="content[about_us]" className="control-label">About Us</label>
                                            <textarea cols="30" rows="10" type="text" className="form-control form-control-sm summernote" name="content[about_us]" id="about_us" value={"<p style=\"margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify;\">Researchers opt to delve into the\n    realm of online thesis archiving systems due to the increasingly pivotal role they play in modern academia. The\n    surging volume of scholarly content necessitates a departure from conventional methods of storing and disseminating\n    theses and dissertations. Scholars, attuned to the evolving landscape, acknowledge the pressing demand for a more\n    refined and accessible approach to ensure the broadest possible dissemination of their invaluable contributions.\n    This topic seamlessly aligns with the ongoing digital paradigm shift in education and research, where virtual\n    platforms present avenues for elevated collaboration, discoverability, and interdisciplinary interaction. Moreover,\n    the conceptualization and materialization of pioneering archiving systems provide researchers an opportunity to\n    leave their mark on technological progress while effectively addressing a pragmatic requirement within the academic\n    sphere. By meticulously exploring the intricacies of designing, implementing, and gauging the impact of online\n    thesis archiving systems, researchers actively propel the advancement of scholarly communication and the\n    safeguarding of intellectual heritage in an era defined by digital innovation.</p>"} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor className="control-label">System Logo</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input rounded-circle" id="customFile" name="img" onchange="displayImg(this,$(this))" />
                                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <img src="http://localhost/otas/uploads/logo-JRMSU.png" alt id="cimg" className="img-fluid img-thumbnail" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor className="control-label">Cover</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input rounded-circle" id="customFile" name="cover" onchange="displayImg2(this,$(this))" />
                                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <img src="http://localhost/otas/uploads/jose.jpg" alt id="cimg2" className="img-fluid img-thumbnail bg-gradient-dark border-dark" />
                                        </div>
                                        <fieldset>
                                            <legend>School Information</legend>
                                            <div className="form-group">
                                                <label htmlFor="email" className="control-label">Email</label>
                                                <input type="email" className="form-control form-control-sm" name="email" id="email" value="info@university101.com" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="contact" className="control-label">Contact #</label>
                                                <input type="text" className="form-control form-control-sm" name="contact" id="contact" value="09854698789 / 78945632" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="address" className="control-label">Address</label>
                                                <textarea cols="30" rows="3" className="form-control form-control-sm" name="address" id="address" style={{ resize: 'none' }} value={"Under the Tree, Here Street, There City, Anywhere 1014"} />
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <button className="btn btn-sm btn-primary" form="system-frm">Update</button>
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

export default Settings
