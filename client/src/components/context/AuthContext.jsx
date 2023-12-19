import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { agetRequest, apostRequest, backendUrl, getRequest, postRequest } from "../utils/Services";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // const {changeStatusMount} = useContext(AdminContext);

    const navigate = useNavigate();

    // loading
    const [errorResponse, setErrorResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mount, setMount] = useState(false);

    const [registerInfo, setRegisterInfo] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const user = localStorage.getItem('token');
        setUser(JSON.parse(user));
    }, []);

    // -------------------------------------    REGISTER    ---------------------------------------------
    const [isOpenRegister, setIsOpenRegister] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        const firstName = registerInfo.firstName;
        const middleName = registerInfo.middleName;
        const lastName = registerInfo.lastName;
        const username = registerInfo.username;
        const password = registerInfo.password;
        const confirmPassword = registerInfo.confirmPassword;
        const data = { firstName, middleName, lastName, username, password, confirmPassword };

        const response = await postRequest(`${backendUrl}/api/users/register`, data);

        setIsLoading(false);
        setIsOpenRegister(false);
        setMount(mount ? false : true);

        if (response.error) {
            setErrorResponse({ message: response.message, isError: true });
        } else {
            setRegisterInfo({
                firstName: '',
                middleName: '',
                lastName: '',
                username: '',
                password: '',
                confirmPassword: ''
            });
            localStorage.setItem("token", JSON.stringify(response.token));
            setUser(response.token);
            setErrorResponse({ message: response.message, isError: false });
            navigate('/');
        }
    };

    // -------------------------------------   LOGOUT  --------------------------------------------
    const [isLogout, setIsLogout] = useState(false);

    const logoutUser = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        setUserCredentials(null);
        setIsLogout(false);
        setErrorResponse({ message: "Logout Success", isError: false });
        navigate('/');
    }, []);

    // ------------------------------------    LOGIN USERS -----------------------------------------
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    });
    const [isOpenLogin, setIsOpenLogin] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        // setIsLoading(true);
        setErrorResponse(null);

        const username = loginInfo.username;
        const password = loginInfo.password;
        const data = { username, password };

        try {
            const response = await postRequest(`${backendUrl}/api/users/login`, data);

            setIsLoading(false);
            setIsOpenLogin(false);
            setMount(mount ? false : true);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setLoginInfo({
                    username: "",
                    password: ""
                });
                localStorage.setItem("token", JSON.stringify(response.token));
                setUser(response.token);
                setErrorResponse({ message: response.message, isError: false });
                navigate('/');
            }
        } catch (error) {
            console.log("Error", error);
            setIsLoading(false);
        }
    }

    // ------------------------------------ PROTECTED   -------------------------------------------
    const token = user;
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (token) {
            setIsLoading(true);

            const fetchUser = async () => {
                const response = await agetRequest(`${backendUrl}/api/users/protected`);

                setIsLoading(false);

                if (response.error) {
                    setUser(null);
                    setErrorResponse({ message: response.message, isError: true });
                } else {
                    setUserId(response.user);
                }
            };
            fetchUser();
        }
    }, [token, mount, user]);

    // ---------------------------------    CHANGE PASSWORD ----------------------------------------------
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [changePasswordData, setChangePasswordData] = useState({
        username: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/users/change-password`, { changePasswordData, userId: userId.id });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setMount(mount ? false : true);
                setIsChangePassword(false);
                setErrorResponse({ message: response.message, isError: false });
                setChangePasswordData({
                    username: '',
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    };

    //------------------------------------------------------    EDIT PROFILE    -----------------------------------------------------------
    const [isEditProfileName, setIsEditProfileName] = useState(false);
    const [names, setNames] = useState({
        firstName: '',
        middleName: '',
        lastName: ''
    });

    const handleEditProfileName = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/users/change-profile-info`, { names, userId: userId.id });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setIsEditProfileName(false);
                setMount(mount ? false : true);
                setErrorResponse({ message: response.message, isError: false });
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    };

    // -------------------------------------    FETCH USER CREDENTIALS --------------------------------------
    const [userCredentials, setUserCredentials] = useState([]);

    useEffect(() => {
        if (userId?.id) {
            const fetchUserData = async () => {
                setIsLoading(true);

                const id = userId.id;
                try {
                    const response = await apostRequest(`${backendUrl}/api/users/fetch-user-credentials`, { id });

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setChangePasswordData((prev) => ({ ...prev, username: response.message[0].username }));
                        setUserCredentials(response.message[0]);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log('error: ', error);
                }
            };
            fetchUserData();
        }
    }, [userId, mount]);

    // ----------------------------------------------   AUTO PROFILE UPLOAD --------------------------------------------
    const [autoImage, setAutoImage] = useState([]);

    const updateProfile = useCallback((info) => {
        setAutoImage(info);
    }, []);

    useEffect(() => {
        if (autoImage) {
            if (autoImage.length === 0) {
                // console.log('nothing change!')
            }
            else {
                setIsLoading(true);
                const autoUpload = async () => {

                    const requestImageToUpload = new FormData();
                    requestImageToUpload.append('image', autoImage);
                    requestImageToUpload.append('userId', userId.id);

                    try {
                        const response = await apostRequest(`${backendUrl}/api/users/profile-upload`, requestImageToUpload);
                        setIsLoading(false);

                        if (response.error) {
                            setErrorResponse({ message: response.message, isError: true });
                            // console.log(response);
                        } else {
                            setErrorResponse({ message: response.message, isError: false });
                            setMount(mount ? false : true);
                        }
                    } catch (error) {
                        setIsLoading(false);
                        console.log('error: ', error);
                    }
                };
                autoUpload();
            }
        }
    }, [autoImage]);

    // ------------------------------------------------ FETCH NOTIFICATION  -----------------------------------------------------
    const [myNotifications, setMyNotifications] = useState(null);

    useEffect(() => {
        if (userId) {
            const fetchNotifications = async () => {
                setIsLoading(true);
                setErrorResponse(null);

                try {
                    const response = await apostRequest(`${backendUrl}/api/users/fetch-notifications`, { userId: userId.id });

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setMyNotifications(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            fetchNotifications();
        }
    }, [userId]);

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        setRegisterInfo,
        registerUser,
        errorResponse,
        isLoading,
        logoutUser,
        loginInfo,
        setLoginInfo,
        handleLogin,
        isOpenLogin,
        setIsOpenLogin,
        isLogout,
        setIsLogout,
        isOpenRegister,
        setIsOpenRegister,
        userCredentials,
        updateProfile,
        userId
    }}>
        {children}
    </AuthContext.Provider>
}