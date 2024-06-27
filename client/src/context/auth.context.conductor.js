import { createContext, useState, useContext } from "react";
import { registerConductor } from "../api/auth.conductor";

export const AuthContext = createContext()

export const AuthProviderConductor = ({children}) => {
    const [conductor, setConductor] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    const registrarConductor = async (formData) => {
        const res = await registerConductor(formData);
        setConductor(res.data);
        setIsAuth(true);
    };

    return(
        <AuthContext.Provider value={{registrarConductor, conductor, isAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext);
