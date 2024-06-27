import { createContext, useContext, useState } from "react";
import { loginRequest } from "../api/auth.js";
import { registerConductor } from "../api/auth.conductor.js";
import { registerPermiso } from "../api/auth.permiso.js";
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
    const login=async(user)=>{
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuth(true);
        } catch (error) {
                console.error(error);
        }
    }

    //Hace el logout
    const logout = () => {
        Cookies.remove("token");
        setIsAuth(false);
        setUser(null);
    };
    //Parte de conductor
    const registrarConductor=async(conductor)=>{
        const res = await registerConductor(conductor)
        console.log(res.data)
        setConductor(res.data)
        setIsAuth(true)
    }
    //Parte de conductor
    const registrarPermiso=async(doc)=>{
        const res = await registerPermiso(doc)
        console.log(res.data)
        setPermiso(res.data)
        setIsAuth(true)

    }
    return(
        <AuthContext.Provider value={{
            login,
            logout,
            registrarConductor,
            registrarPermiso,
            isAuth,
            user,
            conductor,
            permiso}}>
            {children}
        </AuthContext.Provider>
    )
}