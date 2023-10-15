import React from 'react'

function AboutUs() {
    return (
        <>
            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0'}}>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="col-12">
                            <div className="row my-5 ">
                                <div className="col-md-5">
                                    <div className="card card-outline card-navy rounded-0 shadow">
                                        <div className="card-header">
                                            <h4 className="card-title">Contact</h4>
                                        </div>
                                        <div className="card-body rounded-0">
                                            <dl>
                                                <dt className="text-muted"><i className="fa fa-envelope" /> Email</dt>
                                                <dd className="pr-4">info@university101.com</dd>
                                                <dt className="text-muted"><i className="fa fa-phone" /> Contact #</dt>
                                                <dd className="pr-4">09854698789 / 78945632</dd>
                                                <dt className="text-muted"><i className="fa fa-map-marked-alt" /> Location</dt>
                                                <dd className="pr-4">Under the Tree, Here Street, There City, Anywhere 1014</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="card rounded-0 card-outline card-navy shadow">
                                        <div className="card-body rounded-0">
                                            <h2 className="text-center">About</h2>
                                            <center>
                                                <hr className="bg-navy border-navy w-25 border-2" />
                                            </center>
                                            <div>
                                                <p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0, textAlign: 'justify' }}>
                                                    Researchers opt to delve into the
                                                    realm of online thesis archiving systems due to the increasingly pivotal
                                                    role they play in modern academia. The
                                                    surging volume of scholarly content necessitates a departure from
                                                    conventional methods of storing and disseminating
                                                    theses and dissertations. Scholars, attuned to the evolving landscape,
                                                    acknowledge the pressing demand for a more
                                                    refined and accessible approach to ensure the broadest possible
                                                    dissemination of their invaluable contributions.
                                                    This topic seamlessly aligns with the ongoing digital paradigm shift in
                                                    education and research, where virtual
                                                    platforms present avenues for elevated collaboration, discoverability,
                                                    and interdisciplinary interaction. Moreover,
                                                    the conceptualization and materialization of pioneering archiving
                                                    systems provide researchers an opportunity to
                                                    leave their mark on technological progress while effectively addressing
                                                    a pragmatic requirement within the academic
                                                    sphere. By meticulously exploring the intricacies of designing,
                                                    implementing, and gauging the impact of online
                                                    thesis archiving systems, researchers actively propel the advancement of
                                                    scholarly communication and the
                                                    safeguarding of intellectual heritage in an era defined by digital
                                                    innovation.</p>
                                            </div>
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

export default AboutUs
