import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, verifyTokenRequest, logoutRequest, getUsuarioRequest, updateUsuarioRequest } from "../api/auth.js";
import { registerConductor, getAllConductors, getConductorRequest, getConductorFilesRequest, updateConductorRequest } from "../api/auth.conductor.js";
import { registerPermiso, getAllPermisos, getPermisoRequest, UpdateStatusRequest, updatePermisoRequest, getPermisoFileRequest } from "../api/auth.permiso.js";
import { getAllCamiones, registerCamion, getCamionRequest, updateCamionRequest } from "../api/auth.profesor.js";
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { getAllCajas, registerCaja, getCajaRequest, updateCajaRequest } from "../api/auth.alumno.js";
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
            setIsAuth(true);
            setUser(res.data);
            setErrors([]);
            return true;
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data.message]);
            }
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
            Cookies.remove("token");
            setIsAuth(false);
            setUser(null);
            window.location.href = "/login";
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
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

    const getUsuarioById = async (id) => {
        try {
            const res = await getUsuarioRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
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

    //actualiza el status
    const updateStatus = async (idpermiso, status) =>{
        try {
            await UpdateStatusRequest(idpermiso, status);
        } catch (error) {
            console.error(error);
        }
    };

    const editarConductor = async (id, formData) => {
        try {
            let updatedData = {};
    
            // Recorrer formData y almacenar los valores en updatedData
            for (const pair of formData.entries()) {
                updatedData[pair[0]] = pair[1];
            }
            console.log("Esto llega: ", updatedData);
            formData=updatedData;
            const response = await updateConductorRequest(id, formData);
            console.log("Esto envía", response.data);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar conductor:", error);
            throw error;
        }
    };

const editarPermiso = async (id, formData) => {
    try {
    let updatedData = {};

    // Recorrer formData y almacenar los valores en updatedData
    for (const pair of formData.entries()) {
        updatedData[pair[0]] = pair[1];
    }
    console.log("Esto llega: ", updatedData);

        const response = await updatePermisoRequest(id, formData);
        console.log("Esto envia", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar permiso:", error);
        throw error;
    }
};

const editarUsuario = async (id, formData) => {
    try {
    let updatedData = {};

    // Recorrer formData y almacenar los valores en updatedData
    for (const pair of formData.entries()) {
        updatedData[pair[0]] = pair[1];
    }
    console.log("Esto llega: ", updatedData);

        const response = await updateUsuarioRequest(id, formData);
        console.log("Esto envia", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw error;
    }
};



const editarCaja = async (id, cajaData) => {
        try {
            const updatedCaja = await updateCajaRequest(id, cajaData);
            return updatedCaja;
        } catch (error) {
            console.error("Error al actualizar la caja:", error);
            throw error;
        }
};

const editarCamion = async (id, camionData) => {
        try {
            const updatedCamion = await updateCamionRequest(id, camionData);
            return updatedCamion;
        } catch (error) {
            console.error("Error al actualizar el camion:", error);
            throw error;
        }
};

const getConductorFiles = async (idconductor) => {
        try {
            const response = await getConductorFilesRequest(idconductor);
            return response.data;
        } catch (error) {
            console.error("Error al obtener archivos del conductor:", error);
            return [];
        }
    
};
const getPermisoFile = async (idpermiso) => {
    try {
      const response = await getPermisoFileRequest(idpermiso);
      return response.data;
    } catch (error) {
      console.error("Error al obtener archivo del permiso:", error);
      return null;
    }
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

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            registrarConductor,
            registrarPermiso,
            registrarCamion,
            registrarCaja,
            getConductorById,
            getConductorFiles,
            getPermisoFile,
            getPermisoById,
            getUsuarioById,
            getCamionById,
            getCajaById,
            getConductors,
            getPermisos,
            getCamiones,
            getCajas,
            editarConductor,
            editarUsuario,
            editarPermiso,
            editarCamion,
            editarCaja,
            updateStatus,
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
