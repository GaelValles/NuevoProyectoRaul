import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from "../api/auth.js";
import { registerConductor, getAllConductors, getConductorRequest } from "../api/auth.conductor.js";
import { registerPermiso, getAllPermisos, getPermisoRequest } from "../api/auth.permiso.js";
import { getAllCamiones, registerCamion, getCamionRequest } from "../api/auth.camion.js";
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { getAllCajas, registerCaja, getCajaRequest } from "../api/auth.caja.js";
import { cookie } from "express-validator";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debería estar dentro del provider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [permiso, setPermiso] = useState(null);
    const [camion, setCamion] = useState(null);
    const [user, setUser] = useState([]);
    const [conductor, setConductor] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const login = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data)
            setIsAuth(true);
            setUser(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data.message]);
            }
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setIsAuth(false);
        setUser(null);
        window.location.href = "/login";
    };

    const registrarConductor = async (conductor) => {
        const res = await registerConductor(conductor);
        setConductor(res.data);
        setIsAuth(true);
    };

    const getConductors = async () => {
        const response = await getAllConductors();
        return response.data;
    };

    const getConductorById = async (id) => {
        try {
            const res = await getConductorRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getPermisoById = async (id) => {
        try {
            const res = await getPermisoRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getCamionById = async (id) => {
        try {
            const res = await getCamionRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getCajaById = async (id) => {
        try {
            const res = await getCajaRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getPermisos = async () => {
        const response = await getAllPermisos();
        return response.data;
    };

    const registrarCamion = async (camion) => {
        const res = await registerCamion(camion);
        setCamion(res.data);
        setIsAuth(true);
    };

    const registrarPermiso = async (permiso) => {
        const res = await registerPermiso(permiso);
        setPermiso(res.data);
        setIsAuth(true);
    };

    const getCamiones = async () => {
        const response = await getAllCamiones();
        return response.data;
    };

    const registrarCaja = async (caja) => {
        const res = await registerCaja(caja);
        setCamion(res.data);
        setIsAuth(true);
    };

    const getCajas = async () => {
        const response = await getAllCajas();
        return response.data;
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);


    useEffect(() =>{
        async function checkLogin () {
            const cookies = Cookies.get()
            console.log(cookies)
            if(!cookies){
                setIsAuth(false)
                setLoading(false);
                return setUser(null)
            }
                try {
                    const res = await verifyTokenRequest(cookies.token)
                    if(!res.data){
                        setIsAuth(false);
                        setLoading(false);
                        return;
                    }
                    setIsAuth(true);
                    setUser(res.data);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    setIsAuth(false);
                    setUser(null);
                    setLoading(false);
                }
        }
        checkLogin();
    },[])

    // useEffect(() => {
    //     async function checkLogin() {
    //         const token = Cookies.get('token');
    //         if (!token) {
    //             setIsAuth(false);
    //             setUser(null);
    //             setLoading(false);
    //             return;
    //         }
    //         try {
    //             const res = await verifyTokenRequest();
    //             if (!res) {
    //                 setIsAuth(false);
    //                 setUser(null);
    //             } else {
    //                 setIsAuth(true);
    //                 setUser(res);
    //             }
    //         } catch (error) {
    //             setIsAuth(false);
    //             setUser(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     checkLogin();
    // }, []);

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            registrarConductor,
            registrarPermiso,
            registrarCamion,
            registrarCaja,
            getConductorById,
            getPermisoById,
            getCamionById,
            getCajaById,
            getConductors,
            getPermisos,
            getCamiones,
            getCajas,
            setIsAuth,
            errors,
            isAuth,
            user,
            setUser,
            conductor,
            permiso,
            camion,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
