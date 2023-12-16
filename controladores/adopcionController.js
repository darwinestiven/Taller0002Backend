import {adopcion} from "../modelos/adopcionModelo.js";
import {mascotas} from "../modelos/mascotasModelo.js";

//Crear
const crear = (req, res) => {
    // Verificar si el idMascota está presente y no es nulo
    if (!req.body.id_mascotas || !req.body.nombre_solicitante || !req.body.telefono) {
        return res.status(400).json({
            mensaje: "id_mascotas, nombre_solicitante y telefono son campos obligatorios y no pueden ser nulos."
        });
    }

    // Verificar si la mascota con el idMascota existe y está disponible
    mascotas.findByPk(req.body.id_mascotas)
        .then((mascota) => {
            if (!mascota) {
                return res.status(404).json({
                    mensaje: `La mascota con el id ${req.body.id_mascotas} proporcionado no existe`
                });
            }

            // Crear un objeto dataset con los campos relevantes
            const dataset = {
                id_mascotas: req.body.id_mascotas,
                nombre_solicitante: req.body.nombre_solicitante,
                telefono: req.body.telefono,
                estado: req.body.estado
            };

            // Utilizar Sequelize para crear el recurso
            adopcion.create(dataset)
                .then((resultado) => {
                    res.status(200).json({
                        mensaje: "Registro creado correctamente",
                        resultado: resultado
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        mensaje: `Error al crear el registro: ${err.message}`
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar la mascota: ${err.message}`
            });
        });
};


//Buscar recurso por ID
const buscarId = (req,res)=>{
    const id = req.params.id;
    if(id == null){
        res.status(203).json({
            mensaje: `El id no puede estar vacio`
        });
        return;
    }

    adopcion.findByPk(id).then((resultado)=>{
        res.status(200).json(resultado);    
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `Registro no encontrado ::: ${err}`
        });
    });

}


//Buscar recurso todos
const buscar = (req,res)=>{
    
    adopcion.findAll().then((resultado)=>{
        res.status(200).json(resultado);    
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `No se encontraron Registros ::: ${err}`
        });
    });

};

//Actualizar un recurso
const actualizar = (req, res) => {
    const id = req.params.id;

    // Verificar si existen datos para actualizar
    if (!req.body.id_mascotas && !req.body.nombre_solicitante && !req.body.telefono && !req.body.estado) {
        res.status(400).json({
            mensaje: `No se encontraron datos para actualizar`
        });
        return;
    } else {
        const id_mascotas = req.body.id_mascotas;
        const nombre_solicitante = req.body.nombre_solicitante;
        const telefono = req.body.telefono;
        const estado = req.body.estado;

        // Validar existencia de la clave foránea (id_mascota)
        mascotas.findByPk(id_mascotas) // Reemplaza "Mascota" con el nombre real de tu modelo de mascota
            .then((mascota) => {
                if (!mascota) {
                    res.status(400).json({
                        mensaje: `La mascota con id ${id_mascotas} no existe. No se puede actualizar el registro.`
                    });
                } else {
                    // La mascota existe, realizar la actualización
                    adopcion.update({ id_mascotas, nombre_solicitante, telefono, estado }, { where: { id } })
                        .then((resultado) => {
                            res.status(200).json({
                                mensaje: `Registro actualizado`
                            });
                        })
                        .catch((err) => {
                            res.status(500).json({
                                mensaje: `Error al actualizar registro: ${err}`
                            });
                        });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    mensaje: `Error al verificar la existencia de la mascota: ${err}`
                });
            });
    }
};

//Eliminar registros
const eliminar = (req, res) => {
    const id = req.params.id;

    if (id == null) {
        res.status(203).json({
            mensaje: `El id no puede estar vacío`
        });
        return;
    }

    // Verificar si el registro de solicitud existe antes de intentar eliminar
    adopcion.findByPk(id)
        .then((registroExistente) => {
            if (!registroExistente) {
                return res.status(404).json({
                    mensaje: "Registro no encontrado"
                });
            }

            // El registro existe, ahora procedemos con la eliminación
            adopcion.destroy({ where: { id } })
                .then((resultado) => {
                    res.status(200).json({
                        mensaje: `Registro Eliminado`
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        mensaje: `Error al eliminar Registro ::: ${err}`
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al verificar la existencia del registro de solicitud ::: ${err}`
            });
        });
};

export {crear,buscarId,buscar,actualizar,eliminar}  