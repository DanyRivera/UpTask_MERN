import mongoose from "mongoose";
import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const obtenerProyectos = async (req, res) => {

    // const { _id } = req.usuario;
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
    res.json(proyectos)

}

const nuevoProyecto = async (req, res) => {

    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;

    try {

        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);

    } catch (error) {
        console.log(error);
    }

}

const obtenerProyecto = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(401).json({ msg: error.message })
    }
    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
        const error = new Error("Ese proyecto no existe");
        return res.status(404).json({ msg: error.message })
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida");
        return res.status(401).json({ msg: error.message })
    }

    res.json(proyecto);

}

const editarProyecto = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(401).json({ msg: error.message })
    }
    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
        const error = new Error("Ese proyecto no existe");
        return res.status(404).json({ msg: error.message })
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida");
        return res.status(401).json({ msg: error.message })
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {

        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
        
    } catch (error) {
        console.log(error);
    }

}

const eliminarProyecto = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Id no Válido");
        return res.status(401).json({ msg: error.message })
    }
    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
        const error = new Error("Ese proyecto no existe");
        return res.status(404).json({ msg: error.message })
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida");
        return res.status(401).json({ msg: error.message })
    }

    try {
        
        await proyecto.deleteOne();
        res.json({msg: "Proyecto Eliminado Correctamente"})

    } catch (error) {
        console.log(error)
    }

}

const agregarColaborador = async (req, res) => { }

const eliminarColaborador = async (req, res) => { }

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
}