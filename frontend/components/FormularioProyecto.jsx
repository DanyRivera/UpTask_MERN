import { useState } from "react"
import useProyectos from "../src/hook/useProyectos"
import Alerta from "./Alerta"

const FormularioProyecto = () => {

    const {alerta, mostrarAlerta, submitProyecto} = useProyectos();

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        //Pasar los datos para el provider
        submitProyecto({
            nombre,
            descripcion,
            fechaEntrega,
            cliente
        })
    }

    return (
        <form
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >

            {alerta.msg && <Alerta alerta={alerta} />}

            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre Proyecto:</label>
                <input
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                    id="nombre"
                    placeholder="Nombre Proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">Descripción:</label>
                <textarea
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                    id="descripcion"
                    placeholder="Descripción del proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="fecha-entrega" className="text-gray-700 uppercase font-bold text-sm">Fecha Entrega:</label>
                <input
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                    id="fecha-entrega"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="nombre-cliente" className="text-gray-700 uppercase font-bold text-sm">Nombre Cliente:</label>
                <input
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                    id="nombre-cliente"
                    placeholder="Nombre Cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>

            <input 
                type="submit" 
                value="Crear Proyecto"
                className="bg-sky-600 w-full p-3 uppercasefont-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />

        </form>
    )
}

export default FormularioProyecto