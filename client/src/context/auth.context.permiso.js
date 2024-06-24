import { createContext } from "react";
import { registerPermiso } from "../api/auth.permiso";

export const AuthContext = createContext()

export const AuthProviderPermiso = ({children}) => {
    const [doc, setDoc] = useState(null)
    
    const registrarPermiso= async(doc)=>{
        const res = await registerPermiso(value)
        console.log(res.data);
        setConductor(res.data);
    }
    return(
        <AuthContext.Provider value={{registerPermiso, doc}}>
            {children}
        </AuthContext.Provider>
    )
}