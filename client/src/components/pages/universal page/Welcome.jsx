import React from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome() {
    const navigate = useNavigate();
    return (
        <>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0'}}>
                <div id="header" className="shadow mb-4">
                    <div className="d-flex justify-content-center h-100 w-100 align-items-center flex-column px-3">
                        <h1 className="w-100 text-center site-title" style={{ marginBottom: '20px' }}>A thesis and capstone archiving system  with integrated knowledge-based referencing chatbot</h1>
                        <a href="#" onClick={() => navigate('/projects')} className="btn btn-lg btn-light rounded-pill explore" id="enrollment"><b>Explore Projects</b></a>
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
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Welcome
