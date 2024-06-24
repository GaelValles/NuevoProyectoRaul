import { createContext, useContext, useState } from "react";
import { loginRequest } from "../api/auth.js";
import { registerConductor } from "../api/auth.conductor.js";
import { registerPermiso } from "../api/auth.permiso.js";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deberia estar dentro del provider");
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [doc, setDoc] = useState(null)
    const [user, setUser] = useState(null)
    const [conductor, setConductor] = useState(null)
    const [isAuth, setIsAuth] = useState(false);


    //Parte de user
    const login=async(user)=>{
        const res = await loginRequest(user)
        console.log(res.data)
        setUser(res.data)

    }
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
        setDoc(res.data)
        setIsAuth(true)

    }
    return(
        <AuthContext.Provider value={{login,registrarConductor,registrarPermiso,isAuth, user, conductor, doc}}>
            {children}
        </AuthContext.Provider>
    )
}