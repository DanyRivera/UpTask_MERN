import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../src/hook/useAuth";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    if(cargando) return "Cargando..."

    return (
        <>
            {auth._id ? <Outlet /> : <Navigate to="/" />} 
        </>
    )
}

export default RutaProtegida