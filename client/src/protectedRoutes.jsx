import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/auth.context";

function ProtectedRoute () {
    const {loading, isAuth } = useAuth();
    console.log(loading, isAuth);
    
    if (loading) return (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center">
            <div className="border-8 border-gray-300 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
        </div>
    );
    if (!loading && !isAuth) return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default ProtectedRoute;