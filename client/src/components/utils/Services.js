import axios from "axios";

export const backendUrl = "http://localhost:3001";

// post request for not login
export const postRequest = async (url, body) => {
    try {
        const response = await axios.post(url, body);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { error: true, message: error.response.data.message };
        } else {
            console.log("Error: ", error);
        }
    }
};

// get request for login
export const getRequest = async (url) => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { error: true, message: error.response.data.message };
        } else {
            console.log("Error: ", error);
        }
    }
}

// post request for not login
export const apostRequest = async (url, body) => {
    // console.log('requestImageToUpload:', Object.fromEntries(body.entries()));
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.post(url, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { error: true, message: error.response.data.message };
        } else {
            console.log("Error: ", error);
        }
    }
};

// get request for login
export const agetRequest = async (url) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { error: true, message: error.response.data.message };
        } else {
            console.log("Error: ", error);
        }
    }
}