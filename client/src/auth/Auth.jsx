import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BackendURL from '../components/pages/backend url/BackendURL';

function Auth() {
    const backendUrl = BackendURL();
    const token = localStorage.getItem('token');
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        if (token) {
            const checkToken = async () => {
                try {
                    const response = await axios.get(`${backendUrl}/api/protected`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.status === 200) {
                        setAuthenticated(true);
                    } else {
                        setAuthenticated(false);
                    }
                } catch (error) {
                    setAuthenticated(false);
                }
            };
            checkToken();
        }
        else{
            setAuthenticated(false);
        }
    }, [backendUrl, token]);

    return authenticated;
}

export default Auth;
