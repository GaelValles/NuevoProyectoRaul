import { createContext, useState } from "react";
import { registerConductor } from "../api/auth.conductor";

export const AuthContext = createContext()

export const AuthProviderConductor = ({children}) => {
    const [conductor, setConductor] = useState(null)
    
    const signup= async(conductor)=>{
        const res = await registerConductor(value)
        console.log(res.data);
        setConductor(res.data);
    }
    return(
        <AuthContext.Provider value={{signup, conductor}}>
            {children}
        </AuthContext.Provider>
    )
}