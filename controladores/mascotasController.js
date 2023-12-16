import {mascotas} from "../modelos/mascotasModelo.js";

//Crear un recurso 
const crear = (req,res)=>{
    if(!req.body.nombre){
        res.status(400).json({
            mensaje: "El nombre no puede estar vacio."
        }) ;
        return;
    }
    const dataset={
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipo: req.body.tipo,
        raza: req.body.raza
    };

    //Usar Sequelize para crear el recurso
    mascotas.create(dataset).then((resultado)=>{
        res.status(200).json({
            mensaje: "Registro creado correctamente"
        })
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `Error al crear el registro ::: ${err}`
        })

    })

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

    mascotas.findByPk(id).then((resultado)=>{
        res.status(200).json(resultado);    
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `Registro no encontrado ::: ${err}`
        });
    });

}


//Buscar recurso todos
const buscar = (req,res)=>{
    
    mascotas.findAll().then((resultado)=>{
        res.status(200).json(resultado);    
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `No se encontraron Registros ::: ${err}`
        });
    });

};

//Actualizar un recurso
const actualizar=(req,res)=>{
    const id= req.params.id;
    if(!req.body.nombre && !req.body.edad && !req.body.tipo && !req.body.raza){
        res.status(400).json({
            mensaje: `No se encontraron Datos para Actualizar`
        });
        return;
    }
    else{
        const nombre= req.body.nombre;
        const edad= req.body.edad;
        const tipo= req.body.tipo;
        const raza= req.body.raza;
        mascotas.update({nombre,edad,tipo,raza},{where:{id}})
        .then((resultado)=>{
            res.status(200).json({
                mensaje: `Registro Actualizado`
            });
        })
        .catch((err)=>{
            res.status(500).json({
                mensaje: `Error al actualizar Registro ::: ${err}`
            });
        })
    }

};

const eliminar=(req,res)=>{
    const id= req.params.id;
    if(id == null){
        res.status(203).json({
            mensaje: `El id no puede estar vacio`
        });
        return;
    }
    mascotas.destroy({where:{id}})
    .then((resultado)=>{
        res.status(200).json({
            mensaje: `Registro Eliminado`
        });
    })
    .catch((err)=>{
        res.status(500).json({
            mensaje: `Error al eliminar Registro ::: ${err}`
        });
    })
    

};

export {crear,buscarId,buscar,actualizar,eliminar}  