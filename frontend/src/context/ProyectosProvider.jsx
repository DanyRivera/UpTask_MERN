import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {

    const navigate = useNavigate();

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const obtenerProyectos = async () => {

            const token = localStorage.getItem('token')

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                const { data } = await clienteAxios('/proyectos', config);
                setProyectos(data);

            } catch (error) {
                console.log(error)
            }

        }
        obtenerProyectos();

    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto = async proyecto => {

        if(proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await crearProyecto(proyecto)
        }

    }

    const editarProyecto = async proyecto => {

        try {

            const token = localStorage.getItem('token')

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config);

            //Sincronizar el state
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState);

            setProyectos(proyectosActualizados);

            setAlerta({
                msg: "Proyecto actualizado correctamente",
                error: false
            })

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos')
            }, 3000);

            
        } catch (error) {
            console.log(error);
        }

    }

    const crearProyecto = async proyecto => {
        try {

            const token = localStorage.getItem('token')

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', proyecto, config);

            setProyectos([...proyectos, data]);

            setAlerta({
                msg: "Proyecto creado correctamente",
                error: false
            })

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos')
            }, 3000);

        } catch (error) {
            console.log(error)
        }

    }

    const obtenerProyecto = async id => {

        setCargando(true);

        try {

            const token = localStorage.getItem('token')

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/proyectos/${id}`, config);
            setProyecto(data);

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false);
        }

    }

    const eliminarProyecto = async id => {

        try {
            
            const token = localStorage.getItem('token')

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/proyectos/${id}`, config);

            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== proyecto._id);

            setProyectos(proyectosActualizados);

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos')
            }, 3000);

        } catch (error) {
            
            console.log(error);

        }

    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                alerta,
                proyecto,
                cargando,
                mostrarAlerta,
                submitProyecto,
                obtenerProyecto,
                eliminarProyecto
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