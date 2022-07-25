import { useState, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({})

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto = async proyecto => {

        try {

            const token = localStorage.getItem('token')

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application-json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/proyectos', proyecto, config);

            console.log(data)
            console.log(proyecto)

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                alerta,
                mostrarAlerta,
                submitProyecto
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext;