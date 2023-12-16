import Sequelize from "sequelize";
import {db} from "../database/conexion.js";

const adopcion = db.define("adopcions",{
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_mascotas:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    nombre_solicitante:{
        type: Sequelize.STRING,
        allowNull: true
    },
    telefono:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    estado:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

export {adopcion}