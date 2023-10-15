import React, { useState } from 'react'

// images
import givenImage from '../../assets/images/given image.png';

function SubmitProject() {

    // image preview
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };

            reader.readAsDataURL(selectedImage);
        }
    };

    return (
        <>
            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0' }}>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="content py-4">
                            <div className="card card-outline card-primary shadow rounded-0">
                                <div className="card-header rounded-0">
                                    <h5 className="card-title">Submit Project</h5>
                                </div>
                                <div className="card-body rounded-0">
                                    <div className="container-fluid">
                                        <form action id="archive-form">
                                            <input type="hidden" name="id" defaultValue />
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label htmlFor="title" className="control-label text-navy">Project
                                                            Title</label>
                                                        <input type="text" placeholder='Project Title...' className="form-control form-control-border" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label htmlFor="year" className="control-label text-navy">Year</label>
                                                        <select name="year" id="year" className="form-control form-control-border" required>
                                                            <option>2023</option>
                                                            <option>2022</option>
                                                            <option>2021</option>
                                                            <option>2020</option>
                                                            <option>2019</option>
                                                            <option>2018</option>
                                                            <option>2017</option>
                                                            <option>2016</option>
                                                            <option>2015</option>
                                                            <option>2014</option>
                                                            <option>2013</option>
                                                            <option>2012</option>
                                                            <option>2011</option>
                                                            <option>2010</option>
                                                            <option>2009</option>
                                                            <option>2008</option>
                                                            <option>2007</option>
                                                            <option>2006</option>
                                                            <option>2005</option>
                                                            <option>2004</option>
                                                            <option>2003</option>
                                                            <option>2002</option>
                                                            <option>2001</option>
                                                            <option>2000</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="members" className="control-label text-navy">Project
                                                            Members</label>
                                                        <textarea rows={3} name="members" id="members" placeholder="members" className="form-control form-control-border summernote-list-only" required defaultValue={""} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="img" className="control-label text-muted">Project
                                                            Image/Banner Image</label>
                                                        <input type="file" className="form-control form-control-border" accept="image/png,image/jpeg" onChange={handleImageChange} required />
                                                    </div>
                                                    <div className="form-group text-center">
                                                        <img src={imagePreview ? imagePreview : givenImage} alt="My Avatar" id="cimg" className="img-fluid banner-img bg-gradient-dark border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="pdf" className="control-label text-muted">Project Document
                                                            (PDF File Only)</label>
                                                        <input type="file" id="pdf" name="pdf" className="form-control form-control-border" accept="application/pdf" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <button className="btn btn-danger" style={{width: '110px'}}>Cancel</button>
                                                        <button className="btn btn-primary" style={{width: '110px'}}> Update</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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

export default SubmitProject
