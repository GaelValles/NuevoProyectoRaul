import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/auth.context";

function ProtectedRoute () {
    const {loading, isAuth } = useAuth();
    console.log(loading, isAuth);
    
    if(loading) return <h1>Cargando..</h1> 
    if (!loading && !isAuth) return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default ProtectedRoute;