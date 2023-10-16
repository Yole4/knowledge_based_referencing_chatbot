import React, { useEffect, useState } from 'react'
import BackendURL from '../backend url/BackendURL';
import axios from 'axios';

function AboutUs() {
    const backendUrl = BackendURL();


    // --------------------------    FETCH SETTINGS   --------------------------
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState({
        systemName: '',
        systemShortName: '',
        welcomeContent: '',
        aboutUs: '',
        email: '',
        contactNumber: '',
        address: ''
    });

    const [systemLogo, setSystemLogo] = useState([]);
    const [systemCover, setSystemCover] = useState([]);

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(`${backendUrl}/api/fetch-settings`);

                if (response.status === 200) {
                    setIsLoading(false);
                    setSettings({
                        systemName: response.data.message[0].system_name,
                        systemShortName: response.data.message[0].system_short_name,
                        welcomeContent: response.data.message[0].welcome_content,
                        aboutUs: response.data.message[0].about_us,
                        email: response.data.message[0].email,
                        contactNumber: response.data.message[0].contact_number,
                        address: response.data.message[0].address
                    });
                    setSystemCover(response.data.message[0].system_cover);
                    setSystemLogo(response.data.message[0].system_logo);
                }
            } catch (error) {
                setIsLoading(false);
            }
        }
        fetchSettings();
    }, []);

    return (
        <>
            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0' }}>
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
                                                <dd className="pr-4">{settings && settings.email}</dd>
                                                <dt className="text-muted"><i className="fa fa-phone" /> Contact #</dt>
                                                <dd className="pr-4">{settings && settings.contactNumber}</dd>
                                                <dt className="text-muted"><i className="fa fa-map-marked-alt" /> Location</dt>
                                                <dd className="pr-4">{settings && settings.address}</dd>
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
                                                <p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0, textAlign: 'justify' }}>{settings && settings.aboutUs}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* fetching data screen */}
            <div className="popup" style={{ display: isLoading ? 'block' : 'none' }}>
                <div className="modal-pop-up-loading">
                    <div className="modal-pop-up-loading-spiner"></div>
                    <p>Loading...</p>
                </div>
            </div>

        </>
    )
}

export default AboutUs
