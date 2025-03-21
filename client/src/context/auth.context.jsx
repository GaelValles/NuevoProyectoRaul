import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth.js";
import { 
    getAllProfesores, 
    registerProfesor, 
    getProfesorRequest, 
    deleteProfesorRequest, 
    updateProfesorRequest, 
    loginProfesorRequest
} from "../api/auth.profesor.js";
import { 
    registerAlumno, 

    getAlumnoRequest, 
 
    updateAlumnoRequest,
    loginAlumnoRequest 
} from "../api/auth.alumno.js";
import { 
    createAsistenciaRequest,
    getAsistenciasByMateriaRequest,
    getAsistenciasByAlumnoRequest
} from "../api/auth.asistencias.js";
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debería estar dentro del provider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profesor, setProfesor] = useState(null);
    const [alumno, setAlumno] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null); // 'profesor' o 'alumno'

    // Login para profesores
    const loginProfesor = async (profesor) => {
        try {
            const res = await loginProfesorRequest(profesor);
            setIsAuth(true);
            setProfesor(res.data);
            setUserType('profesor');
            setErrors([]);
            return true;
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data.message]);
            }
            return false;
        }
    };

    // Logout general
    const logout = async () => {
        try {
            await logoutRequest();
            Cookies.remove("token");
            setIsAuth(false);
            setProfesor(null);
            setAlumno(null);
            setUserType(null);
            window.location.href = "/login";
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    // Funciones para profesores
    const registrarProfesor = async (profesorData) => {
        try {
            const res = await registerProfesor(profesorData);
            return res.data;
        } catch (error) {
            setErrors([error.response.data.message]);
            throw error;
        }
    };

    const getProfesores = async () => {
        try {
            const response = await getAllProfesores();
            return response.data;
        } catch (error) {
            console.error("Error al obtener profesores:", error);
            return [];
        }
    };

    const getProfesorById = async (id) => {
        try {
            const res = await getProfesorRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const editarProfesor = async (id, formData) => {
        try {
            const response = await updateProfesorRequest(id, formData);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar profesor:", error);
            throw error;
        }
    };

    // Funciones para alumnos
    const registrarAlumno = async (alumnoData) => {
        try {
            const res = await registerAlumno(alumnoData);
            return res.data;
        } catch (error) {
            setErrors([error.response.data.message]);
            throw error;
        }
    };

    const getAlumnos = async () => {
        try {
            const response = await getAllAlumnos();
            return response.data;
        } catch (error) {
            console.error("Error al obtener alumnos:", error);
            return [];
        }
    };

    // Funciones para asistencias
    const registrarAsistencias = async (materiaId, asistencias) => {
        try {
            const response = await createAsistenciaRequest(materiaId, asistencias);
            return response.data;
        } catch (error) {
            setErrors([error.response?.data?.message || 'Error al registrar asistencias']);
            throw error;
        }
    };

    const getAsistenciasByMateria = async (materiaId) => {
        try {
            const response = await getAsistenciasByMateriaRequest(materiaId);
            return response.data;
        } catch (error) {
            console.error("Error al obtener asistencias:", error);
            return [];
        }
    };

    const getAsistenciasByAlumno = async (alumnoId) => {
        try {
            const response = await getAsistenciasByAlumnoRequest(alumnoId);
            return response.data;
        } catch (error) {
            console.error("Error al obtener asistencias del alumno:", error);
            return [];
        }
    };

    // Verificación de token
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuth(false);
                setLoading(false);
                return;
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuth(false);
                    setLoading(false);
                    return;
                }
                setIsAuth(true);
                if (res.data.tipo === 'profesor') {
                    setProfesor(res.data);
                    setUserType('profesor');
                } else if (res.data.tipo === 'alumno') {
                    setAlumno(res.data);
                    setUserType('alumno');
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setIsAuth(false);
                setProfesor(null);
                setAlumno(null);
                setUserType(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            loginProfesor,
            logout,
            registrarProfesor,
            registrarAlumno,
            getProfesores,
            getAlumnos,
            getProfesorById,
            editarProfesor,
            registrarAsistencias,
            getAsistenciasByMateria,
            getAsistenciasByAlumno,
            errors,
            isAuth,
            profesor,
            alumno,
            userType,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
