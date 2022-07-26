import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../src/hook/useProyectos"
import FormularioProyecto from "../components/FormularioProyecto"

const EditarProyecto = () => {

    const { id } = useParams();
    const { obtenerProyecto, proyecto, cargando } = useProyectos();

    useEffect(() => {

        obtenerProyecto(id);

    }, [])

    if (cargando) return "Cargando..."

    return (

        <>
            <h1 className="font-black text-4xl">Editar Proyecto: {proyecto.nombre}</h1>

            <div className="mt-10 flex justify-center">
                <FormularioProyecto />
            </div>

        </>

    )
}

export default EditarProyecto