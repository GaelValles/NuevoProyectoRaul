import { createContext, useContext, useState } from "react";
import { loginRequest, getAllConductors } from "../api/auth.js";
import { registerConductor } from "../api/auth.conductor.js";
import { registerPermiso, getAllPermisos } from "../api/auth.permiso.js";
import Cookies from 'js-cookie';
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deberia estar dentro del provider");
    }
    return context;
};

export const AuthProvider = ({children}) => {   
    const [permiso, setPermiso] = useState(null)
    const [user, setUser] = useState(null)
    const [conductor, setConductor] = useState(null)
    const [isAuth, setIsAuth] = useState(false);


    //Parte de user
    const login = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuth(true);
            Cookies.set('token', res.data.token);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    //Hace el logout
    const logout = () => {
        Cookies.remove("token");
        setIsAuth(false);
        setUser(null);
    };
//Parte de conductor
    //registrar conductor
    const registrarConductor=async(conductor)=>{
        const res = await registerConductor(conductor)
        console.log(res.data)
        setConductor(res.data)
        setIsAuth(true)
    }

    //Obtener todos los conductores
    const getConductors = async () => {
        const response = await getAllConductors()
        return response.data;
    };
//Parte de permiso
    //registrar permiso
    const registrarPermiso=async(doc)=>{
        const res = await registerPermiso(doc)
        console.log(res.data)
        setDoc(res.data)
        setIsAuth(true)
    }

    //Obtener todos los permisos
  
    const getPermisos = async () => {
        const response = await getAllPermisos()
        return response.data;
    };
    return(
        <AuthContext.Provider value={{
            login,
            logout,
            registrarConductor,
            registrarPermiso,
            getConductors,
            getPermisos,
            isAuth,
            user,
            conductor,
            permiso}}>
            {children}
        </AuthContext.Provider>
    )
}